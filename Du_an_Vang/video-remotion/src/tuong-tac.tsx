import React from 'react';
import {AbsoluteFill,Audio,Img,staticFile,useCurrentFrame,interpolate} from 'remotion';
import {TIMELINE} from './vang/timeline';
import {At,GoldBar,Bank,Shield,Bill} from './stickman/props';
import {Burst} from './stickman/fx';
import {VIDEO_FONT} from './fonts';
import {GROUND} from './ground';
const cue=(i:number)=>TIMELINE.cues[i].startFrame;
const cuts=[0,cue(4),cue(9),cue(12),cue(14),cue(16),cue(18),cue(21),cue(22)];
const titles=['GIÁ VÀNG TĂNG HAY GIẢM?','TRƯƠNG PHI KHOE CHIẾN TÍCH','VÌ SAO VÀNG CÓ GIÁ TRỊ?','GÓC NHÌN CỦA QUÂN SƯ','LƯU GIỮ GIÁ TRỊ','KHI NIỀM TIN LUNG LAY','VÀNG TRONG KHO DỰ TRỮ','AN TOÀN VÀ ĐA DẠNG HÓA','NHÌN XA HƠN GIÁ MỖI NGÀY'];
export const TuongTac:React.FC<{voice?:string}>=({voice})=>{
 const f=useCurrentFrame();let s=0;cuts.forEach((v,i)=>{if(f>=v)s=i});const local=f-cuts[s];
 const sprite=['action-price-fixed.png','action-count-fixed.png','duo-truong-quan-no-shadow.png','duo-gia-truong-fixed.png','action-history.png','action-risk.png','action-vault.png','action-diversify.png','duo-luu-gia-no-shadow.png'][s];
 const end=cuts[s+1]??TIMELINE.durationInFrames;
 const progress=local/(end-cuts[s]);
 const pose=progress<.17?0:progress<.42?1:progress<.72?2:3;
 const rise=s===8?520:460, viewHeight=rise+50, displayHeight=s===8?540:490;
 const asset=GROUND[sprite], panelX=pose*asset.panelWidth, panelY=asset.floors[pose]-rise;
 const text=TIMELINE.cues.find(c=>f>=c.startFrame&&f<c.endFrame)?.text||'';
 const entry=interpolate(local,[0,14],[.9,1],{extrapolateRight:'clamp'}), close=s===2||s===5||s===8;
 return <AbsoluteFill style={{background:'#fff0d4',fontFamily:VIDEO_FONT,overflow:'hidden'}}>
 {voice&&<Audio src={staticFile(voice)}/>}
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 43%,#fff9e9 15%,#f4d59f 85%)'}}/>
 <div style={{position:'absolute',top:90,left:45,right:45,fontWeight:900,fontSize:24,letterSpacing:1,color:'#9b6019',textAlign:'center'}}>CHUYỆN TÀI CHÍNH</div>
 <div style={{position:'absolute',top:145,left:40,right:40,fontWeight:900,fontSize:49,lineHeight:1.18,color:'#173b50',textAlign:'center'}}>{titles[s]}</div>
 <svg width="720" height="1280" style={{position:'absolute'}}>
 <path d="M0 885 H720" fill="none" stroke="#bfa578" strokeWidth="4"/>
 {s<3&&<g transform="translate(360 375)"><path d="M-170 40 L-100 -15 L-30 10 L40 -45 L110 -20 L170 -80" fill="none" stroke="#31956b" strokeWidth="9" strokeDasharray="500" strokeDashoffset={Math.max(0,500-local*7)}/></g>}
 {s===4&&<g><At x={230} y={350} s={.65}><GoldBar/></At><At x={480} y={350} s={.6}><Bank label=""/></At><line x1="310" y1="350" x2={310+Math.min(90,local*3)} y2="350" stroke="#b89544" strokeWidth="6"/></g>}
 {s===5&&<g><At x={220} y={350+Math.sin(local/12)*6} s={.7}><Bill sym="$"/></At><At x={500} y={350} s={.5}><Shield color="#d57548"/></At></g>}
 {s===6&&<g><At x={360} y={380} s={.65}><Bank label=""/></At></g>}
 {s===7&&<g><At x={230} y={350} s={.5}><GoldBar/></At><At x={360} y={350} s={.5}><Shield color="#279365"/></At><At x={500} y={350} s={.5}><Bill sym="$"/></At></g>}
 {s<8&&<Burst x={360} y={430} at={cuts[s]+38} f={f} size={40} color="#dfa526"/>}
 </svg>
 <div style={{position:'absolute',left:20,top:885-rise*displayHeight/viewHeight,width:680,height:displayHeight,overflow:'hidden',transform:`scale(${entry*(close?1.09:1)})`,transformOrigin:`50% ${rise/viewHeight*100}%`}}>
 <svg width="680" height={displayHeight} viewBox={`${panelX} ${panelY} ${asset.panelWidth} ${viewHeight}`}><defs><clipPath id="panel"><rect x={panelX} y={panelY} width={asset.panelWidth} height={viewHeight}/></clipPath><filter id="clean-alpha" colorInterpolationFilters="sRGB"><feComponentTransfer><feFuncA type="linear" slope="3" intercept="-2"/></feComponentTransfer></filter></defs><image filter="url(#clean-alpha)" clipPath="url(#panel)" href={staticFile(sprite)} width={asset.width} height={asset.height}/></svg>
 </div>
 {text&&<div style={{position:'absolute',bottom:150,left:50,right:50,minHeight:100,padding:'18px 20px',borderRadius:22,background:'#15344a',color:'#fff',fontWeight:800,fontSize:32,lineHeight:1.3,textAlign:'center'}}>{text}</div>}
 {!voice&&<div style={{position:'absolute',bottom:105,left:0,right:0,textAlign:'center',fontWeight:800,fontSize:17,color:'#73552d'}}>BẢN DỰNG TƯ THẾ · CHƯA CÓ GIỌNG ĐỌC</div>}
 </AbsoluteFill>
};
