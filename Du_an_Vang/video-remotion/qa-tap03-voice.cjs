const {bundle}=require('@remotion/bundler');
const {openBrowser,selectComposition,renderStill}=require('@remotion/renderer');
const fs=require('fs'); const path=require('path');
(async()=>{
 const folder=path.resolve('../../Videos/tap-03-ren-luyen-ky-luat/phien-ban-co-giong');
 const out=path.join(folder,'qa/frames');fs.mkdirSync(out,{recursive:true});
 const scenes=JSON.parse(fs.readFileSync(path.join(folder,'storyboard.json'),'utf8')).visualBeats;
 const serveUrl=await bundle({entryPoint:path.resolve('src/tap03-voice-final.tsx'),onProgress:()=>{}});
 const browser=await openBrowser('chrome',{browserExecutable:require('./qa-browser.cjs').browserExecutable(),logLevel:'error'});
 try{
  const composition=await selectComposition({serveUrl,id:'Tap03CoGiong',puppeteerInstance:browser,logLevel:'error'});
  for(const s of scenes){
   const offsets=[Math.floor(s.durationFrames*.20),Math.floor(s.durationFrames*.75)];
   for(let i=0;i<offsets.length;i++){
    await renderStill({composition,serveUrl,puppeteerInstance:browser,frame:s.frame+offsets[i],output:path.join(out,`${String(s.id).padStart(2,'0')}-${i}.png`),imageFormat:'png',scale:.25,logLevel:'error'});
   }
   if(s.id%10===0)console.log(`Rendered ${s.id}/${scenes.length} scenes`);
  }
 }finally{await browser.close({silent:true});}
})().catch(e=>{console.error(e);process.exit(1)});
