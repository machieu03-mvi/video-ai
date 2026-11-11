"""Verify video metadata, non-silent audio, and scene changes after the render."""
from pathlib import Path
import json
import av
import numpy as np

root=Path(__file__).resolve().parent
movie=root/'out/tap-03-co-giong-elevenlabs.mp4'
story=json.loads((root/'storyboard.json').read_text(encoding='utf8'))
timeline=json.loads((root/'src/timeline.json').read_text(encoding='utf8'))
scenes=story['visualBeats']; end=story['outro']['frame']; duration_frames=end+90
c=av.open(str(movie)); v=c.streams.video[0]
assert (v.width,v.height)==(720,1280) and abs(float(v.average_rate)-30)<1e-6
assert len(c.streams.audio)==1
assert abs(c.duration/av.time_base-duration_frames/30)<.08
assert len(scenes)==52 and all(0<s['durationFrames']<=300 for s in scenes)
assert all(a['frame']+a['durationFrames']==b['frame'] for a,b in zip(scenes,scenes[1:]))
assert scenes[-1]['frame']+scenes[-1]['durationFrames']==end
assert timeline['cues'][-1]['endFrame']<end

def picture(number):
    c.seek(max(0,int((number/30-.15)*av.time_base)))
    for f in c.decode(video=0):
        if f.time>=number/30-.005:
            return f.to_ndarray(format='rgb24')[350:890,20:700].astype(np.int16)
    raise ValueError(f'Cannot decode video frame {number}')

cuts=[]
for scene in scenes[1:]:
    n=scene['frame'];score=float(np.mean(np.abs(picture(n-5)-picture(n+5))))
    cuts.append({'frame':n,'meanPixelChange':round(score,3)})
    if score<.35: raise ValueError(f'Low visual change near scene {scene["id"]}: {score:.3f}')

ac=av.open(str(movie));res=av.AudioResampler(format='fltp',layout='mono',rate=16000)
peak=0.; count=0; sq=0.; first_sq=0.; end_sq=0.
for frame in ac.decode(audio=0):
    for f in res.resample(frame):
        a=f.to_ndarray().reshape(-1);start=count;count+=a.size
        peak=max(peak,float(np.max(np.abs(a))));sq+=float(np.dot(a,a))
        if start<3*16000:first_sq+=float(np.dot(a,a))
        if 263*16000<start<266*16000:end_sq+=float(np.dot(a,a))
assert peak>.01 and sq/count>1e-6 and first_sq>1 and end_sq>1
result={'durationSeconds':c.duration/av.time_base,'width':v.width,'height':v.height,'fps':30,'audioStreams':len(c.streams.audio),'audioPeak':peak,'sceneCount':len(scenes),'maxSceneSeconds':max(s['durationFrames'] for s in scenes)/30,'outroFrame':end,'cutChecks':cuts,'limitations':['So sánh điểm ảnh và waveform không chứng minh phát âm hay chuyển động mượt khi xem thực tế.']}
(root/'qa/kiem-tra-video.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
print('OK',round(result['durationSeconds'],2),'seconds;',len(scenes),'scenes;',len(cuts),'transitions; audio non-silent at both ends')
