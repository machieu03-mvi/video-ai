"""Measure opaque dark foot/prop baselines; does not alter image assets."""
from PIL import Image, ImageChops
from pathlib import Path
import json
names=['action-price-fixed.png','action-count-fixed.png','duo-truong-quan-no-shadow.png','duo-gia-truong-fixed.png','action-history.png','action-risk.png','action-vault.png','action-diversify.png','duo-luu-gia-no-shadow.png']
data={}
for name in names:
    im=Image.open(Path('public')/name).convert('RGBA')
    r,g,b,a=im.split()
    dark=ImageChops.lighter(ImageChops.lighter(r,g),b).point(lambda p:255 if p<90 else 0)
    mask=ImageChops.multiply(dark,a.point(lambda p:255 if p>200 else 0))
    pw=im.width//4
    floors=[]
    for i in range(4):
        tile=im.crop((i*pw,im.height//2,(i+1)*pw,im.height))
        floor=im.height-1
        for y in range(tile.height-1,-1,-1):
            if sum(1 for r,g,b,a in tile.crop((0,y,pw,y+1)).getdata() if a>200 and max(r,g,b)<90 and b>r and b>=g)>6:
                floor=y+im.height//2+1
                break
        floors.append(floor)
    data[name]={'width':im.width,'height':im.height,'panelWidth':pw,'floors':floors}
Path('src/ground.json').write_text(json.dumps(data,indent=2),encoding='utf-8')
Path('src/ground.ts').write_text('export const GROUND: Record<string, {width:number; height:number; panelWidth:number; floors:number[]}> = '+json.dumps(data,indent=2)+';\n',encoding='utf-8')
print(json.dumps(data,indent=2))
