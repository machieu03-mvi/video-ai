import qaBrowser from './qa-browser.cjs';
import {bundle} from '@remotion/bundler';import {openBrowser,renderStill,selectComposition} from '@remotion/renderer';import fs from 'node:fs';import path from 'node:path';
const t=JSON.parse(fs.readFileSync('../../Videos/tap-03-ren-luyen-ky-luat/src/timeline.json','utf8'));const cuts=[0,...[8,22,43,55,75,91].map(i=>t.cues[i].startFrame),t.durationInFrames];
const out='../../Videos/tap-03-ren-luyen-ky-luat/qa';fs.mkdirSync(out,{recursive:true});
const browser=await openBrowser('chrome',{browserExecutable:qaBrowser.browserExecutable()});try{const serveUrl=await bundle({entryPoint:path.resolve('src/tap03.tsx')});const composition=await selectComposition({serveUrl,id:'Tap03',puppeteerInstance:browser});for(let s=0;s<7;s++)for(let k=0;k<4;k++){await renderStill({composition,serveUrl,frame:Math.floor(cuts[s]+(cuts[s+1]-cuts[s])*(k+.3)/4),output:`${out}/s${s}-p${k}.png`,scale:.4,puppeteerInstance:browser});}console.log('28 frames rendered');}finally{await browser.close({silent:true})}

