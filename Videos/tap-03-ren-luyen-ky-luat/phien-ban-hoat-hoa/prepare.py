"""Prepare source cell measurements and the provisional motion storyboard."""
from pathlib import Path
import json
from PIL import Image
import numpy as np

folder=Path(__file__).resolve().parent
root=folder.parents[2]
project=root/'Du_an_Vang/video-remotion'
assets=project/'public/tap03-animation-full'
prior=json.loads((folder.parent/'storyboard-v3.json').read_text(encoding='utf8'))
old=prior['visualBeats']
scenes=[
 {'id':1,'frame':0,'durationFrames':257,'cue':0,'kind':'demo','sheet':'shot0','pose':0,'action':'Rèn luyện từng bước với tạ nhẹ'},
 {'id':2,'frame':257,'durationFrames':79,'cue':2,'kind':'demo','sheet':'shot1','pose':0,'action':'Suy nghĩ về điểm bắt đầu'},
 {'id':3,'frame':336,'durationFrames':264,'cue':3,'kind':'demo','sheet':'shot2','pose':0,'action':'Đối diện quá nhiều quy tắc'},
 {'id':4,'frame':600,'durationFrames':85,'cue':5,'kind':'patience','sheet':'shot-patience','pose':0,'action':'Chờ đợi và giữ bình tĩnh'},
]
for n in range(5,53):
 b=old[n-1]
 pair='01' if n in (5,6) else '02' if n in (7,8) else f'{((n if n%2 else n-1)-3)//2+2:02}'
 scenes.append({'id':n,'frame':b['frame'],'durationFrames':b['durationFrames'],'cue':b['cue'],'kind':'grid',
                'sheet':f'pair{pair}','row':(n+1)%2,'pose':(n+1)%2,'action':b.get('action',''),
                'motionFrames':['chuan-bi','khung-noi-1','khung-noi-2','thao-tac','khung-noi-3','phan-ung']})
assert scenes[-1]['frame']+scenes[-1]['durationFrames']==10248
for i,s in enumerate(scenes):
 assert 0<s['durationFrames']<=300,(s['id'],s['durationFrames'])
 if i: assert scenes[i-1]['frame']+scenes[i-1]['durationFrames']==s['frame']

def dimensions(file):
 arr=np.asarray(Image.open(file).convert('RGBA')); return arr
def valley(values,mid,span):
 return min(range(max(1,mid-span),min(len(values)-1,mid+span)+1),key=lambda x:(values[x],abs(x-mid)))
meta={}; flags=[]
for scene in scenes:
 if scene['kind']!='grid': continue
 for suffix in ('','-between'):
  sheet=scene['sheet']+suffix
  if sheet in meta:continue
  chosen=sheet
  if sheet in ('pair06','pair13'):chosen+='-clean'
  if sheet=='pair21-between':chosen+='-clean'
  p=assets/f'{chosen}.png'
  if not p.exists():raise FileNotFoundError(p)
  arr=dimensions(p); h,w=arr.shape[:2]; alpha=arr[:,:,3]
  if (alpha>220).mean()>.65: flags.append(f'{chosen}:possible_opaque_background')
  occ=(alpha>220).sum(axis=0); row_occ=(alpha>220).sum(axis=1)
  xs=[0,valley(occ,w//3,max(2,w//30)),valley(occ,2*w//3,max(2,w//30)),w]
  ys=[0,valley(row_occ,h//2,max(2,h//25)),h]
  floors=[]
  for row in range(2):
   rowfloors=[]
   for col in range(3):
    cell=arr[ys[row]:ys[row+1],xs[col]:xs[col+1]]
    dark=(cell[:,:,3]>220)&(cell[:,:,:3].max(axis=2)<90)
    counts=dark.sum(axis=1); positions=np.flatnonzero(counts>max(4,int(cell.shape[1]*.012)))
    if not len(positions):raise ValueError(f'No baseline: {chosen} {row}:{col}')
    rowfloors.append(int(positions[-1]))
   # A single baseline per row avoids deliberate bouncing while switching cells.
   floors.append(int(np.median(rowfloors)))
  meta[sheet]={'file':chosen,'width':w,'height':h,'xs':xs,'ys':ys,'floors':floors}
  for cut in xs[1:-1]:
   if occ[cut]>h*.08:flags.append(f'{chosen}:column_cut_{cut}_occupancy_{int(occ[cut])}')
  if row_occ[ys[1]]>w*.08:flags.append(f'{chosen}:row_cut_{ys[1]}_occupancy_{int(row_occ[ys[1]])}')

icon_map={4:'clock',7:'check',8:'shield',13:'steps',17:'check',18:'chart',20:'shield',22:'pause',26:'pause',31:'breath',32:'breath',39:'book',44:'pause',46:'water',47:'shield',50:'check',52:'shield'}
for s in scenes:
 if s['id'] in icon_map:s['icons']=[{'id':icon_map[s['id']],'timing':'trong cảnh','placement':'trên phải'}]
story={'videoId':'tap03-hoat-hoa','fps':30,'status':'awaiting_audio','visualBeats':scenes,'outro':{'frame':10248,'durationFrames':90,'text':'Hiểu đúng để đi xa hơn'}}
(folder/'storyboard.json').write_text(json.dumps(story,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(folder/'qa/asset-metadata.json').write_text(json.dumps({'assets':meta,'flags':flags},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(project/'src/tap03-animation-data.ts').write_text('export const SCENES = '+json.dumps(scenes,ensure_ascii=False)+';\nexport const SHEETS: Record<string,{file:string;width:number;height:number;xs:number[];ys:number[];floors:number[]}> = '+json.dumps(meta)+';\n',encoding='utf8')
print('scenes:',len(scenes),'sprite sheets:',len(meta),'flags:',len(flags))
for f in flags: print(f)
