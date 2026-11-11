from pathlib import Path
from PIL import Image
import json

root=Path(__file__).resolve().parents[3]
project=root/'Du_an_Vang/video-remotion'
data={}
for name in ['analysis','stop','revenge','regret']:
    im=Image.open(project/'public/tap01-truongphi'/f'{name}.png').convert('RGBA')
    pw=im.width/4
    floors=[]
    for k in range(4):
        tile=im.crop((round(k*pw),0,round((k+1)*pw),im.height))
        found=None
        for y in range(im.height-30,im.height//2,-1):
            row=tile.crop((round(pw*.18),y,round(pw*.67),y+1))
            if sum(1 for r,g,b,a in row.getdata() if a>220 and max(r,g,b)<90)>12:
                found=y+1
                break
        if found is None: raise ValueError(f'Ground not found: {name} {k}')
        floors.append(found)
    data[name]={'width':im.width,'height':im.height,'panelWidth':pw,'floors':floors}
(project/'src/tap01-truongphi-assets.ts').write_text('export const ASSETS: Record<string,{width:number;height:number;panelWidth:number;floors:number[]}> = '+json.dumps(data)+';',encoding='utf-8')
source=(project/'src/tap01.tsx').read_text(encoding='utf-8')
source=source.replace("color:'white'", "color:'#ffffff'")
source=source.replace("color:s===3||s===4?'#a43f2c':'#173b50'", "color:'#173b50'").replace("color:'#a43f2c'", "color:'#8c5b25'")
source=source.replace("'./tap01-assets'","'./tap01-truongphi-assets'").replace("'tap01/'","'tap01-truongphi/'").replace('id="Tap01"','id="Tap01TruongPhi"')
source=source.replace('a.floors[k]-600','a.floors[k]-650').replace('890-600*590/650','890-650*590/700').replace('${a.panelWidth} 650','${a.panelWidth} 700').replace('height="650"','height="700"')
source=source.replace('AbsoluteFill,Audio,Composition,','AbsoluteFill,Audio,Composition,Img,')
source=source.replace("background:s===3||s===4?'radial-gradient(#fff4db,#f0c9a0)':'radial-gradient(#fff9e9,#f4d59f)'", "background:'#f5f3ed'")
source=source.replace("}}>{voice&&", "}}><Img src={staticFile('tap01-truongphi/nen-giay.png')} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.995)'}}/>{voice&&")
(project/'src/tap01-truongphi.tsx').write_text(source,encoding='utf-8')
qa=(project/'qa-tap01.mjs').read_text(encoding='utf-8').replace("/qa'","/ban-truong-phi/qa'").replace('src/tap01.tsx','src/tap01-truongphi.tsx').replace("id:'Tap01'","id:'Tap01TruongPhi'")
(project/'qa-tap01-truongphi.mjs').write_text(qa,encoding='utf-8')
(Path(__file__).parent/'asset-manifest.json').write_text(json.dumps({'character':'Trương Phi','reference':'Tai_lieu/05_Nhan_vat/Truong_Phi_tham_chieu.png','status':'awaiting_audio','generator':'built-in imagegen','background':'Du_an_Vang/video-remotion/public/tap01-truongphi/nen-giay.png','assets':data},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(data))








