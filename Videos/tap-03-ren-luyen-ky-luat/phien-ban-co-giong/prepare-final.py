"""Retime the existing distinct scenes to the aligned narration, retaining originals."""
from pathlib import Path
import bisect, json, math, runpy
import av

folder=Path(__file__).resolve().parent
episode=folder.parent
root=episode.parents[1]
old=json.loads((episode/'src/timeline.json').read_text(encoding='utf8'))
new=json.loads((folder/'src/timeline.json').read_text(encoding='utf8'))
story=json.loads((episode/'phien-ban-hoat-hoa/storyboard.json').read_text(encoding='utf8'))
scenes=story['visualBeats']
audio=av.open(str(episode/'input/elevenlabs-tap03-v4.mp3'))
audio_seconds=audio.duration/av.time_base
fps=30
end_frame=math.ceil(audio_seconds*fps)+60
xs=[0]+[c['startFrame'] for c in old['cues']]+[10248]
ys=[0]+[c['startFrame'] for c in new['cues']]+[end_frame]
assert len(xs)==len(ys) and all(a<=b for a,b in zip(xs,xs[1:])) and all(a<=b for a,b in zip(ys,ys[1:]))
def mapped(x):
    i=bisect.bisect_right(xs,x)-1
    return round(ys[i]+(x-xs[i])*(ys[i+1]-ys[i])/(xs[i+1]-xs[i])) if xs[i+1]!=xs[i] else ys[i]
boundaries=[mapped(s['frame']) for s in scenes]+[end_frame]
for i,s in enumerate(scenes):
    s['originalDurationFrames']=s['durationFrames']
    s['frame']=boundaries[i]
    s['durationFrames']=boundaries[i+1]-boundaries[i]
    assert 0<s['durationFrames']<=300,(s['id'],s['durationFrames'])

# Scene 3 uses the approved opening demo's checklist; the original later use of
# that panel is replaced by an independent new illustration for scene 10.
scenes[2].update(kind='grid',sheet='pair05',row=1,pose=1,action='Cùng xem bảng kiểm tra các quy tắc')
scenes[4].update(kind='pairnew',sheet='canh05-06-ty-le',row=0,pose=0)
scenes[5].update(kind='pairnew',sheet='canh05-06-ty-le',row=1,pose=1)
scenes[9].update(kind='custom',sheet='canh10-ke-hoach-v2',row=0,pose=0,action='Hai nhân vật xem lại kế hoạch dừng lỗ')

story.update(videoId='tap03-co-giong',status='audio_aligned',visualBeats=scenes,
             outro={'frame':end_frame,'durationFrames':90,'text':'Hiểu đúng để đi xa hơn'})
(folder/'storyboard.json').write_text(json.dumps(story,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('audio',round(audio_seconds,3),'scenes',len(scenes),'max_seconds',round(max(s['durationFrames'] for s in scenes)/fps,2),'end_frame',end_frame)

# Scale từng cảnh (giữ cỡ đầu nhân vật) và tap03-voice-data.ts được sinh từ storyboard vừa ghi.
runpy.run_path(str(folder/'tinh-ty-le.py'),run_name='__main__')
