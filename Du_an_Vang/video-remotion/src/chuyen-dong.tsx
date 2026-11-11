import React from 'react';
import {AbsoluteFill,Audio,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {TIMELINE} from './vang/timeline';
import {At,GoldBar,Bank,Bill,Shield,Coin} from './stickman/props';
import {Burst} from './stickman/fx';

const start=(i:number)=>TIMELINE.cues[i].startFrame;
const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const names=['TRƯƠNG PHI','QUAN VÂN TRƯỜNG','GIA CÁT LƯỢNG','LƯU BỊ'];
const characters=['puppet-truong-phi.png','puppet-quan-vu.png','puppet-gia-cat.png','puppet-luu-bi.png'];
const backgrounds=['truong-phi-vang.png','gia-cat-luong-vang.png','lich-su-vang.png','kho-du-tru-vang.png'];
const titles=['GIÁ VÀNG\nTĂNG HAY GIẢM?','VÌ SAO VÀNG\nCÓ GIÁ TRỊ?','VÀNG LƯU GIỮ\nGIÁ TRỊ','DỰ TRỮ VÀ\nĐA DẠNG HÓA'];

export const ChuyenDong:React.FC<{voice?:string}>=({voice})=>{
 const f=useCurrentFrame();
 const cue=TIMELINE.cues.find(c=>f>=c.startFrame&&f<c.endFrame);
 const scene=f<start(9)?0:f<start(12)?1:f<start(18)?2:f<start(22)?3:2;
 const sceneStart=scene===0?0:scene===1?start(9):scene===3?start(18):f>=start(22)?start(22):start(12);
 const local=f-sceneStart, enter=ease(local,0,20), gesture=Math.sin(local/18), bounce=Math.abs(Math.sin(local/7))*Math.max(0,1-local/28);
 const talk=Math.sin(local/14)*1.8, icon=ease(local,12,30);
 const subject=scene===0?(f<start(7)?'chart':'gold'):scene===1?'question':scene===2?(f<start(14)?'gold':f<start(16)?'history':f<start(18)?'risk':'gold'):(f<start(20)?'bank':'safety');
 const subtitle=cue?.text || '';
 return <AbsoluteFill style={{fontFamily:'Arial, sans-serif',background:'#f8eacf',overflow:'hidden'}}>
 {voice&&<Audio src={staticFile(voice)}/>}
 <AbsoluteFill><Img src={staticFile(backgrounds[scene])} style={{width:'100%',height:'100%',objectFit:'cover',filter:'blur(5px) saturate(.7)',transform:'scale(1.06)'}}/></AbsoluteFill>
 <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(20,31,46,.75),rgba(249,238,212,.82) 32%,rgba(244,230,195,.85) 75%,rgba(17,25,40,.95))'}}/>
 <div style={{position:'absolute',top:100,left:25,right:25,textAlign:'center',fontSize:25,fontWeight:900,letterSpacing:2,color:'#ffd76a'}}>CHUYỆN TÀI CHÍNH</div>
 <div style={{position:'absolute',top:146,left:32,right:32,textAlign:'center',whiteSpace:'pre-line',fontWeight:900,fontSize:57,lineHeight:1.04,color:'#fff',textShadow:'0 5px 0 #573520, 0 7px 15px #0008'}}>{titles[scene]}</div>
 <div style={{position:'absolute',left:27,top:390,width:370,height:580,transformOrigin:'50% 95%',transform:`translateX(${(1-enter)*-280}px) translateY(${-bounce*20+talk}px) rotate(${gesture*2}deg)`}}>
 <Img src={staticFile(characters[scene])} style={{width:'100%',height:'100%',objectFit:'contain',filter:'drop-shadow(0px 12px 5px #35241555)'}} />
 </div>
 <div style={{position:'absolute',left:45,top:900,background:'#173b50',border:'3px solid #f2c558',borderRadius:30,color:'#fff',fontSize:20,fontWeight:900,padding:'9px 16px',opacity:enter}}>{names[scene]}</div>
 <svg width="720" height="1280" style={{position:'absolute',overflow:'visible'}}>
 <g opacity={icon} transform={`translate(${480+(1-icon)*120},630) scale(${.75+.25*icon})`}>
 <rect x="-178" y="-215" width="355" height="400" rx="34" fill="#fff7dc" stroke="#18314b" strokeWidth="8"/>
 {subject==='chart'&&<g>
  {[0,1,2,3].map(i=><line key={i} x1="-135" x2="135" y1={-130+i*75} y2={-130+i*75} stroke="#d1c6a4" strokeWidth="2"/>)}
  <path d="M-135 115 L-80 50 L-30 75 L20 -15 L70 10 L135 -105" fill="none" stroke="#1a8e63" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="500" strokeDashoffset={500*(1-ease(local,20,100))}/>
  <path d="M105 -101 L135 -105 L129 -75" fill="none" stroke="#1a8e63" strokeWidth="12" strokeLinecap="round"/>
  <text x="0" y="155" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="21" fill="#425263">BIỂU ĐỒ MINH HỌA</text>
 </g>}
 {subject==='question'&&<g><At x={0} y={40} s={1.05}><GoldBar/></At><text x="0" y="-35" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="145" fill="#1679b8" transform={`rotate(${gesture*5})`}>?</text></g>}
 {(subject==='gold'||subject==='history')&&<g><At x={0} y={40+Math.sin(local/15)*8} s={1.3}><GoldBar/></At><At x={-72} y={-85} s={.65}><Coin sym="★"/></At><At x={80} y={-85} s={.65}><Coin sym="★"/></At></g>}
 {subject==='risk'&&<g><At x={-65} y={-65} s={.7}><Bill sym="$"/></At><At x={75} y={-55} s={.65}><Shield color="#c25b42"/></At><At x={0} y={85} s={.9}><GoldBar/></At></g>}
 {subject==='bank'&&<g><At x={0} y={-20} s={.85}><Bank label=""/></At><At x={-66} y={105} s={.52}><GoldBar/></At><At x={65} y={105} s={.52}><GoldBar/></At></g>}
 {subject==='safety'&&<g><At x={0} y={-60} s={.8}><Shield color="#328553"/></At><At x={-77} y={100} s={.5}><GoldBar/></At><At x={75} y={98} s={.55}><Bill sym="$"/></At></g>}
 </g>
 {/* A simple foreground puppet arm points at the current prop. */}
 <g opacity={enter} transform={`translate(${(1-enter)*-280},${-bounce*20+talk})`}>
 <line x1="290" y1="750" x2={355+gesture*14} y2={705-gesture*15} stroke="#152332" strokeWidth="43" strokeLinecap="round"/>
 <line x1="290" y1="750" x2={355+gesture*14} y2={705-gesture*15} stroke={scene===2?'#f6efd7':'#195d45'} strokeWidth="31" strokeLinecap="round"/>
 <circle cx={355+gesture*14} cy={705-gesture*15} r="22" fill="#ffdb9c" stroke="#152332" strokeWidth="6"/>
 </g>
 <Burst x={500} y={420} at={sceneStart+18} f={f} color="#e0a31d" size={45}/>
 </svg>
 <div style={{position:'absolute',bottom:145,left:56,right:56,minHeight:108,display:'flex',alignItems:'center',justifyContent:'center',padding:'15px 18px',borderRadius:22,textAlign:'center',fontWeight:800,fontSize:35,lineHeight:1.18,color:'#fff',background:'rgba(12,24,38,.88)',textShadow:'0 2px 5px #000'}}>{subtitle}</div>
 <div style={{position:'absolute',bottom:95,left:0,right:0,textAlign:'center',fontSize:19,color:'#fff0c7'}}>BẢN DỰNG HÌNH · CHƯA CÓ GIỌNG ĐỌC</div>
 </AbsoluteFill>
};
