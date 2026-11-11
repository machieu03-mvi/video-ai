import React from 'react';
import {Easing,interpolate,staticFile} from 'remotion';
const IMAGE='rig-truong-phi/parts.png';
type PartProps={x:number;y:number;w:number;h:number;crop:string;cleanTorso?:boolean};
const Part:React.FC<PartProps>=({x,y,w,h,crop,cleanTorso})=><svg x={x} y={y} width={w} height={h} viewBox={crop} preserveAspectRatio="xMidYMid meet" overflow="hidden"><defs><clipPath id="torso-clip"><path d="M550 65 H1035 V180 H1055 V500 H550 Z"/></clipPath></defs><image href={staticFile(IMAGE)} width="1536" height="1024" filter="url(#clean)" clipPath={cleanTorso?'url(#torso-clip)':undefined}/></svg>;
export const TruongPhiRig:React.FC<{frame:number}>=({frame:f})=>{
 const opt={extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.sin)} as const;
 const right=interpolate(f,[0,25,75,110,160,195,239],[0,0,-42,-42,-18,-18,0],opt);
 const left=interpolate(f,[0,45,85,140,190,239],[0,0,12,12,0,0],opt);
 const head=interpolate(f,[0,35,85,135,185,239],[0,0,-3,2,0,0],opt);
 return <g>
 <Part x={96} y={515} w={105} h={175} crop="665 665 200 260"/><Part x={280} y={515} w={105} h={175} crop="1180 665 200 260"/>
 <g transform={`translate(90 300) rotate(${left})`}><Part x={-52} y={-15} w={118} h={250} crop="1190 75 225 420"/></g>
 <g transform={`translate(350 300) rotate(${right})`}><Part x={-60} y={-15} w={130} h={250} crop="170 555 230 420"/></g>
 <Part x={22} y={235} w={445} h={370} crop="550 65 505 435" cleanTorso/>
 <g transform={`rotate(${head} 245 255)`}><Part x={38} y={0} w={415} h={360} crop="55 15 455 500"/></g>
 </g>};
