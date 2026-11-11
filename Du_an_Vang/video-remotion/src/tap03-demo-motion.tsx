import React from 'react';
import {AbsoluteFill,Composition,Img,registerRoot,staticFile,useCurrentFrame} from 'remotion';
import {VIDEO_FONT} from './fonts';
import {TIMELINE} from '../../../Videos/tap-03-ren-luyen-ky-luat/src/timeline';
import PROFILE from '../../../Quy_trinh_video/visual-profile.json';

// All times and subtitles follow the first 20 seconds of the planned timeline.
const shots=[
 {start:0,end:257,asset:'shot0',floor:603,poses:[[0,0],[28,1],[54,2],[80,1],[107,0],[143,1],[170,2],[206,3]]},
 {start:257,end:336,asset:'shot1',floor:572,poses:[[0,0],[17,1],[37,2],[60,3]]},
 {start:336,end:600,asset:'shot2',floor:633,poses:[[0,0],[38,1],[76,0],[112,1],[160,2],[220,3]]},
] as const;

const Demo:React.FC=()=>{
 const frame=useCurrentFrame();
 const shot=shots.find(s=>frame>=s.start&&frame<s.end)??shots[0];
 const local=frame-shot.start;
 const pose=shot.poses.reduce((current,item)=>local>=item[0]?item[1]:current,0);
 const x=pose*543,y=shot.floor-540;
 const cue=TIMELINE.cues.find(c=>frame>=c.startFrame&&frame<c.endFrame);
 // Slight squash anchored at the floor provides subtle breathing without detached limbs.
 const breathe=1+0.003*Math.sin(frame*Math.PI/45);
 return <AbsoluteFill style={{fontFamily:VIDEO_FONT,background:PROFILE.background.fallback}}>
  <Img src={staticFile('tap03/nen-giay.png')} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',filter:PROFILE.background.filter}}/>
  <div style={{position:'absolute',top:80,width:'100%',textAlign:'center',fontSize:23,fontWeight:900,color:'#9b6019'}}>TẬP 3 · TÂM LÝ GIAO DỊCH</div>
  <div style={{position:'absolute',top:140,left:40,right:40,textAlign:'center',fontSize:46,lineHeight:1.17,fontWeight:900,color:'#173b50'}}>BẮT ĐẦU TỪ ĐÂU?</div>
  <svg width="720" height="1280" style={{position:'absolute'}}><path d="M0 890H720" stroke="#bfa578" strokeWidth="4"/></svg>
  <svg style={{position:'absolute',top:890-540*620/610,left:20,transform:`scaleY(${breathe})`,transformOrigin:`50% ${540*620/610}px`}} width="680" height="620" viewBox={`${x} ${y} 543 610`}>
   <defs><clipPath id="demo-cell"><rect x={x+2} y={y} width="539" height="610"/></clipPath></defs>
   <image href={staticFile(`tap03-demo-motion/${shot.asset}.png`)} width="2172" height="724" clipPath="url(#demo-cell)"/>
  </svg>
  {cue&&<div style={{position:'absolute',bottom:145,left:46,right:46,padding:'18px 22px',background:'#15344a',color:'#fff',borderRadius:22,fontSize:32,fontWeight:800,lineHeight:1.28,textAlign:'center'}}>{cue.text}</div>}
  <div style={{position:'absolute',bottom:92,width:'100%',textAlign:'center',fontSize:17,fontWeight:800,color:'#73552d'}}>DEMO CHUYỂN ĐỘNG · CHỜ GIỌNG ĐỌC</div>
 </AbsoluteFill>;
};
registerRoot(()=> <Composition id="Tap03DemoMotion" component={Demo} fps={30} width={720} height={1280} durationInFrames={600}/>);
