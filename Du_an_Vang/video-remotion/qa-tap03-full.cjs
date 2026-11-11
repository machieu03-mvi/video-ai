const {bundle}=require('@remotion/bundler');
const {openBrowser,selectComposition,renderStill}=require('@remotion/renderer');
const fs=require('fs');const path=require('path');
(async()=>{
 const root=path.resolve('../..');
 const folder=path.join(root,'Videos/tap-03-ren-luyen-ky-luat/phien-ban-hoat-hoa');
 const out=path.join(folder,'qa/frames');fs.mkdirSync(out,{recursive:true});
 const scenes=JSON.parse(fs.readFileSync(path.join(folder,'storyboard.json'),'utf8')).visualBeats;
 const serveUrl=await bundle({entryPoint:path.resolve('src/tap03-animation-full.tsx'),onProgress:()=>{}});
 const browser=await openBrowser('chrome',{browserExecutable:require('./qa-browser.cjs').browserExecutable(),logLevel:'error'});
 try{
  const composition=await selectComposition({serveUrl,id:'Tap03HoatHoa',puppeteerInstance:browser,logLevel:'error'});
  for(const s of scenes){
   let offsets;
   if(s.kind==='grid'){
    const first=Math.floor(s.durationFrames*.28),second=Math.floor(s.durationFrames*.68);
    offsets=[Math.min(5,s.durationFrames-1),first,first+6,first+12,second,second+6];
   }else if(s.kind==='patience') offsets=[0,22,46,67];
   else if(s.sheet==='shot0') offsets=[0,20,26,32,38,50,127,157,218];
   else if(s.sheet==='shot1') offsets=[0,9,17,25,34,44,55,65];
   else offsets=[0,40,91,110,122,134,189,213];
   for(let j=0;j<offsets.length;j++){
    const frame=s.frame+Math.min(s.durationFrames-1,offsets[j]);
    await renderStill({composition,serveUrl,puppeteerInstance:browser,frame,output:path.join(out,`${String(s.id).padStart(2,'0')}-${j}.png`),imageFormat:'png',scale:.25,logLevel:'error'});
   }
   if(s.id%8===0)console.log(`Đã xuất khung kiểm tra ${s.id}/${scenes.length}`);
  }
 }finally{await browser.close({silent:true});}
})().catch(e=>{console.error(e);process.exit(1)});
