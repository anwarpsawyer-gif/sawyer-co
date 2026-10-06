const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--allow-file-access-from-files']});
const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.goto('file://'+process.cwd()+'/static_post.html');await p.evaluate(()=>document.fonts.ready);
await p.waitForTimeout(300);await p.screenshot({path:'static_post.png'});await b.close();})();
