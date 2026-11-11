"""Check MP4 metadata and compare picture region across planned scene cuts."""
from pathlib import Path
import json
import argparse
import av
import numpy as np

base=Path(__file__).resolve().parent
p=argparse.ArgumentParser()
p.add_argument('--video', default='out/tap-03-nhip-canh-moi.mp4')
p.add_argument('--storyboard', default='qa/nhịp-phân-cảnh.json')
p.add_argument('--report', default='qa/kiem-tra-mp4-v2.json')
args=p.parse_args()
movie=base/args.video
data=json.loads((base/args.storyboard).read_text(encoding='utf8'))
events=data.get('visualBeats',data.get('beats'))
container=av.open(str(movie))
stream=container.streams.video[0]
if (stream.width,stream.height)!=(720,1280): raise RuntimeError('Wrong frame dimensions')
if container.streams.audio: raise RuntimeError('Unexpected audio')
def read_frame(number):
    seconds=number/30
    container.seek(max(0,int((seconds-0.1)*av.time_base)))
    for frame in container.decode(video=0):
        if frame.time >= seconds-0.005:
            return frame.to_ndarray(format='rgb24')[350:900,70:650].astype(np.int16)
    raise RuntimeError(f'Cannot decode frame {number}')
checks=[]
for event in events[1:]:
    cut=event['frame']
    score=float(np.mean(np.abs(read_frame(cut)-read_frame(cut-1))))
    checks.append({'frame':cut,'cue':event['cue'],'meanPixelChange':round(score,3)})
    if score<0.35: raise RuntimeError(f'No clear visual change at frame {cut}, score {score}')
duration=container.duration/av.time_base
report={'durationSeconds':duration,'width':stream.width,'height':stream.height,'audioStreams':len(container.streams.audio),'sceneCount':len(events),'maxSceneSeconds':max(e['durationFrames'] for e in events)/30,'cutChecks':checks}
(base/args.report).write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print(f"OK: {duration:.2f}s, {len(events)} scenes, {len(checks)} actual cuts, max {report['maxSceneSeconds']:.2f}s, no audio")
