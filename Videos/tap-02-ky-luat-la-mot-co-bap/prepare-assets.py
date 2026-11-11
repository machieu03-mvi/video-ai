from pathlib import Path
from PIL import Image
import json
root=Path(__file__).resolve().parents[2]
project=root/'Du_an_Vang/video-remotion'
data={}
for name in ['doubt','gym','overload','reassure','practice']:
    im=Image.open(project/'public/tap02'/f'{name}.png').convert('RGBA')
    pw=im.width/4
    floors=[]
    for k in range(4):
        tile=im.crop((round(k*pw),0,round((k+1)*pw),im.height))
        for y in range(im.height-30,im.height//2,-1):
            if sum(1 for r,g,b,a in tile.crop((12,y,tile.width-12,y+1)).getdata() if a>220 and max(r,g,b)<90)>12:
                floors.append(y+1);break
        else: raise ValueError(f'Ground not found: {name} {k}')
    data[name]={'width':im.width,'height':im.height,'panelWidth':pw,'floors':floors}
(project/'src/tap02-assets.ts').write_text('export const ASSETS: Record<string,{width:number;height:number;panelWidth:number;floors:number[]}> = '+json.dumps(data)+';',encoding='utf-8')
(Path(__file__).parent/'asset-manifest.json').write_text(json.dumps({'status':'awaiting_audio','characters':['Gia Cát Lượng','Trương Phi','Quan Vũ'],'visualProfile':'Quy_trinh_video/visual-profile.json','generator':'built-in imagegen','assets':data},ensure_ascii=False,indent=2),encoding='utf-8')
print(data)
