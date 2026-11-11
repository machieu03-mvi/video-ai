import React from 'react';
import {AbsoluteFill,Audio,Composition,Img,registerRoot,staticFile,useCurrentFrame} from 'remotion';
import {VIDEO_FONT} from './fonts';
import {TIMELINE} from '../../../Videos/tap-02-ky-luat-la-mot-co-bap/src/timeline';
import PROFILE from '../../../Quy_trinh_video/visual-profile.json';
import {ASSETS} from './tap02-assets';
const cue=(i:number)=>TIMELINE.cues[i].startFrame;
const LAST_CUE_END=TIMELINE.cues[TIMELINE.cues.length-1].endFrame;
const OUTRO_START=LAST_CUE_END+60;
const OUTRO_FRAMES=Math.round(PROFILE.outro.durationSeconds*TIMELINE.fps);
const cuts=[0,cue(1),cue(3),cue(7),cue(11),cue(13),cue(14),TIMELINE.durationInFrames];
const titles=['BẠN THIẾU KỶ LUẬT?','KỶ LUẬT LÀ\nMỘT CƠ BẮP','ĐỪNG TẬP QUÁ SỨC','ÉP MÌNH LÀM TẤT CẢ','TỰ TRÁCH BẢN THÂN?','HÃY ĐỔI CÁCH TẬP','MỘT QUY TẮC NHỎ'];
const files=['doubt','doubt','gym','overload','reassure','reassure','practice'];
const scenePoses=[[0,1],[2,3],[0,1,2,3],[0,1,2,3],[0,1],[2,3],[0,1,2,3]];
const Secondary:React.FC<{children:React.ReactNode}>=({children})=><div style={{position:'absolute',top:300,left:40,right:40,textAlign:'center',fontSize:30,fontWeight:900,color:PROFILE.secondary.color}}>{children}</div>;
export const Episode2:React.FC<{voice?:string}>=({voice})=>{
 const f=useCurrentFrame(); let s=0; cuts.slice(0,-1).forEach((v,i)=>{if(f>=v)s=i});
 if(f>=OUTRO_START)return <AbsoluteFill style={{fontFamily:VIDEO_FONT,background:PROFILE.background.fallback,justifyContent:'center',alignItems:'center'}}>
  <Img src={staticFile('tap02/nen-giay.png')} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',filter:PROFILE.background.filter}}/>
  <div style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',gap:38,opacity:Math.min(1,(f-OUTRO_START)/15)}}>
   <Img src={staticFile('tap02/miracle-logo.png')} style={{width:300,height:300,objectFit:'contain'}}/>
   <div style={{margin:'0 60px',textAlign:'center',fontSize:PROFILE.outro.fontSize,fontWeight:PROFILE.outro.fontWeight,lineHeight:PROFILE.outro.lineHeight,color:PROFILE.outro.color}}>Hiểu đúng<br/>để đi xa hơn</div>
  </div>
 </AbsoluteFill>;
 const progress=(f-cuts[s])/(cuts[s+1]-cuts[s]);
 let k=scenePoses[s][Math.min(scenePoses[s].length-1,Math.floor(progress*scenePoses[s].length))];
 // Align the gym attempt and trading tasks to the corresponding words.
 if(s===2)k=f<cue(4)?0:f<cue(5)?1:f<cue(6)?2:3;
 if(s===3){const span=Math.max(3,cue(10)-cue(9));k=f<cue(9)?0:f<cue(9)+span/3?1:f<cue(9)+span*2/3?2:3;}
 if(s===6)k=f<cue(14)+(cue(15)-cue(14))/2?0:f<cue(15)?1:f<LAST_CUE_END?2:3;
 const a=ASSETS[files[s]],x=k*a.panelWidth,y=a.floors[k]-560;
 const text=TIMELINE.cues.find(c=>f>=c.startFrame&&f<c.endFrame)?.text;
 return <AbsoluteFill style={{fontFamily:VIDEO_FONT,background:PROFILE.background.fallback,color:PROFILE.title.color}}>
  <Img src={staticFile('tap02/nen-giay.png')} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',filter:PROFILE.background.filter}}/>
  {voice&&<Audio src={staticFile(voice)}/>}
  <AbsoluteFill style={{opacity:Math.min(1,(OUTRO_START-f)/15)}}>
  <div style={{position:'absolute',top:80,width:'100%',textAlign:'center',fontSize:23,fontWeight:900,color:PROFILE.series.color}}>TẬP 2 · TÂM LÝ GIAO DỊCH</div>
  <div style={{position:'absolute',top:140,left:40,right:40,textAlign:'center',fontSize:49,lineHeight:1.17,fontWeight:900,color:PROFILE.title.color,whiteSpace:'pre-line'}}>{titles[s]}</div>
  {s===0&&<Secondary>CẢM XÚC ≠ THẤT BẠI</Secondary>}
  {s===1&&<Secondary>CÓ THỂ RÈN LUYỆN</Secondary>}
  {s===2&&<Secondary>{f<cue(5)?'100 KG':'CHƯA ĐỦ SỨC · ĐỪNG CỐ'}</Secondary>}
  {s===3&&<Secondary>{['CHỜ TÍN HIỆU','TÍNH RỦI RO','VIẾT NHẬT KÝ','CẮT LỖ'][k]}</Secondary>}
  {s===4&&<Secondary>CHƯA LÀM ĐƯỢC ≠ THẤT BẠI</Secondary>}
  {s===5&&<Secondary>PHƯƠNG PHÁP CẦN THAY ĐỔI</Secondary>}
  {s===6&&<Secondary>BẮT ĐẦU NHỎ → TẬP TỪNG BƯỚC</Secondary>}
  <svg width="720" height="1280" style={{position:'absolute'}}><defs><filter id="alpha"><feComponentTransfer><feFuncA type="linear" slope="3" intercept="-2"/></feComponentTransfer></filter></defs><path d="M0 890H720" stroke={PROFILE.ground.color} strokeWidth="4"/></svg>
  <svg style={{position:'absolute',top:890-560*620/610,left:20}} width="680" height="620" viewBox={`${x} ${y} ${a.panelWidth} 610`}>
   <defs><clipPath id="cell"><rect x={x+3} y={y} width={a.panelWidth-6} height="610"/></clipPath></defs>
   <image href={staticFile('tap02/'+files[s]+'.png')} width={a.width} height={a.height} clipPath="url(#cell)" filter="url(#alpha)"/>
  </svg>
  {s===6&&<div style={{position:'absolute',top:390,left:220,width:280,height:8,borderRadius:4,background:'#d9d2bf'}}><div style={{height:'100%',width:`${Math.min(1,progress*1.2)*100}%`,background:PROFILE.chart.up,borderRadius:4}}/></div>}
  {text&&<div style={{position:'absolute',bottom:145,left:46,right:46,padding:'18px 22px',background:PROFILE.subtitle.background,color:PROFILE.subtitle.color,borderRadius:22,fontSize:32,fontWeight:800,lineHeight:1.28,textAlign:'center'}}>{text}</div>}
  {!voice&&<div style={{position:'absolute',bottom:92,width:'100%',textAlign:'center',fontSize:17,fontWeight:800,color:PROFILE.draftLabel.color}}>BẢN HÌNH TẠM · CHỜ GIỌNG ĐỌC</div>}
  </AbsoluteFill>
 </AbsoluteFill>;
};
registerRoot(()=> <Composition id="Tap02" component={Episode2} fps={30} width={720} height={1280} durationInFrames={OUTRO_START+OUTRO_FRAMES}/>);
