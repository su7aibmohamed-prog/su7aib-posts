// SU7IAB/SUD reel v2 — الاسم الأعظم (Abu Dawud 1493 / Tirmidhi 3475, sahih per al-Albani). Voice: @lamha_story.
// v2: hook card, text inside shapes (cards / pills / highlight bars / lists), bigger type, bolder visuals, slow zoom, voice trimmed to ~35s.
// Audio edit (see build notes): keep [0,29.40] + [34.42,39.98] of the original voice  => words after the cut are at t-5.02.
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
const W=1080,H=1920,CX=540,DUR=37.6;window.DUR=DUR;const HANDLE='@SUD.REELS';
const BG='#791C2E',BG_IN='#8B2437',BG_OUT='#4E0F1C',BONE='#F8F6EF',GOLD='#E6C79C',GOLD2='#F3DDB8',DEEP='#5A1220';
const cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),lerp=(a,b,k)=>a+(b-a)*k,prog=(t,a,d)=>cl((t-a)/d);
const eIO=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const eO=x=>{x=cl(x);return 1-Math.pow(1-x,3)},eO5=x=>{x=cl(x);return 1-Math.pow(1-x,5)},eI=x=>{x=cl(x);return x*x*x};
const eOB=(x,s=1.70158)=>{x=cl(x);return 1+(s+1)*Math.pow(x-1,3)+s*Math.pow(x-1,2)};
function rng(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
const GR=[];{for(let k=0;k<4;k++){const g=document.createElement('canvas');g.width=540;g.height=960;const gx=g.getContext('2d'),im=gx.createImageData(540,960),r=rng(77+k);for(let i=0;i<im.data.length;i+=4){const v=r()*255;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=14}gx.putImageData(im,0,0);GR.push(g)}}
function ring(x,y,r,lw,col,a){if(a<=0||r<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.lineWidth=lw;ctx.strokeStyle=col;ctx.stroke();ctx.restore()}
function softGlow(x,y,r,a){if(a<=0)return;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(230,199,156,${a})`);g.addColorStop(.5,`rgba(230,199,156,${a*.35})`);g.addColorStop(1,'rgba(230,199,156,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r)}
function stroke(lw=6,c=GOLD){ctx.lineWidth=lw;ctx.strokeStyle=c;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}
function saw(x,y,size,a,c=GOLD){ctx.save();ctx.globalAlpha*=a;ctx.font=`${size}px Saw`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=c;ctx.fillText('ﷺ',x,y);ctx.restore()}
// ---------- shapes for text
function box(x,y,w,h,r,style,a){ctx.save();ctx.globalAlpha*=a;ctx.beginPath();ctx.roundRect(x,y,w,h,r);
 if(style=='fill'){ctx.shadowColor='rgba(0,0,0,.25)';ctx.shadowBlur=30;ctx.shadowOffsetY=10;ctx.fillStyle=GOLD;ctx.fill()}
 else if(style=='glass'){ctx.fillStyle='rgba(248,246,239,.07)';ctx.fill();ctx.lineWidth=2.5;ctx.strokeStyle='rgba(230,199,156,.75)';ctx.stroke()}
 else{ctx.lineWidth=3;ctx.strokeStyle=GOLD;ctx.stroke()}ctx.restore()}
// a phrase: words [[w,t,key]] key:1 gold text, 2 gold highlight bar (inverted). opt.box: 'fill'|'glass'|'line' container that pops in.
function phrase(words,y,size,t,o={}){const A=(o.a??1)*ctx.globalAlpha;if(A<=.003)return;ctx.save();ctx.font=`${o.w||700} ${size}px Sh`;const sp=ctx.measureText(' ').width;
 const ws=words.map(q=>ctx.measureText(q[0]).width);const tot=ws.reduce((s,v)=>s+v,0)+sp*(ws.length-1);
 const t0=o.boxT??(words[0][1]-.18);
 if(o.box){const px=o.px??46,py=o.py??(size*.42);const k=prog(t,t0,.42);if(k>0){const s=eOB(k,2.1);const bw=(tot+px*2)*lerp(.6,1,eO(k)),bh=size+py*2;
   ctx.save();ctx.translate(CX,y);ctx.scale(s,s);box(-bw/2,-bh/2,bw,bh,o.r??bh/2.6,o.box,A*cl(k*3));ctx.restore()}}
 const inv=o.box=='fill';let x=CX+tot/2;ctx.direction='rtl';ctx.textAlign='right';ctx.textBaseline='middle';
 words.forEach((q,i)=>{const k=prog(t,q[1]-.04,.3);const key=q[2];
  if(k>0){if(key==2){const hk=eIO(prog(t,q[1]-.02,.32));if(hk>0){ctx.save();ctx.globalAlpha=A;ctx.beginPath();const hw=(ws[i]+28)*hk;ctx.roundRect(x+14-hw,y-size*.58,hw,size*1.12,size*.22);ctx.fillStyle=GOLD;ctx.fill();ctx.restore()}}
   ctx.save();ctx.globalAlpha=A*eO(k);if(k<1)ctx.filter=`blur(${8*(1-eO5(k))}px)`;
   ctx.fillStyle=inv?DEEP:key==2?DEEP:key==1?GOLD:(o.c||BONE);if(key==1&&!inv){ctx.shadowColor='rgba(230,199,156,.5)';ctx.shadowBlur=24}
   const sc=lerp(1.16,1,eOB(k,1.4));ctx.translate(x-ws[i]/2,y+16*(1-eO(k)));ctx.scale(sc,sc);ctx.font=`${o.w||700} ${size}px Sh`;ctx.fillText(q[0],ws[i]/2,0);ctx.restore();
   if(key==1&&!inv&&o.ul!==false){const u=eIO(prog(t,q[1]+.15,.35));if(u>0){ctx.save();ctx.globalAlpha=A*.85;ctx.strokeStyle=GOLD;ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x,y+size*.64);ctx.lineTo(x-ws[i]*u,y+size*.64);ctx.stroke();ctx.restore()}}}
  x-=ws[i]+sp});ctx.restore()}
function tag(s,y,t,t0,o={}){const k=prog(t,t0,.4);if(k<=0)return;ctx.save();const F=`500 ${o.size||42}px Px`,SF='60px Saw';
 const parts=s.split('{S}');const segs=[];parts.forEach((p,i)=>{if(p)segs.push([p,F]);if(i<parts.length-1)segs.push(['ﷺ',SF])});
 const ws=segs.map(q=>{ctx.font=q[1];return ctx.measureText(q[0]).width});const tw=ws.reduce((a,b)=>a+b,0);const w=tw+96;const sc=eOB(k,2.4);ctx.translate(CX,y);ctx.scale(sc,sc);
 ctx.beginPath();ctx.roundRect(-w/2,-40,w,80,40);ctx.fillStyle='rgba(230,199,156,.14)';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='rgba(230,199,156,.7)';ctx.stroke();
 ctx.beginPath();ctx.arc(w/2-34,0,7,0,7);ctx.fillStyle=GOLD;ctx.fill();
 ctx.direction='rtl';ctx.textAlign='right';ctx.textBaseline='middle';let x=tw/2-12;segs.forEach((q,i)=>{ctx.font=q[1];ctx.fillStyle=q[1]==SF?GOLD:GOLD2;ctx.fillText(q[0],x,q[1]==SF?0:2);x-=ws[i]});ctx.restore()}
// list pill row: bullet + text, pops from the right
function listPill(words,y,size,t,t0,o={}){const k=prog(t,t0,.45);if(k<=0)return;ctx.save();ctx.font=`700 ${size}px Sh`;const sp=ctx.measureText(' ').width;const tw=words.reduce((s,q)=>s+ctx.measureText(q[0]).width,0)+sp*(words.length-1);
 const w=tw+130,h=size*1.55,x0=CX+w/2;const dx=(1-eO5(k))*120;ctx.save();ctx.globalAlpha*=cl(k*3);ctx.translate(dx,0);
 ctx.beginPath();ctx.roundRect(x0-w,y-h/2,w,h,h/2);ctx.fillStyle=o.fill?GOLD:'rgba(248,246,239,.07)';ctx.fill();ctx.lineWidth=2.5;ctx.strokeStyle='rgba(230,199,156,.8)';ctx.stroke();
 const bk=eOB(prog(t,t0+.1,.35),2.6);ctx.beginPath();ctx.arc(x0-42,y,13*bk,0,7);ctx.fillStyle=o.fill?DEEP:GOLD;ctx.fill();ctx.restore();ctx.restore();
 ctx.save();ctx.translate(dx-36,0);phrase(words,y,size,t,{c:o.fill?DEEP:BONE});ctx.restore()}
// ---------- visuals
function arch(cx,base,w,h,p,a,lw=6){if(p<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.beginPath();const L=cx-w/2,R=cx+w/2,top=base-h;ctx.moveTo(L,base);ctx.lineTo(L,top+w*.55);ctx.quadraticCurveTo(L,top+w*.05,cx,top);ctx.quadraticCurveTo(R,top+w*.05,R,top+w*.55);ctx.lineTo(R,base);
 ctx.setLineDash([2600]);ctx.lineDashOffset=2600*(1-p);stroke(lw);ctx.restore()}
function star8(cx,cy,R,rot,p,a,lw=5){if(p<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.translate(cx,cy);ctx.rotate(rot);for(let k=0;k<2;k++){ctx.save();ctx.rotate(k*Math.PI/4);ctx.beginPath();ctx.rect(-R*.7,-R*.7,R*1.4,R*1.4);ctx.setLineDash([R*5.6]);ctx.lineDashOffset=R*5.6*(1-p);stroke(lw);ctx.restore()}ctx.restore()}
const DUST=[];{const r=rng(31);for(let i=0;i<60;i++)DUST.push({x:r()*W,y:r()*H,z:.3+r(),ph:r()*6.28,s:1+r()*2.6})}
const RAIN=[];{const r=rng(12);for(let i=0;i<40;i++)RAIN.push({x:CX+(r()-.5)*560,d:r()*.9,sp:.8+r()*.6,s:4+r()*5})}
function bg(t){const g=ctx.createRadialGradient(CX,900,80,CX,960,1300);g.addColorStop(0,BG_IN);g.addColorStop(.55,BG);g.addColorStop(1,BG_OUT);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 ctx.save();ctx.globalAlpha=.06;ctx.strokeStyle=GOLD;ctx.lineWidth=1.5;ctx.translate(CX,960);ctx.rotate(t*.02);for(let i=0;i<2;i++){ctx.rotate(Math.PI/4);ctx.strokeRect(-470,-470,940,940)}ctx.restore();
 for(const p of DUST){const y=((p.y-t*22*p.z)%H+H)%H,x=p.x+Math.sin(t*.5*p.z+p.ph)*20;ctx.globalAlpha=(.25+.25*Math.sin(t*2*p.z+p.ph))*p.z;ctx.fillStyle=GOLD2;ctx.beginPath();ctx.arc(x,y,p.s*p.z,0,7);ctx.fill()}ctx.globalAlpha=1}
// scene wrapper: fade out + slow push-in
function scene(t,a,b,fn){if(t<a-.05||t>b+.05)return;const out=eI(prog(t,b-.3,.3));ctx.save();ctx.globalAlpha=1-out;const z=1+.035*prog(t,a,b-a)+.04*out;ctx.translate(CX,900);ctx.scale(z,z);ctx.translate(-CX,-900);if(out>0)ctx.filter=`blur(${10*out}px)`;fn();ctx.restore()}
const VY=1390;
// ---------- scenes
function S0(t){scene(t,0,2.35,()=>{ // HOOK
 tag('حديث صحيح',470,t,.05);
 phrase([['اسمٌ',.2],['إذا',.32],['دُعي',.44],['اللهُ',.56],['به…',.68]],680,92,t,{box:'fill',boxT:.12});
 phrase([['أجاب!',1.0,1]],870,170,t,{ul:false});
 const k=eOB(prog(t,1.0,.5),2);if(k>0){softGlow(CX,VY-60,330*k,.45);star8(CX,VY-60,170*k,t*.3,1,.9);for(const t0 of [1.0,1.3])ring(CX,VY-60,lerp(30,420,eO(prog(t,t0,1))),3,GOLD,1-prog(t,t0,1))}})}
function S1(t){scene(t,2.35,4.6,()=>{
 tag('دخل النبي {S} المسجد',470,t,2.4);
 phrase([['فسمع',3.06],['رجلًا',3.48],['يدعو',3.8,1],['ويقول:',4.16]],680,88,t,{box:'glass',boxT:2.9});
 arch(CX,VY+230,340,520,eIO(prog(t,2.4,1.4)),.95);arch(CX,VY+230,270,430,eIO(prog(t,2.6,1.4)),.4,3);softGlow(CX,VY+40,280,.3*eO(prog(t,3.2,1)));
 const lp=eOB(prog(t,3.0,.5),2);if(lp>0){ctx.beginPath();ctx.moveTo(CX,VY-290);ctx.lineTo(CX,VY-170);stroke(3,'rgba(230,199,156,.7)');softGlow(CX,VY-150,110*lp,.8);ring(CX,VY-150,20*lp,4,GOLD2,1)}})}
function S2(t){scene(t,4.6,10.05,()=>{ // du'a part 1 in a growing glass card
 tag('دعاء الرجل',430,t,4.62);
 const n=(t>=8.2?3:t>=6.1?2:1);const hT=lerp(0,1,1);const h=eIO(prog(t,6.1,.35))*130+eIO(prog(t,8.2,.35))*130+150;const k=eOB(prog(t,4.6,.45),2);
 ctx.save();ctx.translate(CX,690);ctx.scale(k,k);box(-470,-140,940,h+30,36,'glass',cl(k*3));ctx.restore();
 phrase([['اللَّهُمَّ',4.72],['إِنِّي',5.5],['أَسْأَلُكَ',5.78]],610,84,t);
 phrase([['بِأَنِّي',6.18],['أَشْهَدُ',6.76],['أَنَّكَ',7.12],['أَنْتَ',7.44],['اللَّهُ',7.74,2]],740,84,t);
 phrase([['لَا',8.26],['إِلَهَ',8.76],['إِلَّا',9.1],['أَنْتَ',9.4,1]],870,84,t);
 softGlow(CX,VY+40,300,.2);star8(CX,VY+40,190,t*.08,eIO(prog(t,4.7,1.4)),.85);star8(CX,VY+40,260,-t*.08,eIO(prog(t,8.2,1.4)),.35,3)})}
function S3(t){scene(t,10.05,14.1,()=>{ // attributes as a list
 tag('صفاتُ الله في الدعاء',430,t,10.06);
 // two filled pills side by side: الأحد (right) الصمد (left)
 for(const [w,t0,x] of [['الأَحَدُ',10.14,CX+190],['الصَّمَدُ',10.62,CX-190]]){const k=prog(t,t0-.06,.4);if(k<=0)continue;const s=eOB(k,2.4);ctx.save();ctx.translate(x,620);ctx.scale(s,s);box(-170,-75,340,150,75,'fill',cl(k*3));ctx.font='700 96px Sh';ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=DEEP;ctx.fillText(w,0,4);ctx.restore()}
 listPill([['الَّذِي',11.28],['لَمْ',11.64],['يَلِدْ',11.84]],800,70,t,11.2);
 listPill([['وَلَمْ',12.14],['يُولَدْ',12.38]],940,70,t,12.06);
 listPill([['وَلَمْ',12.74],['يَكُنْ',12.98],['لَهُ',13.24],['كُفُوًا',13.4],['أَحَدٌ',13.8,1]],1080,70,t,12.66);
 const one=eOB(prog(t,10.14,.5),2.4);softGlow(CX,VY+60,260,.25+.2*one);star8(CX,VY+60,190,t*.08,1,.7);if(one>0){ctx.beginPath();ctx.arc(CX,VY+60,16*one,0,7);ctx.fillStyle=GOLD2;ctx.fill()}
 for(const t0 of [10.15,10.65])ring(CX,VY+60,lerp(20,360,eO(prog(t,t0,1.3))),3,GOLD,(1-prog(t,t0,1.3))*.8)})}
function S4(t){scene(t,14.1,23.2,()=>{
 tag('فقال النبي {S} لمّا سمعه',430,t,14.16);
 phrase([['وَالَّذِي',16.54],['نَفْسِي',17.08],['بِيَدِهِ',17.54]],590,80,t);
 phrase([['لَقَدْ',18.06],['سَأَلَ',18.42],['اللَّهَ',18.78],['بِاسْمِهِ',19.02],['الأَعْظَمِ',19.5]],750,86,t,{box:'fill',boxT:17.95});
 listPill([['إِذَا',20.66],['دُعِيَ',20.96],['بِهِ',21.28],['أَجَابَ',21.48,1]],930,72,t,20.3);
 listPill([['وَإِذَا',21.96],['سُئِلَ',22.22],['بِهِ',22.52],['أَعْطَى',22.74,1]],1075,72,t,21.9);
 const Y=VY+120,b=eIO(prog(t,19.5,.9));if(b>0){const g=ctx.createLinearGradient(0,Y+260,0,Y-200);g.addColorStop(0,'rgba(243,221,184,0)');g.addColorStop(1,`rgba(243,221,184,${.28*b})`);ctx.fillStyle=g;ctx.fillRect(CX-70*b,Y-200,140*b,460);
  softGlow(CX,Y-200,240,.55*b);for(const t0 of [19.55,20.0])ring(CX,Y-200,lerp(20,400,eO(prog(t,t0,1.4))),3,GOLD,(1-prog(t,t0,1.4))*.7)}
 for(const r of RAIN){const k=prog(t,22.75+r.d*.6,1.1*r.sp);if(k<=0||k>=1)continue;const y=lerp(Y-200,Y+280,eI(k)*.6+k*.4);const x=r.x*.7+CX*.3;softGlow(x,y,26,.9*(1-k));ctx.save();ctx.globalAlpha*=(1-k);ctx.beginPath();ctx.arc(x,y,r.s*.7,0,7);ctx.fillStyle=GOLD2;ctx.fill();ctx.restore()}
 pillSrc('أبو داود ١٤٩٣ · الترمذي ٣٤٧٥ · صحّحه الألباني',1615,eO(prog(t,16.6,.6)))})}
function pillSrc(s,y,a){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.font='500 30px Px';const w=ctx.measureText(s).width+52;ctx.beginPath();ctx.roundRect(CX-w/2,y-28,w,56,28);ctx.fillStyle='rgba(230,199,156,.12)';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='rgba(230,199,156,.55)';ctx.stroke();ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=GOLD;ctx.fillText(s,CX,y+2);ctx.restore()}
function S5(t){scene(t,23.2,29.4,()=>{
 phrase([['تخيّل',23.24,2],['كلمات…',23.74]],560,110,t,{ul:false});
 phrase([['ما',24.3],['تأخذ',24.46],['منك',24.76],['ثواني',25.06,1]],720,80,t,{w:400});
 phrase([['تستفتح',25.82],['فيها',26.5],['دعاءك',26.76]],860,80,t,{box:'glass',boxT:25.7});
 phrase([['قد',27.5],['تجعل',27.82],['هذا',28.2],['الدعاء',28.46],['مستجابًا',28.86]],1010,76,t,{box:'fill',boxT:27.4});
 const cp=eOB(prog(t,23.4,.5),2);if(cp>0){ctx.save();ctx.translate(CX,VY+40);ctx.scale(cp,cp);ctx.beginPath();ctx.arc(0,0,180,0,7);stroke(6);ctx.beginPath();ctx.moveTo(-26,-204);ctx.lineTo(26,-204);ctx.moveTo(0,-204);ctx.lineTo(0,-182);stroke(8);
  for(let i=0;i<12;i++){const an=i/12*Math.PI*2;ctx.beginPath();ctx.moveTo(Math.sin(an)*152,-Math.cos(an)*152);ctx.lineTo(Math.sin(an)*166,-Math.cos(an)*166);stroke(4,'rgba(230,199,156,.7)')}
  const sw=eIO(prog(t,24.4,1.2))*.12;ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,140,-Math.PI/2,-Math.PI/2+sw*Math.PI*2);ctx.closePath();ctx.fillStyle='rgba(230,199,156,.3)';ctx.fill();
  const an=-Math.PI/2+sw*Math.PI*2;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(an)*130,Math.sin(an)*130);stroke(6,GOLD2);ctx.beginPath();ctx.arc(0,0,9,0,7);ctx.fillStyle=GOLD2;ctx.fill();
  const ok=eOB(prog(t,28.9,.5),2.4);if(ok>0){softGlow(0,0,260,.5*ok);ring(0,0,180+50*ok,3,GOLD,1-prog(t,29.0,.4))}ctx.restore()}})}
const D=5.02; // audio cut offset
function S6(t){scene(t,29.4,34.96,()=>{
 phrase([['فاحفظ',34.48-D,2],['هذه',34.9-D],['الكلمات',35.08-D],['عندك',35.52-D],['زين',35.84-D]],560,72,t);
 const k=eOB(prog(t,34.6-D,.5),1.8);if(k>0){ctx.save();ctx.translate(CX,800);ctx.scale(k,k);box(-470,-150,940,300,32,'glass',1);
  ctx.font='700 50px Sh';ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=BONE;
  ctx.fillText('اللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنِّي أَشْهَدُ أَنَّكَ أَنْتَ اللَّهُ',0,-80);ctx.fillText('لَا إِلَهَ إِلَّا أَنْتَ الأَحَدُ الصَّمَدُ',0,-6);ctx.fillText('الَّذِي لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',0,68);
  const hl=eIO(prog(t,36.4-D,.8));if(hl>0){ctx.beginPath();ctx.roundRect(-470,-150,940,300,32);ctx.lineWidth=4;ctx.strokeStyle=GOLD;ctx.setLineDash([2600]);ctx.lineDashOffset=2600*(1-hl);ctx.stroke();ctx.setLineDash([])}ctx.restore()}
 phrase([['واستفتح',36.36-D],['فيها',36.68-D],['دائمًا',36.96-D],['دعاءك',37.26-D,1]],1050,74,t,{w:400});
 phrase([['لأنها',38.08-D],['قد',38.38-D],['تكون',38.7-D],['سببًا',39.04-D],['في',39.32-D],['استجابته',39.44-D,2]],1185,68,t,{w:400});
 // bookmark sticker on the card corner
 const bm=eOB(prog(t,34.9-D,.45),2.4);if(bm>0){ctx.save();ctx.translate(CX+420,650);ctx.rotate(.12);ctx.scale(bm*.8,bm*.8);ctx.beginPath();ctx.moveTo(-50,-70);ctx.lineTo(50,-70);ctx.lineTo(50,80);ctx.lineTo(0,42);ctx.lineTo(-50,80);ctx.closePath();ctx.fillStyle=GOLD;ctx.fill();ctx.restore()}})}
function igIcon(x,y,s,c){ctx.save();ctx.strokeStyle=c;ctx.fillStyle=c;ctx.lineWidth=3*s;ctx.beginPath();ctx.roundRect(x-17*s,y-17*s,34*s,34*s,10*s);ctx.stroke();ctx.beginPath();ctx.arc(x,y,7.5*s,0,7);ctx.stroke();ctx.beginPath();ctx.arc(x+9*s,y-9*s,2.4*s,0,7);ctx.fill();ctx.restore()}
function handleTag(cx,y,al,s=1){ctx.save();ctx.globalAlpha*=al;ctx.font=`700 ${28*s}px In`;ctx.letterSpacing=`${4*s}px`;const tw=ctx.measureText(HANDLE).width;const IC=34*s,G=18*s;const tot=IC+G*2+2+tw;let x=cx-tot/2;
 igIcon(x+IC/2,y,s,BONE);x+=IC+G;ctx.fillStyle=BONE;ctx.globalAlpha*=.7;ctx.fillRect(x,y-15*s,2,30*s);ctx.globalAlpha/=.7;x+=2+G;ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(HANDLE,x,y+1);ctx.restore()}
function outro(t){if(t<34.9)return;const e=1-prog(t,DUR-.45,.4);ctx.save();ctx.globalAlpha=e;
 listPill([['احفظ',35.05,1],['الفيديو',35.2]],720,74,t,35.0);
 listPill([['وأرسله',35.5,1],['لمن',35.62],['تحب',35.74]],870,74,t,35.45);
 const k=prog(t,36.0,.5);if(k>0){const s=eOB(k,2);ctx.save();ctx.translate(CX,1080);ctx.scale(s,s);ctx.translate(-CX,-1080);handleTag(CX,1080,eO(k),1.7);ctx.restore()}ctx.restore()}
window.SFX=[[0,'room'],[0.12,'impact_s'],[1.0,'bloom'],[2.35,'whoosh'],[2.9,'key'],[4.6,'whoosh'],[4.65,'swell'],[6.1,'key'],[8.2,'key'],[10.05,'whoosh'],[10.12,'impact_s'],[10.6,'impact_s'],[11.2,'key'],[12.06,'key'],[12.66,'key'],[14.1,'whoosh'],[17.95,'impact_s'],[19.45,'bloom'],[20.3,'key'],[21.9,'key'],[22.75,'ticks'],[23.2,'whoosh'],[24.4,'ticks'],[25.7,'key'],[27.4,'impact_s'],[28.9,'air'],[29.4,'whoosh'],[29.6,'line'],[31.3,'line'],[34.96,'whoosh'],[35.0,'key'],[35.45,'key'],[36.0,'sub_soft']];
function draw(t){ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';ctx.globalAlpha=1;bg(t);S0(t);S1(t);S2(t);S3(t);S4(t);S5(t);S6(t);outro(t);
 if(t<34.9)handleTag(CX,1730,.6);ctx.drawImage(GR[Math.floor(t*24)%4],0,0,W,H);const f=prog(t,DUR-.4,.4);if(f>0){ctx.globalAlpha=f;ctx.fillStyle=BG_OUT;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}}
window.render=t=>{draw(t);return cv.toDataURL('image/png')};
window.drawCover=()=>{ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';bg(3);
 tag('حديث صحيح',470,1,0);phrase([['اسمٌ',0],['إذا',0],['دُعي',0],['اللهُ',0],['به…',0]],680,92,9,{box:'fill',boxT:0});phrase([['أجاب!',0,1]],870,170,9,{ul:false});
 softGlow(CX,1330,330,.45);star8(CX,1330,170,.3,1,.9);star8(CX,1330,240,-.2,1,.35,3);ctx.beginPath();ctx.arc(CX,1330,16,0,7);ctx.fillStyle=GOLD2;ctx.fill();
 ctx.drawImage(GR[0],0,0,W,H);return cv.toDataURL('image/png')};
