"""Plan visible pose changes at cue boundaries; re-run and review after alignment."""
from pathlib import Path
import json

root = Path(__file__).resolve().parents[2]
folder = Path(__file__).parent
timeline = json.loads((folder / 'src/timeline.json').read_text(encoding='utf8'))
cues = timeline['cues']
# cue index, sprite sheet, panel: each change selects a different illustration.
beats = [
 (0,0,0),(2,0,1),(3,0,0),(5,0,1),(6,2,0),(8,0,1),(10,5,0),
 (11,0,2),(14,0,3),(15,0,2),(17,5,0),(19,4,0),(21,4,1),(23,5,1),
 (25,1,0),(28,1,1),(31,5,0),(33,1,0),(35,1,1),(38,1,2),
 (40,5,1),(42,1,3),(43,2,0),(45,3,0),(47,2,0),(48,2,1),(50,2,3),
 (52,2,2),(54,2,1),(56,2,3),(58,6,1),(60,6,2),(62,2,3),
 (64,6,3),(66,5,1),(67,2,0),(69,2,1),(70,1,0),(72,5,1),
 (74,2,2),(75,3,0),(77,3,1),(80,3,2),(82,3,1),(84,3,3),
 (85,5,2),(87,1,2),(88,5,1),(89,4,0),(91,5,0),(93,2,1),(95,4,3),
]
events=[]
for idx,sheet,pose in beats:
    events.append({'cue':idx, 'frame':0 if idx==0 else cues[idx]['startFrame'], 'sheet':f'scene{sheet}', 'pose':pose})
end = cues[-1]['endFrame'] + 60
for i,event in enumerate(events):
    stop = events[i+1]['frame'] if i+1 < len(events) else end
    event['durationFrames'] = stop - event['frame']
    if not 0 < event['durationFrames'] <= 300:
        raise ValueError(f"Scene {i+1} cue {event['cue']} lasts {event['durationFrames']/30:.2f}s; adjust cue mapping")
    if i and (event['sheet'],event['pose']) == (events[i-1]['sheet'],events[i-1]['pose']):
        raise ValueError(f'No visual change at scene {i+1}')
(folder/'qa/nhịp-phân-cảnh.json').write_text(json.dumps({'fps':30,'maxSeconds':10,'beats':events},ensure_ascii=False,indent=2),encoding='utf8')
storyboard_path=folder/'storyboard.json'
storyboard=json.loads(storyboard_path.read_text(encoding='utf8'))
storyboard['visualBeats']=[{**event,'startSeconds':round(event['frame']/30,3),'durationSeconds':round(event['durationFrames']/30,3)} for event in events]
storyboard['visualBeatsNote']='Các phân cảnh hình có thể nằm trong cùng nhóm nội dung; căn lại và kiểm tra tối đa 10 giây sau khi có giọng.'
storyboard_path.write_text(json.dumps(storyboard,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
out=root/'Du_an_Vang/video-remotion/src/tap03-beats.ts'
out.write_text('export const BEATS = '+json.dumps(events,ensure_ascii=False)+';\n',encoding='utf8')
print(f"{len(events)} scenes; longest {max(e['durationFrames'] for e in events)/30:.2f}s")
