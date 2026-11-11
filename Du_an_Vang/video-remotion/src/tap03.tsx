import React from 'react';
import {AbsoluteFill,Audio,Composition,Img,registerRoot,staticFile,useCurrentFrame} from 'remotion';
import {VIDEO_FONT} from './fonts';
import {TIMELINE} from '../../../Videos/tap-03-ren-luyen-ky-luat/src/timeline';
import PROFILE from '../../../Quy_trinh_video/visual-profile.json';
import {ASSETS} from './tap03-assets';
import {BEATS} from './tap03-beats';
const END=TIMELINE.cues[TIMELINE.cues.length-1].endFrame+60;
const sections=[
 {start:0,end:8,title:'BẮT ĐẦU TỪ ĐÂU?',sheet:'scene0',poses:[0,0,0,0]},
 {start:8,end:11,title:'MỘT QUY TẮC NHỎ',sheet:'scene0',poses:[1,1,2,2]},
 {start:11,end:19,title:'ĐẶT ĐIỂM DỪNG LỖ',sheet:'scene0',poses:[2,2,3,3]},
 {start:19,end:25,title:'TỪNG BƯỚC MỘT',sheet:'scene4',poses:[0,1,2,3]},
 {start:25,end:32,title:'BẢNG KIỂM TRA',sheet:'scene1',poses:[0,0,1,0]},
 {start:32,end:40,title:'BA CÂU HỎI',sheet:'scene1',poses:[0,1,2,1]},
 {start:40,end:43,title:'CHƯA ĐẠT → DỪNG',sheet:'scene1',poses:[2,3,3,3]},
 {start:43,end:48,title:'KHI CẢM XÚC DÂNG CAO',sheet:'scene2',poses:[0,0,0,1]},
 {start:48,end:55,title:'DỪNG LẠI BA GIÂY',sheet:'scene2',poses:[1,2,2,3]},
 {start:55,end:64,title:'THỞ HÌNH HỘP',sheet:'scene2',poses:[3,3,3,3]},
 {start:64,end:70,title:'BÌNH TĨNH QUAN SÁT',sheet:'scene2',poses:[3,2,0,1]},
 {start:70,end:75,title:'ĐẶT CÂU HỎI ĐÚNG',sheet:'scene1',poses:[0,1,2,2]},
 {start:75,end:81,title:'QUY TẮC NGẮT GIAO DỊCH',sheet:'scene3',poses:[0,0,1,1]},
 {start:81,end:87,title:'DỪNG THEO KẾ HOẠCH',sheet:'scene3',poses:[1,2,2,3]},
 {start:87,end:91,title:'BẢO VỆ TÀI KHOẢN',sheet:'scene3',poses:[2,3,3,3]},
 {start:91,end:96,title:'KỶ LUẬT TỪNG BƯỚC',sheet:'scene4',poses:[0,1,2,3]}
];
const Episode:React.FC<{voice?:string}>=({voice})=>{
 const frame=useCurrentFrame();
 if(frame>=END)return <AbsoluteFill style={{fontFamily:VIDEO_FONT,background:PROFILE.background.fallback,justifyContent:'center',alignItems:'center'}}><Img src={staticFile('tap03/nen-giay.png')} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',filter:PROFILE.background.filter}}/><div style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',gap:38,opacity:Math.min(1,(frame-END)/15)}}><Img src={staticFile('tap03/logo.png')} style={{width:300,height:300,objectFit:'contain'}}/><div style={{textAlign:'center',fontSize:49,fontWeight:900,lineHeight:1.2,color:'#173b50'}}>Hiểu đúng<br/>để đi xa hơn</div></div></AbsoluteFill>;
 let cueIndex=0;for(let i=0;i<TIMELINE.cues.length;i++){if(frame>=TIMELINE.cues[i].startFrame)cueIndex=i;}
 const sec=sections.find(s=>cueIndex>=s.start&&cueIndex<s.end)??sections[0];
 const beat=BEATS.reduce((previous,b)=>frame>=b.frame?b:previous,BEATS[0]);
 const k=beat.pose,a=ASSETS[beat.sheet],bounds=beat.sheet==='scene5'?[0,510,1030,1640,2172]:null;
 const x=bounds?bounds[k]:k*a.panelWidth,cellWidth=bounds?bounds[k+1]-bounds[k]:a.panelWidth,y=a.floors[k]-560;
 const current=TIMELINE.cues.find(c=>frame>=c.startFrame&&frame<c.endFrame);
 const breath=cueIndex>=58&&cueIndex<=61?['HÍT VÀO · 4 NHỊP','GIỮ HƠI · 4 NHỊP','THỞ RA · 4 NHỊP','NGHỈ · 4 NHỊP'][cueIndex-58]:null;
 return <AbsoluteFill style={{fontFamily:VIDEO_FONT,background:'#f5f3ed'}}><Img src={staticFile('tap03/nen-giay.png')} style={{position:'absolute',width:'100%',height:'100%',objectFit:'cover',filter:PROFILE.background.filter}}/>{voice&&<Audio src={staticFile(voice)}/>}<AbsoluteFill style={{opacity:Math.min(1,(END-frame)/15)}}>
 <div style={{position:'absolute',top:80,width:'100%',textAlign:'center',fontSize:23,fontWeight:900,color:'#9b6019'}}>TẬP 3 · TÂM LÝ GIAO DỊCH</div>
 <div style={{position:'absolute',top:140,left:40,right:40,textAlign:'center',fontSize:46,lineHeight:1.17,fontWeight:900,color:'#173b50'}}>{sec.title}</div>
 {breath&&<div style={{position:'absolute',top:285,width:'100%',textAlign:'center',fontSize:32,fontWeight:900,color:'#8c5b25'}}>{breath}</div>}
 <svg width="720" height="1280" style={{position:'absolute'}}><defs><filter id="alpha"><feComponentTransfer><feFuncA type="linear" slope="3" intercept="-2"/></feComponentTransfer></filter></defs><path d="M0 890H720" stroke="#bfa578" strokeWidth="4"/></svg>
 <svg style={{position:'absolute',top:890-560*620/610,left:20}} width="680" height="620" viewBox={`${x} ${y} ${cellWidth} 610`}><defs><clipPath id="cell"><rect x={x+3} y={y} width={cellWidth-6} height="610"/></clipPath></defs><image href={staticFile('tap03/'+beat.sheet+'.png')} width={a.width} height={a.height} clipPath="url(#cell)" filter="url(#alpha)"/></svg>
 {current&&<div style={{position:'absolute',bottom:145,left:46,right:46,padding:'18px 22px',background:'#15344a',color:'#fff',borderRadius:22,fontSize:32,fontWeight:800,lineHeight:1.28,textAlign:'center'}}>{current.text}</div>}
 {!voice&&<div style={{position:'absolute',bottom:92,width:'100%',textAlign:'center',fontSize:17,fontWeight:800,color:'#73552d'}}>BẢN HÌNH TẠM · CHỜ GIỌNG ĐỌC</div>}
 </AbsoluteFill></AbsoluteFill>;
};
registerRoot(()=> <Composition id="Tap03" component={Episode} fps={30} width={720} height={1280} durationInFrames={END+90}/>);
