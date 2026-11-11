import React from 'react';
import {AbsoluteFill,Audio,Composition,Img,registerRoot,staticFile,useCurrentFrame} from 'remotion';
import {VIDEO_FONT} from './fonts';
import {TIMELINE} from '../../../Videos/tap-03-ren-luyen-ky-luat/phien-ban-co-giong/src/timeline';
import PROFILE from '../../../Quy_trinh_video/visual-profile.json';
import {SHEETS} from './tap03-animation-data';
import {SCENES,SCALE,DEMO_SCALE,END_FRAME} from './tap03-voice-data';

type Scene={id:number;frame:number;durationFrames:number;originalDurationFrames:number;cue:number;kind:string;sheet:string;row?:number;icons?:{id:string}[]};
type Pose=[number,number,boolean];
const scenes=SCENES as Scene[];
const end=END_FRAME;
const illustrativeCharts=new Set([8,9,15,16,18,19,20,21,22,23,24,25,26,27,28,30,36,37,38,39,41,42,45,49]);
const labels=[
 {start:0,end:8,title:'BẮT ĐẦU TỪ ĐÂU?'},{start:8,end:11,title:'MỘT QUY TẮC NHỎ'},
 {start:11,end:19,title:'ĐẶT ĐIỂM DỪNG LỖ'},{start:19,end:25,title:'TỪNG BƯỚC MỘT'},
 {start:25,end:32,title:'BẢNG KIỂM TRA'},{start:32,end:40,title:'BA CÂU HỎI'},
 {start:40,end:43,title:'CHƯA ĐẠT → DỪNG'},{start:43,end:48,title:'KHI CẢM XÚC DÂNG CAO'},
 {start:48,end:55,title:'DỪNG LẠI BA GIÂY'},{start:55,end:64,title:'THỞ HÌNH HỘP'},
 {start:64,end:70,title:'BÌNH TĨNH QUAN SÁT'},{start:70,end:75,title:'ĐẶT CÂU HỎI ĐÚNG'},
 {start:75,end:81,title:'QUY TẮC NGẮT GIAO DỊCH'},{start:81,end:87,title:'DỪNG THEO KẾ HOẠCH'},
 {start:87,end:91,title:'BẢO VỆ TÀI KHOẢN'},{start:91,end:96,title:'KỶ LUẬT TỪNG BƯỚC'}
];
const demo:Record<string,{floor:number;poses:Pose[]}>={
 shot0:{floor:603,poses:[[0,0,false],[20,0,true],[26,1,true],[32,1,false],[38,2,true],[44,3,true],[50,2,false],[70,2,true],[76,1,false],[82,0,true],[88,0,false],[127,0,true],[133,1,true],[139,1,false],[145,2,true],[151,3,true],[157,2,false],[180,2,true],[186,1,false],[192,0,true],[198,0,false],[218,3,false]]},
 shot1:{floor:572,poses:[[0,0,false],[9,0,true],[17,1,true],[25,1,false],[34,2,true],[44,2,false],[55,3,true],[65,3,false]]},
 shot2:{floor:633,poses:[[0,0,false],[40,1,false],[91,0,true],[110,1,true],[122,2,true],[134,2,false],[189,3,true],[213,3,false]]},
};

const Icon:React.FC<{name:string;opacity:number}>=({name,opacity})=>{
 const stroke='#173b50',gold='#e2ae45';
 let shape:React.ReactNode;
 if(name==='clock')shape=<><circle cx="32" cy="32" r="21" fill="#fff8df" stroke={stroke} strokeWidth="4"/><path d="M32 19v14l10 6" fill="none" stroke={stroke} strokeWidth="4" strokeLinecap="round"/></>;
 else if(name==='check')shape=<><rect x="14" y="10" width="36" height="46" rx="5" fill="#fff8df" stroke={stroke} strokeWidth="4"/><path d="m21 25 5 5 9-10M22 40h19" fill="none" stroke="#30876e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></>;
 else if(name==='shield')shape=<><path d="M32 8 52 16v15c0 13-8 21-20 26C20 52 12 44 12 31V16Z" fill={gold} stroke={stroke} strokeWidth="4"/><path d="m23 32 6 6 12-13" fill="none" stroke={stroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></>;
 else if(name==='pause')shape=<><circle cx="32" cy="32" r="22" fill="#fff8df" stroke={stroke} strokeWidth="4"/><rect x="23" y="21" width="6" height="22" rx="2" fill={stroke}/><rect x="35" y="21" width="6" height="22" rx="2" fill={stroke}/></>;
 else if(name==='chart')shape=<><path d="M12 51h42M15 48V13" fill="none" stroke={stroke} strokeWidth="4" strokeLinecap="round"/><path d="m19 40 10-9 8 4 12-15" fill="none" stroke="#30876e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="m43 20 6 0 0 6" fill="none" stroke="#30876e" strokeWidth="4"/></>;
 else if(name==='water')shape=<><path d="M32 8C26 18 19 26 19 35a13 13 0 0 0 26 0C45 26 38 18 32 8Z" fill="#a7d9f4" stroke={stroke} strokeWidth="4"/></>;
 else if(name==='book')shape=<><path d="M32 17c-6-5-13-6-20-3v34c8-2 14-1 20 4 6-5 12-6 20-4V14c-7-3-14-2-20 3Z" fill="#fff8df" stroke={stroke} strokeWidth="4"/><path d="M32 17v35" stroke={stroke} strokeWidth="3"/></>;
 else if(name==='steps')shape=<path d="M10 51h14V39h12V27h12V15h8v36Z" fill={gold} stroke={stroke} strokeWidth="4" strokeLinejoin="round"/>;
 else shape=<><path d="M10 27c6-7 14-7 20 0M14 39c8-7 19-7 27 0M35 27c6-7 13-7 19 0" fill="none" stroke="#30876e" strokeWidth="4" strokeLinecap="round"/></>;
 return <svg width="70" height="70" viewBox="0 0 64 64" style={{position:'absolute',right:55,top:252,opacity}}>{shape}</svg>;
};

const Full:React.FC=()=>{
 const frame=useCurrentFrame();
 if(frame>=end)return <AbsoluteFill style={{fontFamily:VIDEO_FONT,background:PROFILE.background.fallback,justifyContent:'center',alignItems:'center'}}><Img src={staticFile('tap03/nen-giay.png')} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',filter:PROFILE.background.filter}}/><div style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',gap:38,opacity:Math.min(1,(frame-end)/15)}}><Img src={staticFile('tap03/logo.png')} style={{width:300,height:300,objectFit:'contain'}}/><div style={{textAlign:'center',fontSize:49,fontWeight:900,lineHeight:1.2,color:'#173b50'}}>Hiểu đúng<br/>để đi xa hơn</div></div></AbsoluteFill>;
 const scene=scenes.reduce((last,s)=>frame>=s.frame?s:last,scenes[0]);
 const local=frame-scene.frame;
 let cueIndex=0;for(let i=0;i<TIMELINE.cues.length;i++)if(frame>=TIMELINE.cues[i].startFrame)cueIndex=i;
 const label=labels.find(s=>cueIndex>=s.start&&cueIndex<s.end)??labels[0];
 const cue=TIMELINE.cues.find(c=>frame>=c.startFrame&&frame<c.endFrame);
 const breath=cueIndex>=58&&cueIndex<=61?['HÍT VÀO · 4 NHỊP','GIỮ HƠI · 4 NHỊP','THỞ RA · 4 NHỊP','NGHỈ · 4 NHỊP'][cueIndex-58]:null;
 let art:React.ReactNode;
 if(scene.kind==='demo'||scene.kind==='patience'){
  const motion=scene.kind==='demo'?demo[scene.sheet]:{floor:612,poses:[[0,0,false],[22,1,false],[46,2,false],[67,3,false]] as Pose[]};
  const poseFrame=local*scene.originalDurationFrames/scene.durationFrames;
  const pose=motion.poses.reduce((last,p)=>poseFrame>=p[0]?p:last,motion.poses[0]);
  const x=pose[1]*543;
  const file=scene.kind==='demo'?`tap03-demo-motion/${scene.sheet}${pose[2]?'-between':''}.png`:'tap03-animation-full/shot-patience.png';
  // Scale giữ cỡ đầu đồng nhất, đo bằng tinh-ty-le.py.
  const scale=DEMO_SCALE[String(scene.id)];
  const width=543*scale,height=724*scale,left=(720-width)/2,top=890-motion.floor*scale;
  art=<svg style={{position:'absolute',top,left}} width={width} height={height} viewBox={`${x} 0 543 724`}><defs><clipPath id="clip-demo"><rect x={x+2} y="0" width="539" height="724"/></clipPath></defs><image href={staticFile(file)} width="2172" height="724" clipPath="url(#clip-demo)"/></svg>;
 }else{
  // Within each scene: main pose, two intermediate poses, action, intermediate, reaction.
  const first=Math.floor(scene.durationFrames*.28),second=Math.floor(scene.durationFrames*.68);
  let cell=0,between=false;
  if(local>=first){cell=0;between=true;} if(local>=first+6){cell=1;between=true;}
  if(local>=first+12){cell=1;between=false;} if(local>=second){cell=2;between=true;}
  if(local>=second+6){cell=2;between=false;}
  const custom=scene.kind==='custom', pairnew=scene.kind==='pairnew';
  const a=custom||pairnew?{file:custom?'canh10-ke-hoach-v2':scene.sheet+(between?'-between':''),width:1536,height:1024,xs:[0,512,1024,1536],ys:[0,512,1024],floors:[482,482]}:SHEETS[scene.sheet+(between?'-between':'')];
  const row=custom?(between?1:0):(scene.row??0);
  const x=a.xs[cell],y=a.ys[row],w=a.xs[cell+1]-x,h=a.ys[row+1]-y;
  const metrics=SCALE[String(scene.id)],scale=metrics.scale,width=w*scale,height=h*scale;
  const top=890-metrics.floor*scale,left=360-(metrics.xmin+metrics.xmax)*scale/2;
  art=<svg style={{position:'absolute',top,left}} width={width} height={height} viewBox={`${x} ${y} ${w} ${h}`}><defs><clipPath id="clip-grid"><rect x={x+1} y={y+1} width={w-2} height={h-2}/></clipPath></defs><image href={staticFile(`tap03-animation-full/${a.file}.png`)} width={a.width} height={a.height} clipPath="url(#clip-grid)"/></svg>;
 }
 const icon=scene.icons?.[0]?.id, iconOpacity=Math.max(0,Math.min(1,local/12,(scene.durationFrames-local)/12));
 const easing=(v:number)=>{const t=Math.max(0,Math.min(1,v));return t*t*(3-2*t);};
 const sceneOpacity=Math.min(scene.id===1?1:easing(local/4),scene.id===scenes.length?1:easing((scene.durationFrames-local)/4));
 return <AbsoluteFill style={{fontFamily:VIDEO_FONT,background:PROFILE.background.fallback}}><Audio src={staticFile('tap03/elevenlabs-tap03-v4.mp3')}/><Img src={staticFile('tap03/nen-giay.png')} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',filter:PROFILE.background.filter}}/><AbsoluteFill style={{opacity:Math.min(1,(end-frame)/15)}}>
  <div style={{position:'absolute',top:PROFILE.series.top,width:'100%',textAlign:'center',fontSize:PROFILE.series.fontSize,fontWeight:PROFILE.series.fontWeight,color:PROFILE.series.color}}>TẬP 3 · TÂM LÝ GIAO DỊCH</div>
  <div style={{position:'absolute',top:PROFILE.title.top,left:PROFILE.title.horizontalMargin,right:PROFILE.title.horizontalMargin,textAlign:'center',fontSize:PROFILE.title.fontSize,lineHeight:PROFILE.title.lineHeight,fontWeight:PROFILE.title.fontWeight,color:PROFILE.title.color}}>{label.title}</div>
  {illustrativeCharts.has(scene.id)&&<div style={{position:'absolute',top:220,width:'100%',textAlign:'center',fontSize:17,fontWeight:800,color:'#73552d'}}>BIỂU ĐỒ MINH HỌA</div>}
  {breath&&<div style={{position:'absolute',top:285,width:'100%',textAlign:'center',fontSize:32,fontWeight:900,color:'#8c5b25'}}>{breath}</div>}
  <svg width="720" height="1280" style={{position:'absolute'}}><path d="M0 890H720" stroke="#bfa578" strokeWidth="4"/></svg>
  <AbsoluteFill style={{opacity:sceneOpacity}}>{art}</AbsoluteFill>{icon&&<Icon name={icon} opacity={Math.min(iconOpacity,sceneOpacity)}/>}
  {cue&&<div style={{position:'absolute',bottom:145,left:46,right:46,padding:'18px 22px',background:'#15344a',color:'#fff',borderRadius:22,fontSize:32,fontWeight:800,lineHeight:1.28,textAlign:'center'}}>{cue.text}</div>}
 </AbsoluteFill></AbsoluteFill>;
};
registerRoot(()=> <Composition id="Tap03CoGiong" component={Full} fps={30} width={720} height={1280} durationInFrames={end+90}/>);
