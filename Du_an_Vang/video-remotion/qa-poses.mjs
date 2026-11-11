import qaBrowser from './qa-browser.cjs';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';
const tl=JSON.parse(fs.readFileSync('src/vang/timeline.json','utf8'));
const cuts=[0,...[4,9,12,14,16,18,21,22].map(i=>tl.cues[i].startFrame),tl.durationInFrames];
const browser=await openBrowser('chrome',{browserExecutable:qaBrowser.browserExecutable()});
const ending=process.argv.includes('--ending');
const shadows=process.argv.includes('--shadows');
const dir=shadows?'out/qa-v6-shadows':ending?'out/qa-v5-ending':'out/qa-v4';
try{
 const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts')});
 const composition=await selectComposition({serveUrl,id:'VangTuongTac',puppeteerInstance:browser});
 fs.mkdirSync(dir,{recursive:true});
 for(let s=ending?8:0;s<9;s++)for(let k=0;k<4;k++){
  if(shadows&&s!==2&&s!==8)continue;
  const frame=Math.floor(cuts[s]+(cuts[s+1]-cuts[s])*[.1,.3,.56,.86][k]);
  await renderStill({serveUrl,composition,frame,output:`${dir}/s${s}-p${k}.png`,scale:.4,puppeteerInstance:browser});
 }
 console.log(shadows?'8 shadow-removal pose frames rendered':ending?'4 ending pose frames rendered':'36 pose frames checked for render errors');
}finally{await browser.close({silent:true});}
