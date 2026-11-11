"""Build separate v3 storyboard/metadata; keep the already exported version intact."""
from pathlib import Path
import json
from PIL import Image

folder=Path(__file__).resolve().parent
root=folder.parents[1]
src=root/'Du_an_Vang/video-remotion/src'
images=root/'Du_an_Vang/video-remotion/public/tap03'
original=json.loads((folder/'storyboard.json').read_text(encoding='utf8'))
timeline=json.loads((folder/'src/timeline.json').read_text(encoding='utf8'))
events=original['visualBeats']
# One-based scene -> unique replacement sheet/panel and narrative action.
replacements={
 3:(7,0,'Trương Phi bị quá tải bởi nhiều bảng quy tắc'),
 4:(7,1,'Quan Vũ khích lệ Trương Phi kiên nhẫn với đồng hồ cát'),
 6:(7,2,'Quan Vũ hướng dẫn tập với tạ nhẹ'),
 10:(14,3,'Gia Cát Lượng và Trương Phi kiểm tra kế hoạch'),
 11:(8,0,'Ghi nhận việc thực hiện được quy tắc'),
 13:(17,0,'Từng bước rèn luyện kỷ luật'),
 15:(15,0,'Quan Vũ và Trương Phi xem bảng kiểm tra'),
 16:(9,2,'Quan sát biến động và nhận ra cảm xúc'),
 17:(8,1,'Viết bảng kiểm tra trước khi giao dịch'),
 18:(8,2,'Quan sát xu hướng trên biểu đồ'),
 19:(8,3,'Xem vị trí giá trên biểu đồ'),
 20:(15,2,'Kiểm tra rủi ro và điểm dừng lỗ'),
 21:(9,0,'Đọc bảng kiểm tra trước khi bấm chuột'),
 22:(15,3,'Quan Vũ nhắc dừng khi chưa đạt điều kiện'),
 23:(9,1,'Phản ứng khi biểu đồ biến động mạnh'),
 25:(13,3,'Trương Phi lo lắng trước biểu đồ và được nhắc bình tĩnh'),
 29:(9,3,'Gia Cát Lượng gợi ý dừng lại và suy nghĩ'),
 30:(10,1,'Rời mắt khỏi màn hình và bình tĩnh'),
 33:(10,2,'Thực hành thở chậm cùng Quan Vũ'),
 35:(10,3,'Quan sát cách nói chuyện với bản thân'),
 36:(11,0,'Thất vọng khi biểu đồ đi ngược dự đoán'),
 37:(11,2,'Quan sát biểu đồ với góc nhìn khách quan'),
 38:(13,0,'Cùng xem dữ liệu trong nhật ký giao dịch'),
 39:(11,3,'Ghi lại thông tin để xem xét sau'),
 40:(12,0,'Gia Cát Lượng động viên khi Trương Phi thất vọng'),
 41:(13,2,'Quan Vũ ra hiệu tạm ngừng giao dịch'),
 44:(12,2,'Dừng theo giới hạn hai lệnh thua minh họa'),
 47:(12,3,'Kiểm tra kế hoạch và giới hạn rủi ro'),
 48:(14,1,'Suy nghĩ và chuẩn bị kế hoạch trước'),
 49:(14,0,'Quan sát thị trường và cơ hội tiếp theo'),
 50:(17,1,'Viết một quy tắc nhỏ vào sổ'),
 51:(10,0,'Dừng lại và trấn tĩnh khi cảm xúc dâng cao'),
}
for i,e in enumerate(events,1):
    if i in replacements:
        sheet,pose,action=replacements[i]
        e.update(sheet=f'scene{sheet}',pose=pose,action=action)
    else:
        e['action']=f"Minh họa: {timeline['cues'][e['cue']]['text']}"
original['visualBeats']=events
original['visualBeatsNote']='V3: mỗi cảnh một tư thế/ô ảnh riêng, tối đa 10 giây; căn lại sau bản thu.'
(folder/'storyboard-v3.json').write_text(json.dumps(original,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(src/'tap03-beats-v3.ts').write_text('export const BEATS = '+json.dumps(events,ensure_ascii=False)+';\n',encoding='utf8')

assets=json.loads((folder/'asset-manifest.json').read_text(encoding='utf8'))['assets']
for i in range(7,18):
    name=f'scene{i}'
    im=Image.open(images/f'{name}.png').convert('RGBA')
    alpha=im.getchannel('A')
    # Find transparent separators close to panel boundaries; no clipping of neighbors.
    hist=[sum(1 for a in alpha.crop((x,0,x+1,im.height)).getdata() if a>220) for x in range(im.width)]
    cuts=[0]+[min(range(mid-90,mid+91),key=lambda x:(hist[x],abs(x-mid))) for mid in (543,1086,1629)]+[im.width]
    floors=[]
    for k in range(4):
        tile=im.crop((cuts[k]+5,0,cuts[k+1]-5,im.height))
        floor=None
        for y in range(im.height-20,im.height//2,-1):
            if sum(1 for r,g,b,a in tile.crop((0,y,tile.width,y+1)).getdata() if a>220 and max(r,g,b)<90)>12:
                floor=y+1;break
        if floor is None: raise ValueError(f'No floor {name}:{k}')
        floors.append(floor)
    assets[name]={'width':im.width,'height':im.height,'panelWidth':im.width/4,'floors':floors,'bounds':cuts}
(src/'tap03-assets-v3.ts').write_text('export const ASSETS: Record<string,{width:number;height:number;panelWidth:number;floors:number[];bounds?:number[]}> = '+json.dumps(assets)+';\n',encoding='utf8')
(folder/'qa/asset-metadata-v3.json').write_text(json.dumps(assets,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(f'V3 prepared: {len(events)} scenes, {len(replacements)} replacements.')
