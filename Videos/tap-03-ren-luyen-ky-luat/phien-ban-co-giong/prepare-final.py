"""Retime the existing distinct scenes to the aligned narration, retaining originals."""
from pathlib import Path
import bisect, json, math
import av
import numpy as np

folder=Path(__file__).resolve().parent
episode=folder.parent
root=episode.parents[1]
project=root/'Du_an_Vang/video-remotion'
old=json.loads((episode/'src/timeline.json').read_text(encoding='utf8'))
new=json.loads((folder/'src/timeline.json').read_text(encoding='utf8'))
story=json.loads((episode/'phien-ban-hoat-hoa/storyboard.json').read_text(encoding='utf8'))
scenes=story['visualBeats']
metadata=json.loads((episode/'phien-ban-hoat-hoa/qa/asset-metadata.json').read_text(encoding='utf8'))['assets']
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

assets=project/'public/tap03-animation-full'
cache={}
def pixels(file):
    if file not in cache:
        with av.open(str(assets/(file+'.png'))) as c:
            cache[file]=next(c.decode(video=0)).to_ndarray(format='rgba')
    return cache[file]
sizes={}
for s in scenes:
    if s['kind'] not in ('grid','custom','pairnew'): continue
    if s['kind']=='custom':
        variants=[('canh10-ke-hoach-v2',r,c) for r in range(2) for c in range(3)]
        data={'width':1536,'height':1024,'xs':[0,512,1024,1536],'ys':[0,512,1024],'floors':[482,482]}
    elif s['kind']=='pairnew':
        variants=[(s['sheet']+suffix,s['row'],c) for suffix in ('','-between') for c in range(3)]
        data={'width':1536,'height':1024,'xs':[0,512,1024,1536],'ys':[0,512,1024],'floors':[482,482]}
    else:
        m=metadata[s['sheet']]; data=m
        variants=[(metadata[s['sheet']+suffix]['file'],s['row'],c) for suffix in ('','-between') for c in range(3)]
    tops=[]; bottoms=[]; xmin=[]; xmax=[]
    for file,row,col in variants:
        m=data if s['kind'] in ('custom','pairnew') else metadata[s['sheet']+('-between' if file==metadata[s['sheet']+'-between']['file'] else '')]
        arr=pixels(file); y0,y1=m['ys'][row:row+2]; x0,x1=m['xs'][col:col+2]
        alpha=arr[y0:y1,x0:x1,3]; mask=alpha>210
        yy,xx=np.where(mask)
        if not len(yy):raise ValueError('empty cell '+file)
        xsig=np.flatnonzero(mask.sum(0)>4); ysig=np.flatnonzero(mask.sum(1)>max(8,int((x1-x0)*.08)))
        tops.append(int(ysig[0])); bottoms.append(int(ysig[-1])); xmin.append(int(xsig[0]));xmax.append(int(xsig[-1]))
    top=round(float(np.median(tops))); floor=round(float(np.median(bottoms)))
    # Preserve the entire group when it cannot fit at the target height.
    span=max(xmax)-min(xmin)+1
    raw=450/max(1,floor-top); scale=min(raw,680/span)
    sizes[str(s['id'])]={'top':top,'floor':floor,'xmin':min(xmin),'xmax':max(xmax),'scale':round(scale,6),'fitLimited':scale<raw-0.001}

story.update(videoId='tap03-co-giong',status='audio_aligned',visualBeats=scenes,
             outro={'frame':end_frame,'durationFrames':90,'text':'Hiểu đúng để đi xa hơn'})
(folder/'storyboard.json').write_text(json.dumps(story,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(folder/'asset-scale.json').write_text(json.dumps(sizes,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(project/'src/tap03-voice-data.ts').write_text('export const SCENES = '+json.dumps(scenes,ensure_ascii=False)+';\nexport const SCALE: Record<string,{top:number;floor:number;xmin:number;xmax:number;scale:number;fitLimited:boolean}> = '+json.dumps(sizes)+';\nexport const END_FRAME = '+str(end_frame)+';\n',encoding='utf8')
print('audio',round(audio_seconds,3),'scenes',len(scenes),'max_seconds',round(max(s['durationFrames'] for s in scenes)/fps,2),'fit_limited',sum(x['fitLimited'] for x in sizes.values()),'end_frame',end_frame)
