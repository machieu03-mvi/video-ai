import {cancelRender,continueRender,delayRender,staticFile} from 'remotion';
export const VIDEO_FONT='Be Vietnam Pro';
if(typeof document!=='undefined'){
 const handle=delayRender('Loading Vietnamese fonts');
 Promise.all([['800','BeVietnamPro-ExtraBold.ttf'],['900','BeVietnamPro-Black.ttf']].map(async([weight,file])=>{
  const face=new FontFace(VIDEO_FONT,`url("${staticFile('fonts/'+file)}")`,{weight,style:'normal'});
  document.fonts.add(await face.load());
 })).then(()=>continueRender(handle)).catch(cancelRender);
}
