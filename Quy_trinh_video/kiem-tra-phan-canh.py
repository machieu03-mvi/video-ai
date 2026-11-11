"""Audit storyboard timing and reused sheet/panel IDs; visual review remains required."""
import argparse
from collections import defaultdict
import json
from pathlib import Path
import sys

p = argparse.ArgumentParser(description=__doc__)
p.add_argument('storyboard', type=Path)
p.add_argument('--fps', type=int, default=30)
p.add_argument('--end-frame', type=int, help='Exclusive final frame of content, excluding outro')
p.add_argument('--report', type=Path)
a = p.parse_args()
if a.fps <= 0:
    p.error('fps must be positive')
storyboard = json.loads(a.storyboard.read_text(encoding='utf-8'))
beats = storyboard.get('visualBeats')
if not isinstance(beats, list) or not beats:
    raise SystemExit('Missing or empty visualBeats: cannot audit')
issues=[]
used=defaultdict(list)
expected_frame=0
for i, b in enumerate(beats, 1):
    try:
        start, duration = b['frame'], b['durationFrames']
        sheet, pose = b['sheet'], b['pose']
        if not isinstance(start,int) or not isinstance(duration,int) or not isinstance(sheet,str) or not sheet or not isinstance(pose,int):
            raise ValueError('invalid field type')
    except (KeyError, TypeError, ValueError) as e:
        issues.append({'scene':i,'type':'invalid_fields','detail':str(e)})
        continue
    if start != expected_frame:
        issues.append({'scene':i,'type':'gap_or_overlap','expectedFrame':expected_frame,'actualFrame':start})
    if duration <= 0 or duration > 10*a.fps:
        issues.append({'scene':i,'type':'duration','frames':duration})
    expected_frame = start+duration
    used[(sheet,pose)].append(i)
for (sheet,pose),scenes in used.items():
    if len(scenes)>1:
        issues.append({'type':'reused_pose','sheet':sheet,'pose':pose,'scenes':scenes})
if a.end_frame is not None and expected_frame != a.end_frame:
    issues.append({'type':'content_end_mismatch','expectedEndFrame':a.end_frame,'actualEndFrame':expected_frame})
report={'status':'needs_review' if issues else 'automated_checks_passed', 'sceneCount':len(beats), 'fps':a.fps,
        'uniqueAssetPoses':len(used), 'issues':issues,
        'limitation':'Kiểm tra tự động không phát hiện ảnh trùng nội dung nhưng khác mã; cần rà bằng mắt và kiểm tra MP4.'}
output=json.dumps(report,ensure_ascii=False,indent=2)
if a.report:
    a.report.parent.mkdir(parents=True,exist_ok=True)
    a.report.write_text(output+'\n',encoding='utf-8')
print(output)
sys.exit(1 if issues else 0)
