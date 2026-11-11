const {bundle}=require('@remotion/bundler');
const {openBrowser,selectComposition,renderStill}=require('@remotion/renderer');
const path=require('path');
(async()=>{
 const serveUrl=await bundle({entryPoint:path.resolve('src/tap03-demo-motion-v2.tsx'),onProgress:()=>{}});
 const browser=await openBrowser('chrome',{browserExecutable:require('./qa-browser.cjs').browserExecutable(),logLevel:'error'});
 try {
  const composition=await selectComposition({serveUrl,id:'Tap03DemoMotionV2',puppeteerInstance:browser,logLevel:'error'});
  for(const frame of [20,26,38,44,266,274,291,312,427,446,458,525])
   await renderStill({composition,serveUrl,puppeteerInstance:browser,frame,output:path.resolve(`../../Videos/tap-03-ren-luyen-ky-luat/demo-chuyen-dong/qa/v2-${String(frame).padStart(3,'0')}.png`),imageFormat:'png',scale:0.5,logLevel:'error'});
 } finally {await browser.close({silent:true});}
})().catch(e=>{console.error(e);process.exit(1)});
