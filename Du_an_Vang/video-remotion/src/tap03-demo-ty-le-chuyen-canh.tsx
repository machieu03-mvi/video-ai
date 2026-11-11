import React from 'react';
import {AbsoluteFill, Composition, Img, registerRoot, staticFile, useCurrentFrame} from 'remotion';
import {VIDEO_FONT} from './fonts';
import {TIMELINE} from '../../../Videos/tap-03-ren-luyen-ky-luat/src/timeline';
import PROFILE from '../../../Quy_trinh_video/visual-profile.json';

// First 15 s of the existing timeline. Gia Cat Luong's hat-to-foot height
// was measured in source pixels in each sheet; this is a demo-specific target.
type Pose = [number, number, boolean];
const shots: {start:number; end:number; asset:string; floor:number; height:number; poses:Pose[]; grid?:boolean}[] = [
 {start:0,end:257,asset:'shot0',floor:603,height:445,poses:[[0,0,false],[20,0,true],[26,1,true],[32,1,false],[38,2,true],[44,3,true],[50,2,false],[70,2,true],[76,1,false],[82,0,true],[88,0,false],[127,0,true],[133,1,true],[139,1,false],[145,2,true],[151,3,true],[157,2,false],[180,2,true],[186,1,false],[192,0,true],[198,0,false],[218,3,false]]},
 {start:257,end:336,asset:'shot1',floor:572,height:388,poses:[[0,0,false],[9,0,true],[17,1,true],[25,1,false],[34,2,true],[44,2,false],[55,3,true],[65,3,false]]},
 {start:336,end:600,asset:'pair05',grid:true,floor:866,height:405,poses:[[0,0,false],[18,0,true],[25,1,true],[32,1,false],[72,2,true],[80,2,false]]},
];
const TARGET_HEIGHT = 450;
const ground = 890;
const ease = (v:number) => {const t=Math.max(0,Math.min(1,v)); return t*t*(3-2*t);};
const Demo: React.FC = () => {
 const frame=useCurrentFrame();
 const shot=shots.find(s=>frame>=s.start&&frame<s.end) ?? shots[0];
 const local=frame-shot.start;
 const pose=shot.poses.reduce((current,item)=>local>=item[0]?item:current,shot.poses[0]);
 const cellWidth=shot.grid?591:543, y=shot.grid?443:0, cellHeight=shot.grid?444:724;
 const x=pose[1]*cellWidth;
 const scale=TARGET_HEIGHT/shot.height;
 const width=cellWidth*scale, height=cellHeight*scale;
 const left=(720-width)/2, top=ground-(shot.floor-y)*scale;
 // Fade only the scene art across the cut, keeping one pose visible at a time.
 // Header, subtitles, ground and timeline stay continuous, no footage is sped up.
 const enter=shot.start===0 ? 1 : ease(local/4);
 const exit=shot.end>=450 ? 1 : ease((shot.end-frame)/4);
 const cue=TIMELINE.cues.find(c=>frame>=c.startFrame&&frame<c.endFrame);
 return <AbsoluteFill style={{fontFamily:VIDEO_FONT,background:PROFILE.background.fallback}}>
  <Img src={staticFile('tap03/nen-giay.png')} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',filter:PROFILE.background.filter}}/>
  <div style={{position:'absolute',top:80,width:'100%',textAlign:'center',fontSize:23,fontWeight:900,color:'#9b6019'}}>TẬP 3 · TÂM LÝ GIAO DỊCH</div>
  <div style={{position:'absolute',top:140,left:40,right:40,textAlign:'center',fontSize:46,lineHeight:1.17,fontWeight:900,color:'#173b50'}}>BẮT ĐẦU TỪ ĐÂU?</div>
  <svg width="720" height="1280" style={{position:'absolute'}}><path d={`M0 ${ground}H720`} stroke="#bfa578" strokeWidth="4"/></svg>
  <svg style={{position:'absolute',top,left,opacity:Math.min(enter,exit)}} width={width} height={height} viewBox={`${x} ${y} ${cellWidth} ${cellHeight}`}>
   <defs><clipPath id="demo-scale-clip"><rect x={x+2} y={y} width={cellWidth-4} height={cellHeight}/></clipPath></defs>
   <image href={staticFile(`${shot.grid?'tap03-animation-full':'tap03-demo-motion'}/${shot.asset}${pose[2]?'-between':''}.png`)} width={shot.grid?1774:2172} height={shot.grid?887:724} clipPath="url(#demo-scale-clip)"/>
  </svg>
  {cue&&<div style={{position:'absolute',bottom:145,left:46,right:46,padding:'18px 22px',background:'#15344a',color:'#fff',borderRadius:22,fontSize:32,fontWeight:800,lineHeight:1.28,textAlign:'center'}}>{cue.text}</div>}
  <div style={{position:'absolute',bottom:92,width:'100%',textAlign:'center',fontSize:17,fontWeight:800,color:'#73552d'}}>DEMO 15 GIÂY · CHỜ GIỌNG ĐỌC</div>
 </AbsoluteFill>;
};
registerRoot(()=> <Composition id="Tap03DemoTyLe" component={Demo} fps={30} width={720} height={1280} durationInFrames={450}/>);
