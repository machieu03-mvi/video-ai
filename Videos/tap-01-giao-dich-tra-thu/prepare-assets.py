from pathlib import Path
from PIL import Image
import json
root=Path(__file__).resolve().parents[2]
public=root/'Du_an_Vang/video-remotion/public/tap01'
data={}
for name in ['analysis','stop','revenge','regret']:
    im=Image.open(public/(name+'.png')).convert('RGBA'); pw=im.width/4; floors=[]
    for k in range(4):
        tile=im.crop((round(k*pw),im.height//2,round((k+1)*pw),im.height))
        floor=im.height-1
        for y in range(tile.height-30,-1,-1):
            if sum(1 for r,g,b,a in tile.crop((round(tile.width*.15),y,round(tile.width*.65),y+1)).getdata() if a>220 and max(r,g,b)<90)>12:
                floor=im.height//2+y+1;break
        floors.append(floor)
    data[name]={'width':im.width,'height':im.height,'panelWidth':pw,'floors':floors}
(root/'Du_an_Vang/video-remotion/src/tap01-assets.ts').write_text('export const ASSETS: Record<string,{width:number;height:number;panelWidth:number;floors:number[]}> = '+json.dumps(data)+';',encoding='utf-8')
(Path(__file__).parent/'asset-manifest.json').write_text(json.dumps({'status':'awaiting_audio','character':'Gia Cat Luong','assets':data,'prompt_actions':['analysis: study charts and click trade','stop: stop-loss surprise then bounce','revenge: anger and oversized trade','regret: empty pouch and explanation']},indent=2),encoding='utf-8')
