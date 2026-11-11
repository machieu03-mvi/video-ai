import React from 'react';
import {registerRoot,Composition,AbsoluteFill,OffthreadVideo,Audio,staticFile,useCurrentFrame} from 'remotion';
import {VIDEO_FONT} from './fonts';
import {TIMELINE} from './vang/timeline';
const Demo:React.FC=()=>{const f=useCurrentFrame();const text=TIMELINE.cues.find(c=>f+1167>=c.startFrame&&f+1167<c.endFrame)?.text;
return <AbsoluteFill style={{fontFamily:VIDEO_FONT}}><OffthreadVideo src={staticFile('demo-hyperframes.mp4')} muted style={{width:'100%',height:'100%'}}/><Audio src={staticFile('giong-doc.wav')} startFrom={1167}/>{text&&<div style={{position:'absolute',bottom:150,left:50,right:50,padding:'18px 20px',borderRadius:22,background:'#15344a',color:'white',fontWeight:800,fontSize:32,lineHeight:1.3,textAlign:'center'}}>{text}</div>}<div style={{position:'absolute',bottom:95,width:'100%',textAlign:'center',fontWeight:800,fontSize:17,color:'#73552d'}}>DEMO HYPERFRAMES + REMOTION</div></AbsoluteFill>};
registerRoot(()=> <Composition id="HyperFramesDemo" component={Demo} fps={30} width={720} height={1280} durationInFrames={360}/>);
