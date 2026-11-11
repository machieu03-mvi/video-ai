import qaBrowser from './qa-browser.cjs';
import {bundle} from '@remotion/bundler';import {openBrowser,renderStill,selectComposition} from '@remotion/renderer';import fs from 'node:fs';import path from 'node:path';
const t=JSON.parse(fs.readFileSync('../../Videos/tap-02-ky-luat-la-mot-co-bap/src/timeline.json','utf8'));const cuts=[0,...[1,3,7,11,13,14].map(i=>t.cues[i].startFrame),t.durationInFrames];
const out='../../Videos/tap-02-ky-luat-la-mot-co-bap/qa';fs.mkdirSync(out,{recursive:true});
const browser=await openBrowser('chrome',{browserExecutable:qaBrowser.browserExecutable()});try{const serveUrl=await bundle({entryPoint:path.resolve('src/tap02.tsx')});const composition=await selectComposition({serveUrl,id:'Tap02',puppeteerInstance:browser});for(let s=0;s<7;s++)for(let k=0;k<4;k++){await renderStill({composition,serveUrl,frame:Math.floor(cuts[s]+(cuts[s+1]-cuts[s])*(k+.3)/4),output:`${out}/s${s}-p${k}.png`,scale:.4,puppeteerInstance:browser});}for(const frame of [1050,...cuts.slice(1,-1).flatMap(f=>[f-1,f])]){await renderStill({composition,serveUrl,frame,output:out+"/extra-"+frame+".png",scale:frame===1050?1:.4,puppeteerInstance:browser});}console.log("41 frames rendered");}finally{await browser.close({silent:true})}


