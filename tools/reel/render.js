const {chromium}=require('playwright');const fs=require('fs');
const [,,mode,a,b]=process.argv;
(async()=>{const br=await chromium.launch();const pg=await br.newPage({viewport:{width:1080,height:1920}});
await pg.goto('file://'+__dirname+'/page.html');const ok=await pg.evaluate(()=>window.ready);if(!ok){console.log('FONT FAIL');process.exit(1)}
const save=(f,d)=>fs.writeFileSync(f,Buffer.from(d.split(',')[1],'base64'));
if(mode==='frames'){fs.mkdirSync('g',{recursive:true});for(let n=+a;n<+b;n++){save(`g/${String(n).padStart(4,'0')}.png`,await pg.evaluate(t=>window.render(t),n/30))}}
else if(mode==='times'){fs.mkdirSync('chk',{recursive:true});for(const t of a.split(','))save(`chk/t${t}.png`,await pg.evaluate(t=>window.render(t),+t))}
else if(mode==='cover'){save('cover.png',await pg.evaluate(()=>window.drawCover()))}
else if(mode==='sfx'){console.log(JSON.stringify(await pg.evaluate(()=>window.SFX)))}
await br.close()})();
