// SU7IAB reel — "5 sunan of Jumu'ah" (all Sahih al-Bukhari). Listicle + cinematic light + particles + typing.
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
const W=1080,H=1920,CX=540;
// palette approved by Suhaib (Nov 2026): Warm Ivory background, Muted Burgundy for all text & graphics
const BG='#F5E9DA',BG_IN='#FBF3E9',BG_OUT='#EBDAC6',BONE='#8E3B46',GOLD='#8E3B46',GOLD2='#7A2F3A',IVORY='#F5E9DA';
const cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),lerp=(a,b,k)=>a+(b-a)*k,prog=(t,a,d)=>cl((t-a)/d);
const eIO=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const eO=x=>{x=cl(x);return 1-Math.pow(1-x,3)},eO5=x=>{x=cl(x);return 1-Math.pow(1-x,5)},eI=x=>{x=cl(x);return x*x*x};
const eOB=(x,s=1.70158)=>{x=cl(x);return 1+(s+1)*Math.pow(x-1,3)+s*Math.pow(x-1,2)};
function rng(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
const GR=[];{for(let k=0;k<4;k++){const g=document.createElement('canvas');g.width=540;g.height=960;const gx=g.getContext('2d'),im=gx.createImageData(540,960),r=rng(77+k);for(let i=0;i<im.data.length;i+=4){const v=r()*255;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=14}gx.putImageData(im,0,0);GR.push(g)}}
function word(str,x,y,size,o={}){const a=o.a??1;if(a<=0.003)return;ctx.save();ctx.globalAlpha*=a;ctx.translate(x+(o.dx||0),y+(o.dy||0));const s=o.s??1;ctx.scale(s,s);
 if(o.blur>0.2)ctx.filter=`blur(${o.blur}px)`;if(o.glow){ctx.shadowColor='rgba(142,59,70,.22)';ctx.shadowBlur=o.glow}
 ctx.font=`${o.w||700} ${size}px ${o.f||'Am'}`;ctx.direction='rtl';ctx.textAlign=o.al||'center';ctx.textBaseline='middle';ctx.fillStyle=o.c||BONE;ctx.fillText(str,0,0);ctx.restore()}
function reveal(t,t0,d=.55){const k=prog(t,t0,d);return{a:eO(k),blur:16*(1-eO5(k)),dy:26*(1-eO(k)),s:lerp(1.1,1,eO(k))}}
function slam(t,t0){const k=prog(t,t0,.32);if(k<=0)return{a:0};return{a:cl(k*4),s:lerp(1.8,1,eO5(k)),blur:10*(1-eO(k))}}
function ring(x,y,r,lw,col,a){if(a<=0||r<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.lineWidth=lw;ctx.strokeStyle=col;ctx.stroke();ctx.restore()}
function softGlow(x,y,r,a){if(a<=0)return;a*=.4;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(142,59,70,${a})`);g.addColorStop(.5,`rgba(142,59,70,${a*.35})`);g.addColorStop(1,'rgba(142,59,70,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r)}
function stroke(lw=5,c=GOLD){ctx.lineWidth=lw;ctx.strokeStyle=c;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}
// ------------- content (verified: Sahih al-Bukhari, numbering as on sunnah.com / dorar mirrors)
const ITEMS=[
 {n:'١',title:'الغُسل',txt:'«إذا جاءَ أحدُكم الجمعةَ فليغتسلْ»',src:'صحيح البخاري ٨٧٧',ic:'drop',d:3.5},
 {n:'٢',title:'السِّواك والطِّيب',txt:'«…وأن يستنَّ، وأن يمسَّ طيبًا إن وجد»',src:'صحيح البخاري ٨٨٠',ic:'scent',d:3.7},
 {n:'٣',title:'التبكير',txt:'«من اغتسلَ يومَ الجمعةِ… ثم راحَ فكأنما قرَّبَ بَدَنةً»',src:'صحيح البخاري ٨٨١',ic:'hours',d:4.0},
 {n:'٤',title:'الإنصات للخطبة',txt:'«إذا قلتَ لصاحبك يومَ الجمعةِ: أنصِتْ، والإمامُ يخطب، فقد لغوتَ»',src:'صحيح البخاري ٩٣٤',ic:'wave',d:4.3},
 {n:'٥',title:'ساعة الإجابة',txt:'«فيه ساعةٌ لا يوافقها عبدٌ مسلمٌ وهو قائمٌ يصلي، يسألُ اللهَ شيئًا إلا أعطاه إياه»',src:'صحيح البخاري ٩٣٥',ic:'hourglass',d:4.8}];
const T0=3.0;let acc=T0;for(const it of ITEMS){it.t0=acc;acc+=it.d}const OUT=acc,DUR=OUT+3.4;window.DUR=DUR;
// ------------- SFX
window.SFX=[[0,'room'],[0.2,'impact_s'],[0.55,'impact'],[1.3,'air'],[2.75,'whoosh']];
for(const [i,it] of ITEMS.entries()){SFX.push([it.t0,'sub_soft'],[it.t0+.05,'tick']);
 const ws=it.txt.split(' ').length;for(let k=0;k<ws;k++)SFX.push([it.t0+1.0+k*.11,'key']);
 const m={drop:'plip',scent:'air',hours:'ticks',wave:'cut',hourglass:'swell'}[it.ic];SFX.push([it.t0+.35,m]);if(it.ic=='hourglass')SFX.push([it.t0+2.2,'bloom']);
 SFX.push([it.t0+it.d-.3,'whoosh'])}
SFX.push([OUT+.2,'air'],[OUT+1.0,'air'],[OUT+2.0,'sub_soft'],[OUT+2.05,'line']);
// ------------- particles + light
const P=[];{const r=rng(21);for(let i=0;i<70;i++)P.push({x:r()*W,y:r()*H,z:.3+r()*1,ph:r()*6.28,s:1+r()*3})}
function bg(t){const g=ctx.createRadialGradient(CX,760,80,CX,960,1300);g.addColorStop(0,BG_IN);g.addColorStop(.55,BG);g.addColorStop(1,BG_OUT);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 // volumetric rays from top
 ctx.save();for(let i=0;i<5;i++){const a=-.32+i*.16+Math.sin(t*.25+i)*.04;ctx.save();ctx.translate(CX+(i-2)*60,-120);ctx.rotate(a);
  const gr=ctx.createLinearGradient(0,0,0,1700);gr.addColorStop(0,`rgba(142,59,70,${.035+.01*Math.sin(t*.7+i*2)})`);gr.addColorStop(1,'rgba(142,59,70,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(-18,0);ctx.lineTo(18,0);ctx.lineTo(150,1700);ctx.lineTo(-150,1700);ctx.closePath();ctx.fill();ctx.restore()}ctx.restore();
 // dust
 for(const p of P){const y=((p.y-t*28*p.z)%H+H)%H,x=p.x+Math.sin(t*.6*p.z+p.ph)*24;const tw=.35+.35*Math.sin(t*2*p.z+p.ph);ctx.globalAlpha=tw*p.z*.45;ctx.fillStyle=GOLD2;ctx.beginPath();ctx.arc(x,y,p.s*p.z,0,7);ctx.fill()}ctx.globalAlpha=1;
 ctx.save();ctx.globalAlpha=.05;ctx.strokeStyle=GOLD;ctx.lineWidth=1.5;ctx.translate(CX,960);ctx.rotate(t*.02);for(let i=0;i<2;i++){ctx.rotate(Math.PI/4);ctx.strokeRect(-470,-470,940,940)}ctx.restore()}
// ------------- icons (centre 540,780)
const IY=780;
function icon(kind,t,t0,a){const k=t-t0;ctx.save();ctx.globalAlpha*=a;const ent=eOB(prog(t,t0+.15,.5),2);ctx.translate(CX,IY);ctx.scale(ent,ent);ctx.translate(-CX,-IY);
 softGlow(CX,IY,260,.18);
 if(kind=='drop'){const fall=eI(prog(k,.25,.45));const y=lerp(IY-230,IY+40,fall);const hit=k-.7;
  if(hit<0){ctx.beginPath();ctx.moveTo(CX,y-70);ctx.bezierCurveTo(CX+44,y-10,CX+44,y+30,CX,y+30);ctx.bezierCurveTo(CX-44,y+30,CX-44,y-10,CX,y-70);ctx.fillStyle='rgba(142,59,70,.08)';ctx.fill();stroke(5)}
  else{for(let i=0;i<3;i++){const p=prog(hit,i*.18,1.2);if(p>0&&p<1){ctx.save();ctx.globalAlpha*=(1-p);ctx.beginPath();ctx.ellipse(CX,IY+40,lerp(20,240,eO(p)),lerp(6,60,eO(p)),0,0,7);stroke(3);ctx.restore()}}
   for(let i=0;i<7;i++){const p=prog(hit,0,.6);if(p>0&&p<1){const an=-Math.PI*(.15+.7*i/6);const d=lerp(0,150,eO(p));ctx.globalAlpha=a*(1-p);ctx.beginPath();ctx.arc(CX+Math.cos(an)*d,IY+40+Math.sin(an)*d+200*p*p,6,0,7);ctx.fillStyle=GOLD;ctx.fill()}}
   const d2=eOB(prog(hit,.6,.5));if(d2>0){ctx.globalAlpha=a;ctx.beginPath();const yy=IY-20;ctx.moveTo(CX,yy-90*d2);ctx.bezierCurveTo(CX+56*d2,yy-12*d2,CX+56*d2,yy+40*d2,CX,yy+40*d2);ctx.bezierCurveTo(CX-56*d2,yy+40*d2,CX-56*d2,yy-12*d2,CX,yy-90*d2);softGlow(CX,yy,160,.25*d2);stroke(5,GOLD2)}}}
 if(kind=='scent'){ // bottle + rising vapour
  ctx.beginPath();ctx.roundRect(CX-80,IY-10,160,170,30);ctx.fillStyle='rgba(142,59,70,.06)';ctx.fill();stroke(5);ctx.beginPath();ctx.roundRect(CX-30,IY-60,60,50,10);stroke(5);ctx.beginPath();ctx.moveTo(CX-50,IY-60);ctx.lineTo(CX+50,IY-60);stroke(5);
  for(let i=0;i<3;i++){const p=eO(prog(k,.4+i*.18,1.2));if(p<=0)continue;ctx.save();ctx.beginPath();const x0=CX+(i-1)*45;for(let s=0;s<=40;s++){const u=s/40*p;const yy=IY-80-u*260,xx=x0+Math.sin(u*9+t*3+i)*22*u;s?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy)}ctx.globalAlpha*=.85-.25*i;stroke(4,GOLD2);ctx.restore()}}
 if(kind=='hours'){ // five hour marks on an arc; the first lights up, sun rises
  const sun=eIO(prog(k,.3,1.2));softGlow(CX,IY+120-sun*120,220,.35*sun);ctx.beginPath();ctx.arc(CX,IY+120-sun*120,70,Math.PI,0);stroke(4,GOLD2);
  ctx.beginPath();ctx.moveTo(CX-300,IY+120);ctx.lineTo(CX+300,IY+120);stroke(3,'rgba(142,59,70,.6)');
  for(let i=0;i<5;i++){const an=Math.PI+Math.PI*(i+.5)/5;const x=CX+Math.cos(an)*-250,y=IY+120+Math.sin(an)*250;const p=eOB(prog(k,.2+i*.09,.35),2.4);
   const first=i==0;const lit=first?eO(prog(k,1.1,.4)):0;if(first&&lit>0){softGlow(x,y,90,.6*lit);ring(x,y,lerp(18,60,prog(k,1.15,.8)),2,GOLD,1-prog(k,1.15,.8))}
   ctx.beginPath();ctx.arc(x,y,lerp(10,lerp(14,22,lit),p),0,7);ctx.fillStyle=first?(lit>0?GOLD2:BONE):'rgba(142,59,70,.45)';ctx.globalAlpha=a*p;ctx.fill();ctx.globalAlpha=a}}
 if(kind=='wave'){const fl=eIO(prog(k,1.1,.6));for(let i=0;i<21;i++){const x=CX-300+i*30;const h=(30+90*Math.abs(Math.sin(i*1.7+t*9))*Math.sin(Math.PI*(i+.5)/21))*(1-fl)*eO(prog(k,.2+i*.015,.3))+3;
   ctx.beginPath();ctx.moveTo(x,IY-h);ctx.lineTo(x,IY+h);stroke(10,fl>.5?GOLD2:BONE)}
  if(fl>0){softGlow(CX,IY,200,.25*fl);ring(CX,IY,lerp(40,330,prog(k,1.6,1)),2,GOLD,.6*(1-prog(k,1.6,1)))}}
 if(kind=='hourglass'){const s=1;ctx.beginPath();ctx.moveTo(CX-110,IY-170);ctx.lineTo(CX+110,IY-170);ctx.lineTo(CX+14,IY);ctx.lineTo(CX+110,IY+170);ctx.lineTo(CX-110,IY+170);ctx.lineTo(CX-14,IY);ctx.closePath();ctx.fillStyle='rgba(142,59,70,.05)';ctx.fill();stroke(5);
  ctx.beginPath();ctx.moveTo(CX-130,IY-170);ctx.lineTo(CX+130,IY-170);ctx.moveTo(CX-130,IY+170);ctx.lineTo(CX+130,IY+170);stroke(7);
  const fl=prog(k,.3,3);const top=1-fl,bot=fl; // sand
  ctx.fillStyle='rgba(142,59,70,.55)';ctx.beginPath();const ht=120*top;ctx.moveTo(CX-ht*.75,IY-20-ht);ctx.lineTo(CX+ht*.75,IY-20-ht);ctx.lineTo(CX,IY-14);ctx.closePath();if(ht>2)ctx.fill();
  const hb=110*Math.sqrt(bot);ctx.beginPath();ctx.moveTo(CX-hb*.9,IY+160);ctx.lineTo(CX+hb*.9,IY+160);ctx.lineTo(CX,IY+160-hb*.8);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(CX,IY);ctx.lineTo(CX,IY+160-hb*.8);ctx.setLineDash([4,10]);ctx.lineDashOffset=-t*80;stroke(3,GOLD2);ctx.setLineDash([]);
  // one grain rises as light: the hour of answer
  const g=prog(k,2.2,1.4);if(g>0&&g<1){const y=lerp(IY,IY-520,eIO(g));softGlow(CX,y,120,.8*(1-g*.6));ctx.beginPath();ctx.arc(CX,y,9,0,7);ctx.fillStyle=GOLD2;ctx.fill();
   ctx.save();ctx.globalAlpha*=.6*(1-g);ctx.beginPath();ctx.moveTo(CX,IY);ctx.lineTo(CX,y);stroke(3,GOLD2);ctx.restore()}
  if(g>=1){softGlow(CX,IY-520,160,.35);}}
 ctx.restore()}
// ------------- text wrap with word reveal (typing)
function wrap(txt,size,maxW0){ctx.font=`500 ${size}px Am`;const tw=ctx.measureText(txt).width;const nL=Math.ceil(tw/maxW0);const maxW=Math.min(maxW0,tw/nL*1.12);const ws=txt.split(' '),L=[[]];let w=0;const sp=ctx.measureText(' ').width;for(const x of ws){const ww=ctx.measureText(x).width;if(w+ww>maxW&&L[L.length-1].length){L.push([]);w=0}L[L.length-1].push([x,ww]);w+=ww+sp}return{L,sp}}
function typed(txt,y,size,t,t0,a){const {L,sp}=wrap(txt,size,860);let n=0;ctx.save();ctx.font=`500 ${size}px Am`;ctx.direction='rtl';ctx.textAlign='right';ctx.textBaseline='middle';
 L.forEach((ln,li)=>{const tot=ln.reduce((s,q)=>s+q[1],0)+sp*(ln.length-1);let x=CX+tot/2;const yy=y+li*size*1.45;for(const [wd,ww] of ln){const p=prog(t,t0+n*.11,.25);if(p>0){ctx.globalAlpha=a*eO(p);ctx.fillStyle=BONE;ctx.fillText(wd,x,yy+10*(1-eO(p)))}x-=ww+sp;n++}});
 // caret
 ctx.restore();return L.length}
function pill(s,y,a){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.font='500 34px Px';const w=ctx.measureText(s).width+56;ctx.beginPath();ctx.roundRect(CX-w/2,y-30,w,60,30);ctx.fillStyle='rgba(142,59,70,.12)';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='rgba(142,59,70,.6)';ctx.stroke();
 ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=GOLD;ctx.fillText(s,CX,y+2);ctx.restore()}
function progressBar(t){if(t<T0-.3||t>OUT+.3)return;const a=eO(prog(t,T0-.3,.4))*(1-prog(t,OUT,.3));ctx.save();ctx.globalAlpha=a;const n=5,gap=14,w=(800-gap*4)/5;
 ITEMS.forEach((it,i)=>{const x=940-(i+1)*w-i*gap;/*RTL: first segment on the right*/ctx.fillStyle='rgba(142,59,70,.18)';ctx.beginPath();ctx.roundRect(x,170,w,8,4);ctx.fill();const p=prog(t,it.t0,it.d);if(p>0){ctx.fillStyle=GOLD;ctx.beginPath();ctx.roundRect(x+w*(1-p),170,w*p,8,4);ctx.fill()}});ctx.restore()}
function item(it,t){if(t<it.t0-.05||t>it.t0+it.d+.05)return;const k=t-it.t0;const out=prog(t,it.t0+it.d-.32,.32);const a=1-eI(out);const dx=eI(out)*220; // exits to the right (RTL flow)
 const inn=eO5(prog(t,it.t0,.45));ctx.save();ctx.translate(dx-(1-inn)*160,0);
 // numeral badge
 const nb=eOB(prog(t,it.t0+.05,.45),2.2);ctx.save();ctx.globalAlpha=a;ctx.translate(CX,370);ctx.scale(nb,nb);ctx.beginPath();ctx.arc(0,0,74,0,7);ctx.fillStyle=BONE;ctx.fill();ctx.beginPath();ctx.arc(0,0,74,-Math.PI/2,-Math.PI/2+Math.PI*2*eIO(prog(t,it.t0+.1,.6)));ctx.lineWidth=3;ctx.strokeStyle=GOLD;ctx.stroke();ctx.restore();
 word(it.n,CX,368,92,{...slam(t,it.t0+.12),a:slam(t,it.t0+.12).a*a,c:IVORY});
 icon(it.ic,t,it.t0,a);
 const r=reveal(t,it.t0+.55,.5);word(it.title,CX,1080,104,{...r,a:r.a*a,c:GOLD,glow:22});
 const nl=typed(it.txt,1240,58,t,it.t0+1.0,a);
 pill(it.src,1240+nl*58*1.45+44,a*eO(prog(t,it.t0+1.3,.4)));ctx.restore()}
function hook(t){if(t>T0+.1)return;const e=eI(prog(t,2.75,.3));const o={a:1-e,blur:e*20,s:1+e*.15};
 const s1=slam(t,.2);word('٥ سُنن',CX,700,190,{...s1,...(e>0?o:{}),c:GOLD,glow:30});
 const s2=slam(t,.55);word('ليوم الجمعة',CX,900,130,{...s2,...(e>0?o:{})});
 const r=reveal(t,1.3,.5);word('كم واحدة منها بتعملها؟',CX,1120,64,{...r,a:r.a*(1-e),w:500});
 const r2=reveal(t,1.7,.5);if(r2.a>0)pill('من صحيح البخاري',1260+r2.dy,r2.a*(1-e));
 // five dots preview
 for(let i=0;i<5;i++){const p=eOB(prog(t,1.0+i*.08,.35),2.4);ring(CX+(2-i)*70,1420,14*p,3,GOLD,(1-e)*p);}}
function outro(t){if(t<OUT)return;const k=t-OUT;const e=eI(prog(t,DUR-.45,.45));
 const r=reveal(t,OUT+.15,.5);word('كم واحدة كنت بتعملها؟',CX,700,80,{...r,a:r.a*(1-e)});
 const r2=reveal(t,OUT+.55,.5);word('اكتب الرقم في التعليقات',CX,830,58,{...r2,a:r2.a*(1-e),w:500,c:GOLD});
 const r3=reveal(t,OUT+1.0,.5);if(r3.a>0)pill('احفظ الفيديو للجمعة الجاية',980+r3.dy,r3.a*(1-e));
 // signature
 const kk=prog(t,OUT+1.9,.6);if(kk>0){ctx.save();ctx.globalAlpha=eO(kk)*(1-e);const y=1300;ctx.font='700 54px In';ctx.textBaseline='middle';
  ctx.fillStyle=BONE;ctx.textAlign='right';ctx.fillText('20',CX-150,y-34);ctx.fillStyle=GOLD;ctx.fillText('26',CX-150,y+34);ctx.fillStyle=BONE;ctx.fillRect(CX-134,y-66,3,132*eIO(prog(t,OUT+2.0,.5)));
  ctx.textAlign='left';ctx.letterSpacing='6px';ctx.fillStyle=GOLD;ctx.fillText('CRAFTED BY',CX-112+30*(1-eO(kk)),y-34);ctx.fillStyle=BONE;ctx.fillText('@SU7AIB.7',CX-112+50*(1-eO(prog(t,OUT+1.95,.6))),y+34);ctx.restore()}}
function flash(t){for(const it of ITEMS){const p=prog(t,it.t0,.35);if(p>0&&p<1){ctx.save();ctx.globalAlpha=(1-p)*.12;ctx.fillStyle='#FFFFFF';ctx.fillRect(0,0,W,H);ctx.restore()}}}
function draw(t){ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';ctx.globalAlpha=1;bg(t);progressBar(t);ctx.save();ctx.translate(0,110);hook(t);for(const it of ITEMS)item(it,t);outro(t);ctx.restore();flash(t);
 ctx.globalAlpha=.45;ctx.font='700 26px In';ctx.textAlign='center';ctx.fillStyle=BONE;ctx.letterSpacing='4px';if(t<OUT)ctx.fillText('@SU7AIB.7',CX,1800);ctx.letterSpacing='0px';ctx.globalAlpha=1;
 ctx.drawImage(GR[Math.floor(t*24)%4],0,0,W,H);const f=prog(t,DUR-.4,.4);if(f>0){ctx.globalAlpha=f;ctx.fillStyle=BG_OUT;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}}
window.render=t=>{draw(t);return cv.toDataURL('image/png')};
window.drawCover=()=>{ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';bg(2);
 word('٥ سُنن',CX,640,200,{c:GOLD,glow:30});word('ليوم الجمعة',CX,850,130);word('كم واحدة منها بتعملها؟',CX,1040,62,{w:500});
 for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(CX+(2-i)*80,1230,16,0,7);ctx.fillStyle=i==0?GOLD2:'rgba(142,59,70,.4)';ctx.fill()}softGlow(CX+160,1230,90,.6);
 pill('من صحيح البخاري',1400,1);ctx.drawImage(GR[0],0,0,W,H);return cv.toDataURL('image/png')};
