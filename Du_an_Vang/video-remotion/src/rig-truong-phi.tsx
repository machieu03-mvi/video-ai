import React from 'react';
import {AbsoluteFill,Composition,registerRoot,useCurrentFrame} from 'remotion';
import {VIDEO_FONT} from './fonts';
import {TruongPhiRig} from './TruongPhiRig';
const Demo:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:'radial-gradient(#fff9e9,#f4d59f)',fontFamily:VIDEO_FONT}}><div style={{position:'absolute',top:100,width:'100%',textAlign:'center',fontSize:25,fontWeight:900,color:'#9b6019'}}>THỬ NGHIỆM CHUYỂN ĐỘNG</div><div style={{position:'absolute',top:155,width:'100%',textAlign:'center',fontSize:49,fontWeight:900,color:'#173b50'}}>TRƯƠNG PHI</div><svg width="720" height="1280"><defs><filter id="clean"><feComponentTransfer><feFuncA type="linear" slope="3" intercept="-2"/></feComponentTransfer></filter></defs><path d="M0 985H720" stroke="#bfa578" strokeWidth="4"/><g transform="translate(160 460) scale(.8)"><TruongPhiRig frame={f}/></g></svg><div style={{position:'absolute',bottom:95,width:'100%',textAlign:'center',fontSize:19,fontWeight:800,color:'#73552d'}}>MẪU RIG 2D · KHÔNG CÓ GIỌNG ĐỌC</div></AbsoluteFill>};
registerRoot(()=> <Composition id="RigTruongPhi" component={Demo} fps={30} width={720} height={1280} durationInFrames={240}/>);


