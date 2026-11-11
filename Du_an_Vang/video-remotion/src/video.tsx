import React from 'react';
import {AbsoluteFill,Audio,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {TIMELINE} from './vang/timeline';
import {At,GoldBar} from './stickman/props';
import {Burst} from './stickman/fx';

export const Preview: React.FC<{voice?: string}> = ({voice}) => {
 const f=useCurrentFrame();
 const cue=TIMELINE.cues.find(c=>f>=c.startFrame && f<c.endFrame);
 const cueStart=(n:number)=>TIMELINE.cues[n].startFrame;
 const n=f<cueStart(9)?0:f<cueStart(14)?1:f<cueStart(18)?2:3;
 const from=[0,cueStart(9),cueStart(14),cueStart(18)][n], to=[cueStart(9),cueStart(14),cueStart(18),TIMELINE.durationInFrames][n];
 const zoom=interpolate(f,[from,to],[1.03,1.12],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const art=['truong-phi-vang.png','gia-cat-luong-vang.png','lich-su-vang.png','kho-du-tru-vang.png'][n];
 const title=f<cueStart(2)?'GIÁ VÀNG\nTĂNG HAY GIẢM?':f<cueStart(4)?'CƠ HỘI\nHAY RỦI RO?':n===0?'TRƯƠNG PHI\nVÀ NHỊP TĂNG':n===1?'VÌ SAO VÀNG\nCÓ GIÁ TRỊ?':n===2?'VÀNG: TÀI SẢN\nLƯU GIỮ GIÁ TRỊ':'DỰ TRỮ VÀ\nĐA DẠNG HÓA';
 return <AbsoluteFill style={{backgroundColor:'#1e1614',fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
  {voice && <Audio src={staticFile(voice)} />}
  <AbsoluteFill style={{transform:`scale(${zoom})`}}><Img src={staticFile(art)} style={{width:'100%',height:'100%',objectFit:'cover'}} /></AbsoluteFill>
  <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(24,20,26,.70),transparent 37%,transparent 58%,rgba(22,15,22,.86))'}} />
  <div style={{position:'absolute',top:105,left:42,right:42,textAlign:'center',color:'#fff2c2',fontSize:27,fontWeight:800,letterSpacing:3}}>CHUYỆN TÀI CHÍNH</div>
  <div style={{position:'absolute',top:160,left:35,right:35,textAlign:'center',color:'#fff',fontSize:61,lineHeight:1.05,fontWeight:900,whiteSpace:'pre-line',textShadow:'0 4px 0 #6b2a14, 0 8px 18px #000'}}>{title}</div>
  <svg width="720" height="1280" style={{position:'absolute'}}><Burst x={570} y={510} at={205} f={f} size={60} color="#ffc837"/><g opacity={f>200&&f<390?1:0}><At x={600} y={750} s={.55}><GoldBar /></At></g></svg>
  <div style={{position:'absolute',bottom:145,left:70,right:70,minHeight:120,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',fontSize:37,lineHeight:1.22,fontWeight:800,color:'white',textShadow:'0 3px 8px #000',background:'rgba(22,24,31,.72)',borderRadius:24,padding:'15px 22px'}}>{cue?.text || ''}</div>
  <div style={{position:'absolute',bottom:95,left:0,right:0,textAlign:'center',fontSize:20,color:'#fff4cf'}}>BẢN MẪU · CHƯA CÓ GIỌNG ĐỌC</div>
 </AbsoluteFill>;
};
