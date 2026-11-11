"""Tính scale từng cảnh Tập 3 để giữ cỡ đầu nhân vật đồng nhất giữa các cảnh.

Thước đo cỡ đầu: đường kính viên ngọc xanh ngọc trên mũ/khăn của Trương Phi, Quan Vũ
và Gia Cát Lượng (mỗi nhân vật một viên, cùng tỷ lệ với đầu). Mỗi cảnh lấy trung vị
đường kính các viên ngọc trong mọi ô ảnh được dùng, rồi chọn scale để viên ngọc hiển
thị bằng targetHeadPx. Scale bị giới hạn để cả nhóm rộng tối đa maxGroupWidth và
cao tối đa maxGroupHeight trên khung 720×1280. Các thông số này lấy từ
`characterScale` trong Quy_trinh_video/visual-profile.json (quy chuẩn
Tai_lieu/02_Quy_chuan/HINH_ANH.md).

Đọc storyboard.json đã căn giọng, ghi asset-scale.json và sinh lại
Du_an_Vang/video-remotion/src/tap03-voice-data.ts. Không cần file âm thanh.
Phụ thuộc: numpy, Pillow.
"""
from pathlib import Path
import json
import statistics

import numpy as np
from PIL import Image

folder = Path(__file__).resolve().parent
episode = folder.parent
root = episode.parents[1]
_profile = json.loads((root / 'Quy_trinh_video/visual-profile.json').read_text(encoding='utf8'))['characterScale']
TARGET_HEAD_PX = float(_profile['targetHeadPx'])   # đường kính viên ngọc trên màn hình (px, khung 720×1280)
MAX_GROUP_WIDTH = _profile['maxGroupWidth']
MAX_GROUP_HEIGHT = _profile['maxGroupHeight']      # đỉnh nhóm không cao hơn y=290, dưới vùng tiêu đề
GRID = {'width': 1536, 'height': 1024, 'xs': [0, 512, 1024, 1536], 'ys': [0, 512, 1024]}
DEMO_CELL = 543
project = root / 'Du_an_Vang/video-remotion'
public = project / 'public'
metadata = json.loads((episode / 'phien-ban-hoat-hoa/qa/asset-metadata.json').read_text(encoding='utf8'))['assets']

_cache = {}


def pixels(path):
    if path not in _cache:
        _cache[path] = np.asarray(Image.open(path).convert('RGBA')).astype(np.int16)
    return _cache[path]


def gem_diameters(cell):
    """Đường kính (px nguồn) các vùng xanh ngọc gần tròn trong một ô ảnh."""
    r, g, b, a = (cell[:, :, i] for i in range(4))
    mask = (a > 200) & (g > 170) & (b > 170) & (g - r > 50) & (np.abs(g - b) < 45)
    remaining = set(zip(*np.nonzero(mask)))
    found = []
    while remaining:
        stack = [remaining.pop()]
        ys, xs = [], []
        while stack:
            y, x = stack.pop()
            ys.append(y)
            xs.append(x)
            for q in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
                if q in remaining:
                    remaining.remove(q)
                    stack.append(q)
        h, w = max(ys) - min(ys) + 1, max(xs) - min(xs) + 1
        if len(ys) >= 40 and 0.6 < w / h < 1.7 and len(ys) / (w * h) > 0.45:
            found.append(int(max(w, h)))
    return found


def group_box(cell):
    """Khung bao nhóm hình như bản đo cũ: đỉnh/chân là trung vị, ngang lấy rộng nhất."""
    mask = cell[:, :, 3] > 210
    if not mask.any():
        raise ValueError('empty cell')
    xsig = np.flatnonzero(mask.sum(0) > 4)
    ysig = np.flatnonzero(mask.sum(1) > max(8, int(cell.shape[1] * .08)))
    return int(ysig[0]), int(ysig[-1]), int(xsig[0]), int(xsig[-1])


def cells(scene):
    """(đường dẫn ảnh, x0, y0, x1, y1) của mọi ô mà composition có thể hiển thị cho cảnh."""
    kind, sheet = scene['kind'], scene['sheet']
    if kind in ('demo', 'patience'):
        files = [f'tap03-demo-motion/{sheet}{s}.png' for s in ('', '-between')] if kind == 'demo' else ['tap03-animation-full/shot-patience.png']
        return [(public / f, c * DEMO_CELL, 0, (c + 1) * DEMO_CELL, 724) for f in files for c in range(4)]
    if kind == 'custom':
        sources = [(dict(GRID, file=sheet), row) for row in range(2)]
    elif kind == 'pairnew':
        sources = [(dict(GRID, file=sheet + s), scene['row']) for s in ('', '-between')]
    else:
        sources = [(metadata[sheet + s], scene['row']) for s in ('', '-between')]
    return [(public / 'tap03-animation-full' / f"{m['file']}.png", m['xs'][c], m['ys'][row], m['xs'][c + 1], m['ys'][row + 1])
            for m, row in sources for c in range(3)]


def measure(scene):
    diameters, boxes = [], []
    for path, x0, y0, x1, y1 in cells(scene):
        cell = pixels(path)[y0:y1, x0:x1]
        diameters += gem_diameters(cell)
        if scene['kind'] not in ('demo', 'patience'):
            boxes.append(group_box(cell))
    if len(diameters) < 2:
        raise ValueError(f"Cảnh {scene['id']}: không đủ viên ngọc để đo cỡ đầu")
    mid = statistics.median(diameters)
    kept = [d for d in diameters if 0.7 * mid <= d <= 1.4 * mid]
    return statistics.median(kept), boxes


def main():
    story = json.loads((folder / 'storyboard.json').read_text(encoding='utf8'))
    scenes = story['visualBeats']
    grid_scale, demo_scale = {}, {}
    for s in scenes:
        head, boxes = measure(s)
        scale = TARGET_HEAD_PX / head
        if s['kind'] in ('demo', 'patience'):
            # Ô 543 px được căn giữa khung; chỉ cần không vượt bề ngang 720.
            demo_scale[str(s['id'])] = round(float(min(scale, 720 / DEMO_CELL)), 6)
            continue
        top = round(float(np.median([b[0] for b in boxes])))
        floor = round(float(np.median([b[1] for b in boxes])))
        xmin, xmax = min(b[2] for b in boxes), max(b[3] for b in boxes)
        limit = min(MAX_GROUP_WIDTH / (xmax - xmin + 1), MAX_GROUP_HEIGHT / max(1, floor - top))
        grid_scale[str(s['id'])] = {'top': top, 'floor': floor, 'xmin': xmin, 'xmax': xmax,
                                    'headPx': float(head), 'scale': round(float(min(scale, limit)), 6), 'fitLimited': bool(limit < scale)}
    report = {'method': 'cỡ đầu theo viên ngọc trên mũ', 'targetHeadPx': TARGET_HEAD_PX,
              'maxGroupWidth': MAX_GROUP_WIDTH, 'maxGroupHeight': MAX_GROUP_HEIGHT,
              'demoScenes': demo_scale, 'scenes': grid_scale}
    (folder / 'asset-scale.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
    (project / 'src/tap03-voice-data.ts').write_text(
        'export const SCENES = ' + json.dumps(scenes, ensure_ascii=False) + ';\n'
        'export const SCALE: Record<string,{top:number;floor:number;xmin:number;xmax:number;headPx:number;scale:number;fitLimited:boolean}> = '
        + json.dumps(grid_scale) + ';\n'
        'export const DEMO_SCALE: Record<string,number> = ' + json.dumps(demo_scale) + ';\n'
        'export const END_FRAME = ' + str(story['outro']['frame']) + ';\n', encoding='utf8')
    shown = [v['headPx'] * v['scale'] for v in grid_scale.values()]
    print('cảnh', len(scenes), '| cỡ đầu hiển thị %.1f–%.1f px' % (min(shown), max(shown)),
          '| bị giới hạn khung:', [k for k, v in grid_scale.items() if v['fitLimited']])


if __name__ == '__main__':
    main()
