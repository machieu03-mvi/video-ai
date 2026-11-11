const {bundle}=require('@remotion/bundler');
const {openBrowser,selectComposition,renderStill}=require('@remotion/renderer');
const path=require('path');
(async()=>{
 const serveUrl=await bundle({entryPoint:path.resolve('src/tap03-demo-motion.tsx'),onProgress:()=>{}});
 const browser=await openBrowser('chrome',{browserExecutable:'C:/Program Files/Google/Chrome/Application/chrome.exe',logLevel:'error'});
 try {
  const composition=await selectComposition({serveUrl,id:'Tap03DemoMotion',puppeteerInstance:browser,logLevel:'error'});
  for(const frame of [0,30,55,210,257,275,295,320,336,375,496,556])
   await renderStill({composition,serveUrl,puppeteerInstance:browser,frame,output:path.resolve(`../../Videos/tap-03-ren-luyen-ky-luat/demo-chuyen-dong/qa/${String(frame).padStart(3,'0')}.png`),imageFormat:'png',scale:0.5,logLevel:'error'});
 } finally {await browser.close({silent:true});}
})().catch(e=>{console.error(e);process.exit(1)});
