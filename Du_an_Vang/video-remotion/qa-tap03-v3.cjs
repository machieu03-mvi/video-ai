const {bundle}=require('@remotion/bundler');
const {openBrowser,selectComposition,renderStill}=require('@remotion/renderer');
const fs=require('fs');
const path=require('path');
(async()=>{
 const root=path.resolve('../..');
 const out=path.join(root,'Videos/tap-03-ren-luyen-ky-luat/qa/v3-scenes');
 fs.mkdirSync(out,{recursive:true});
 const scenes=JSON.parse(fs.readFileSync(path.join(root,'Videos/tap-03-ren-luyen-ky-luat/storyboard-v3.json'),'utf8')).visualBeats;
 const serveUrl=await bundle({entryPoint:path.resolve('src/tap03-v3.tsx'),onProgress:()=>{}});
 const browser=await openBrowser('chrome',{browserExecutable:require('./qa-browser.cjs').browserExecutable(),logLevel:'error'});
 try {
  const composition=await selectComposition({serveUrl,id:'Tap03V3',puppeteerInstance:browser,logLevel:'error'});
  for(let i=0;i<scenes.length;i++){
   const e=scenes[i];
   await renderStill({composition,serveUrl,puppeteerInstance:browser,frame:e.frame+Math.floor(e.durationFrames/2),output:path.join(out,`${String(i+1).padStart(2,'0')}.png`),imageFormat:'png',scale:0.5,logLevel:'error'});
   if((i+1)%10===0)console.log(`Đã kiểm tra ${i+1}/${scenes.length} cảnh`);
  }
 } finally {await browser.close({silent:true});}
})().catch(e=>{console.error(e);process.exit(1)});
