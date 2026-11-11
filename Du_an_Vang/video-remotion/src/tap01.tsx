import React from 'react';
import {AbsoluteFill,Audio,Composition,registerRoot,staticFile,useCurrentFrame,interpolate} from 'remotion';
import {VIDEO_FONT} from './fonts';
import {TIMELINE} from '../../../Videos/tap-01-giao-dich-tra-thu/src/timeline';
import {ASSETS} from './tap01-assets';
const cue=(i:number)=>TIMELINE.cues[i].startFrame;
const cuts=[0,cue(1),cue(4),cue(7),cue(10),cue(13),cue(16),TIMELINE.durationInFrames];
const titles=['ĐÃ TỪNG NHƯ VẬY?','MỘT LỆNH RẤT ĐẸP','BỊ QUÉT DỪNG LỖ','“TRẢ LẠI TIỀN!”','GỠ LỖ BẰNG MỌI GIÁ','15 PHÚT SAU…','GIAO DỊCH TRẢ THÙ'];
export const Episode:React.FC<{voice?:string}>=({voice})=>{const f=useCurrentFrame();let s=0;cuts.slice(0,-1).forEach((v,i)=>{if(f>=v)s=i});const p=(f-cuts[s])/(cuts[s+1]-cuts[s]);const file=['analysis','analysis','stop','revenge','revenge','regret','regret'][s];const k=s===0?Math.min(1,Math.floor(p*2)):s===3?Math.min(1,Math.floor(p*2)):s===4?2+Math.min(1,Math.floor(p*2)):s===5?Math.min(2,Math.floor(p*3)):s===6?3:Math.min(3,Math.floor(p*4));
const a=ASSETS[file], x=k*a.panelWidth,y=a.floors[k]-600;const text=TIMELINE.cues.find(c=>f>=c.startFrame&&f<c.endFrame)?.text;
return <AbsoluteFill style={{fontFamily:VIDEO_FONT,background:s===3||s===4?'radial-gradient(#fff4db,#f0c9a0)':'radial-gradient(#fff9e9,#f4d59f)',color:'#173b50'}}>{voice&&<Audio src={staticFile(voice)}/>}
<div style={{position:'absolute',top:80,width:'100%',textAlign:'center',fontSize:23,fontWeight:900,color:'#9b6019'}}>TẬP 1 · TÂM LÝ GIAO DỊCH</div>
<div style={{position:'absolute',top:140,left:40,right:40,fontSize:49,lineHeight:1.17,fontWeight:900,textAlign:'center',color:s===3||s===4?'#a43f2c':'#173b50'}}>{titles[s]}</div>
<svg width="720" height="1280" style={{position:'absolute'}}><defs><filter id="alpha"><feComponentTransfer><feFuncA type="linear" slope="3" intercept="-2"/></feComponentTransfer></filter></defs><path d="M0 890H720" stroke="#bfa578" strokeWidth="4"/>
{s<3&&<g transform="translate(160 320)"><path d={s===2?'M0 30L70 0L135 20L205 100L265 -5L400 -30':'M0 80L75 60L140 75L215 20L285 35L400 -20'} fill="none" stroke={s===2?'#bf533e':'#30876e'} strokeWidth="8" strokeDasharray="650" strokeDashoffset={Math.max(0,650-(f-cuts[s])*8)}/>{s===2&&<line x1="0" x2="400" y1="65" y2="65" stroke="#bf533e" strokeWidth="3" strokeDasharray="8 7"/>}</g>}
</svg>
{s===4&&<div style={{position:'absolute',top:310,width:'100%',textAlign:'center',fontSize:36,fontWeight:900,color:'#a43f2c'}}>×2 KHỐI LƯỢNG · BỎ DỪNG LỖ</div>}
{s===5&&<div style={{position:'absolute',top:280,width:'100%',textAlign:'center',fontSize:28,fontWeight:900,color:'#8c5b25'}}>TỪ GỠ LỖ → LỖ THÊM</div>}
{s===6&&<div style={{position:'absolute',top:270,left:50,right:50,textAlign:'center',fontSize:26,fontWeight:900,color:'#a43f2c'}}>KHI CẢM XÚC CHIẾM QUYỀN ĐIỀU KHIỂN</div>}
<svg style={{position:'absolute',top:890-600*590/650,left:20}} width="680" height="590" viewBox={`${x} ${y} ${a.panelWidth} 650`}><defs><clipPath id="cell"><rect x={x+6} y={y} width={a.panelWidth-12} height="650"/></clipPath></defs><image href={staticFile('tap01/'+file+'.png')} width={a.width} height={a.height} clipPath="url(#cell)" filter="url(#alpha)"/></svg>
{text&&<div style={{position:'absolute',bottom:145,left:46,right:46,padding:'18px 22px',background:'#15344a',color:'white',borderRadius:22,fontSize:32,fontWeight:800,lineHeight:1.28,textAlign:'center'}}>{text}</div>}
{!voice&&<div style={{position:'absolute',bottom:92,width:'100%',textAlign:'center',fontSize:17,fontWeight:800,color:'#73552d'}}>BẢN HÌNH TẠM · CHỜ GIỌNG ĐỌC</div>}</AbsoluteFill>};
registerRoot(()=> <Composition id="Tap01" component={Episode} fps={30} width={720} height={1280} durationInFrames={TIMELINE.durationInFrames}/>);
