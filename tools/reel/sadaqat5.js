// SU7IAB reel — "5 sadaqat without money" (Bukhari 2989). Listicle + cinematic light + particles + typing.
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
const W=1080,H=1920,CX=540;
{const A=CanvasRenderingContext2D.prototype.arc,E=CanvasRenderingContext2D.prototype.ellipse;ctx.arc=function(x,y,r,...q){return A.call(this,x,y,Math.max(0,r),...q)};ctx.ellipse=function(x,y,a,b,...q){return E.call(this,x,y,Math.max(0,a),Math.max(0,b),...q)}}
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
// ------------- content (verified Nov 22 2026: dorar.net sharh 15016 [صحيح البخاري 2989، أبو هريرة، صحيح] + sunnah.com bukhari:2989)
const INTRO={txt:'«كلُّ سُلامى من الناسِ عليه صدقةٌ، كلَّ يومٍ تطلعُ فيه الشمسُ»',src:'عن أبي هريرة · صحيح البخاري ٢٩٨٩'};
const ITEMS=[
 {n:'١',title:'تعدل بين اثنين',txt:'«يَعدِلُ بين الاثنينِ صدقةٌ»',ic:'scale',d:3.4},
 {n:'٢',title:'تعين أخاك',txt:'«ويُعينُ الرجلَ على دابَّتِه، فيَحمِلُ عليها أو يَرفَعُ عليها متاعَه صدقةٌ»',ic:'lift',d:4.5},
 {n:'٣',title:'الكلمة الطيبة',txt:'«والكلمةُ الطيبةُ صدقةٌ»',ic:'speech',d:3.4},
 {n:'٤',title:'خطوة إلى الصلاة',txt:'«وكلُّ خطوةٍ يَخطوها إلى الصلاةِ صدقةٌ»',ic:'steps',d:3.8},
 {n:'٥',title:'إماطة الأذى',txt:'«ويُميطُ الأذى عن الطريقِ صدقةٌ»',ic:'road',d:3.6}];
const TI=2.7,DI=3.4,T0=TI+DI;let acc=T0;for(const it of ITEMS){it.t0=acc;acc+=it.d}const OUT=acc,DUR=OUT+3.2;window.DUR=DUR;
const KW=.085;
// ------------- SFX
window.SFX=[[0,'room'],[0.15,'impact_s'],[0.6,'impact'],[1.25,'air'],[1.75,'tick'],[2.45,'whoosh'],
 [TI,'sub_soft'],[TI+.1,'swell'],[TI+.4,'line']];
{const ws=INTRO.txt.split(' ').length;for(let k=0;k<ws;k++)SFX.push([TI+1.0+k*KW,'key'])}
SFX.push([T0-.3,'whoosh']);
for(const it of ITEMS){SFX.push([it.t0,'sub_soft'],[it.t0+.05,'tick']);
 const ws=it.txt.split(' ').length;for(let k=0;k<ws;k++)SFX.push([it.t0+.95+k*KW,'key']);
 if(it.ic=='scale')SFX.push([it.t0+.3,'stretch'],[it.t0+1.15,'impact_s'],[it.t0+1.2,'bloom']);
 if(it.ic=='lift')SFX.push([it.t0+.35,'riser_s'],[it.t0+1.05,'impact_s'],[it.t0+1.1,'bloom']);
 if(it.ic=='speech')SFX.push([it.t0+.3,'line'],[it.t0+.65,'plip'],[it.t0+.8,'plip'],[it.t0+.95,'plip'],[it.t0+1.15,'bloom']);
 if(it.ic=='steps')for(let j=0;j<6;j++)SFX.push([it.t0+.3+j*.17,'tick']);
 if(it.ic=='steps')SFX.push([it.t0+1.4,'bloom']);
 if(it.ic=='road')SFX.push([it.t0+.35,'impact_s'],[it.t0+.9,'whoosh'],[it.t0+1.3,'bloom']);
 if(it!==ITEMS[ITEMS.length-1])SFX.push([it.t0+it.d-.3,'whoosh'])}
SFX.push([OUT-.3,'whoosh'],[OUT+.2,'air'],[OUT+1.0,'air'],[OUT+1.9,'sub_soft'],[OUT+1.95,'line']);
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
function sun(t,t0,a,cy){ // sun rising over a horizon: "every day the sun rises"
 const k=t-t0;const rise=eO(prog(k,.1,1.1));ctx.save();ctx.globalAlpha*=a;
 const hx=lerp(0,330,eIO(prog(k,0,.6)));ctx.beginPath();ctx.moveTo(CX-hx,cy+60);ctx.lineTo(CX+hx,cy+60);stroke(5);
 ctx.save();ctx.beginPath();ctx.rect(0,cy-400,W,460);ctx.clip();
 const sy=cy+60+lerp(150,-10,rise);softGlow(CX,sy,300,.35*rise);
 for(let i=0;i<12;i++){const an=-Math.PI+i*Math.PI/11;const r0=140,r1=lerp(150,215+12*Math.sin(t*3+i),eO(prog(k,.8,.6)));ctx.beginPath();ctx.moveTo(CX+Math.cos(an)*r0,sy+Math.sin(an)*r0);ctx.lineTo(CX+Math.cos(an)*r1,sy+Math.sin(an)*r1);stroke(5,GOLD2)}
 ctx.beginPath();ctx.arc(CX,sy,115,0,7);ctx.fillStyle='rgba(142,59,70,.1)';ctx.fill();stroke(6);ctx.restore();
 for(let w=0;w<2;w++){ctx.beginPath();ctx.moveTo(CX-lerp(0,240-w*80,eIO(prog(k,.2+w*.1,.6))),cy+95+w*30);ctx.lineTo(CX+lerp(0,240-w*80,eIO(prog(k,.2+w*.1,.6))),cy+95+w*30);stroke(3,'rgba(142,59,70,.45)')}
 ctx.restore()}
function icon(kind,t,t0,a){const k=t-t0;ctx.save();ctx.globalAlpha*=a;const ent=eOB(prog(t,t0+.15,.5),2);ctx.translate(CX,IY);ctx.scale(ent,ent);ctx.translate(-CX,-IY);
 softGlow(CX,IY,260,.18);
 if(kind=='scale'){ // a crooked balance wobbles, then settles perfectly level: justice
  const st=prog(k,.3,.85);const tilt=.3*Math.exp(-4*st)*Math.cos(st*14)*(st>0?1:1);const by=IY-110;
  ctx.beginPath();ctx.moveTo(CX,by-40);ctx.lineTo(CX,IY+170);stroke(6);ctx.beginPath();ctx.moveTo(CX-90,IY+170);ctx.lineTo(CX+90,IY+170);stroke(7);
  ctx.beginPath();ctx.moveTo(CX,by-70);ctx.lineTo(CX-16,by-40);ctx.lineTo(CX+16,by-40);ctx.closePath();ctx.fillStyle=GOLD;ctx.fill();
  ctx.save();ctx.translate(CX,by);ctx.rotate(tilt);ctx.beginPath();ctx.moveTo(-250,0);ctx.lineTo(250,0);stroke(6);ctx.restore();
  for(const sd of[-1,1]){const px=CX+sd*250*Math.cos(tilt),py=by+sd*250*Math.sin(tilt);
   ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px-70,py+130);ctx.moveTo(px,py);ctx.lineTo(px+70,py+130);stroke(2.5,'rgba(142,59,70,.7)');
   ctx.beginPath();ctx.moveTo(px-95,py+130);ctx.quadraticCurveTo(px,py+190,px+95,py+130);ctx.closePath();ctx.fillStyle='rgba(142,59,70,.08)';ctx.fill();stroke(5);
   ctx.beginPath();ctx.roundRect(px-30,py+86,60,44,10);ctx.fillStyle=GOLD2;ctx.fill()}
  const g=prog(k,1.15,1);if(g>0){ // level line + glow when balanced
   ctx.save();ctx.globalAlpha*=eO(g)*(1-prog(k,2.4,.5));ctx.setLineDash([6,12]);ctx.beginPath();ctx.moveTo(CX-330,by);ctx.lineTo(CX+330,by);stroke(2.5,GOLD);ctx.setLineDash([]);ctx.restore();
   softGlow(CX,by,200,.5*(1-g*.5));ring(CX,by,lerp(20,260,eO(g)),2,GOLD,.6*(1-g))}}
 if(kind=='lift'){ // a heavy box is lifted up onto the shelf: helping with a load
  const sh=IY-90;const p=eOB(prog(k,.45,.6),1.3);const by=lerp(IY+130,sh-55,p);
  ctx.beginPath();ctx.moveTo(CX-60,sh);ctx.lineTo(CX+260,sh);stroke(7);ctx.beginPath();ctx.moveTo(CX+230,sh);ctx.lineTo(CX+230,IY+190);ctx.moveTo(CX-30,sh);ctx.lineTo(CX-30,IY+190);stroke(4,'rgba(142,59,70,.5)');
  ctx.beginPath();ctx.moveTo(CX-330,IY+190);ctx.lineTo(CX+330,IY+190);stroke(5);
  const bx=lerp(CX-170,CX+100,eIO(prog(k,.45,.6)));
  // arrow trail
  const ar=prog(k,.2,.4)*(1-prog(k,1.2,.4));if(ar>0){ctx.save();ctx.globalAlpha*=ar;ctx.setLineDash([4,14]);ctx.beginPath();ctx.moveTo(CX-170,IY+90);ctx.quadraticCurveTo(CX-150,sh-170,CX+90,sh-120);stroke(4,GOLD);ctx.setLineDash([]);
   ctx.beginPath();ctx.moveTo(CX+90,sh-120);ctx.lineTo(CX+58,sh-140);ctx.moveTo(CX+90,sh-120);ctx.lineTo(CX+62,sh-96);stroke(4,GOLD);ctx.restore()}
  const sq=1-.08*Math.sin(Math.PI*prog(k,1.0,.25));ctx.save();ctx.translate(bx,by+55);ctx.scale(1/sq,sq);
  ctx.beginPath();ctx.roundRect(-75,-110,150,110,12);ctx.fillStyle='rgba(142,59,70,.12)';ctx.fill();stroke(6);
  ctx.beginPath();ctx.moveTo(-75,-70);ctx.lineTo(75,-70);ctx.moveTo(0,-110);ctx.lineTo(0,-70);stroke(4);ctx.restore();
  const g=prog(k,1.05,1);if(g>0){softGlow(bx,sh-50,180,.5*(1-g*.5));ring(bx,sh-50,lerp(30,220,eO(g)),2,GOLD,.6*(1-g))}}
 if(kind=='speech'){ // a speech bubble draws itself, typing dots become a heart, kindness ripples outward
  const dr=eIO(prog(k,.2,.5));ctx.save();ctx.beginPath();ctx.roundRect(CX-230,IY-150,460,260,60);ctx.moveTo(CX-60,IY+110);ctx.lineTo(CX-120,IY+190);ctx.lineTo(CX+10,IY+110);
  ctx.setLineDash([2400*dr,2400]);ctx.fillStyle=`rgba(142,59,70,${.08*dr})`;ctx.fill();stroke(6);ctx.setLineDash([]);ctx.restore();
  const hj=eOB(prog(k,1.1,.45),2.2);
  for(let i=0;i<3;i++){const p=eOB(prog(k,.6+i*.15,.3),2.4);const bob=Math.sin(t*9+i*1.2)*6;const x=CX+(i-1)*80;ctx.beginPath();ctx.arc(lerp(x,CX,eI(prog(k,1.0,.15))),IY-20+bob*(1-hj),20*p*(1-hj),0,7);ctx.fillStyle=GOLD2;ctx.fill()}
  if(hj>0){const br=1+.03*Math.sin(t*3);ctx.save();ctx.translate(CX,IY-20);ctx.scale(hj*br*1.2,hj*br*1.2);ctx.beginPath();ctx.moveTo(0,40);ctx.bezierCurveTo(-90,-20,-50,-90,0,-45);ctx.bezierCurveTo(50,-90,90,-20,0,40);ctx.fillStyle=GOLD2;ctx.fill();ctx.restore();
   for(let r=0;r<3;r++){const q=prog(k,1.2+r*.3,1.1);ring(CX,IY-20,lerp(60,340,eO(q)),2.5,GOLD,.55*(1-q))}}}
 if(kind=='steps'){ // footsteps along a path toward a mosque arch, each step adds a dot of reward
  const path=s=>{const x=lerp(CX+330,CX-30,s),y=lerp(IY+190,IY+55,s)+Math.sin(s*Math.PI)*-30;return[x,y]};
  // mosque arch outline
  const ap=eIO(prog(k,.1,.6));ctx.save();ctx.globalAlpha*=ap;const mx=CX-170,my=IY-30;
  ctx.beginPath();ctx.moveTo(mx-110,my+80);ctx.lineTo(mx-110,my-60);ctx.quadraticCurveTo(mx-110,my-170,mx,my-210);ctx.quadraticCurveTo(mx+110,my-170,mx+110,my-60);ctx.lineTo(mx+110,my+80);ctx.fillStyle='rgba(142,59,70,.07)';ctx.fill();stroke(6);
  ctx.beginPath();ctx.moveTo(mx-50,my+80);ctx.lineTo(mx-50,my-30);ctx.quadraticCurveTo(mx,my-110,mx+50,my-30);ctx.lineTo(mx+50,my+80);stroke(4);
  ctx.beginPath();ctx.moveTo(mx,my-210);ctx.lineTo(mx,my-250);stroke(4);ctx.beginPath();ctx.arc(mx,my-262,10,0,7);ctx.fillStyle=GOLD;ctx.fill();ctx.restore();
  const lit=prog(k,1.4,.6);if(lit>0){softGlow(mx,my-40,220,.45*lit);ring(mx,my-40,lerp(60,280,eO(lit)),2,GOLD,.6*(1-lit))}
  for(let j=0;j<6;j++){const p=prog(k,.3+j*.17,.25);if(p<=0)continue;const s=.06+j*.15;const [x,y]=path(s);const [x2,y2]=path(s+.02);const an=Math.atan2(y2-y,x2-x);const side=j%2?1:-1;
   ctx.save();ctx.translate(x-Math.sin(an)*side*18,y+Math.cos(an)*side*18);ctx.rotate(an+Math.PI/2);const sc=eOB(p,2.4);ctx.scale(sc,sc);
   ctx.beginPath();ctx.ellipse(0,0,11,19,0,0,7);ctx.fillStyle=GOLD2;ctx.fill();ctx.beginPath();ctx.ellipse(0,-28,8,8,0,0,7);ctx.fill();ctx.restore();
   const fl=prog(k,.35+j*.17,.9);if(fl>0&&fl<1){ctx.save();ctx.globalAlpha*=(1-fl);ctx.translate(x,y-50-eO(fl)*90);ctx.beginPath();ctx.moveTo(-10,0);ctx.lineTo(10,0);ctx.moveTo(0,-10);ctx.lineTo(0,10);stroke(4,GOLD);ctx.restore()}}}
 if(kind=='road'){ // a jagged stone blocks the road, jitters, then is pushed aside and the road runs clear
  const vy=IY-170;const top=40,bot=330;
  ctx.beginPath();ctx.moveTo(CX-bot,IY+200);ctx.lineTo(CX-top,vy);ctx.moveTo(CX+bot,IY+200);ctx.lineTo(CX+top,vy);stroke(6);
  ctx.save();ctx.beginPath();ctx.moveTo(CX-bot,IY+200);ctx.lineTo(CX-top,vy);ctx.lineTo(CX+top,vy);ctx.lineTo(CX+bot,IY+200);ctx.closePath();ctx.clip();
  const flow=prog(k,1.2,.5);for(let i=0;i<7;i++){const s=((i/7+t*.45*flow)%1);const y=lerp(vy,IY+200,s*s);const h=lerp(6,46,s*s);ctx.fillStyle=`rgba(142,59,70,${.25+.6*s})`;ctx.fillRect(CX-lerp(2,9,s*s),y,lerp(4,18,s*s),h)}
  ctx.restore();
  const push=eI(prog(k,.9,.45));const jit=k<.9?(Math.sin(t*70)*5*prog(k,.3,.2)):0;const sx=CX+jit+push*420,sy=IY+80-push*30;ctx.save();ctx.globalAlpha*=1-prog(k,1.2,.2);ctx.translate(sx,sy);ctx.rotate(push*1.2);
  const r=rng(4);ctx.beginPath();for(let i=0;i<9;i++){const an=i*Math.PI*2/9;const rr=70+r()*35;i?ctx.lineTo(Math.cos(an)*rr*1.3,Math.sin(an)*rr*.8):ctx.moveTo(Math.cos(an)*rr*1.3,Math.sin(an)*rr*.8)}ctx.closePath();ctx.fillStyle='rgba(142,59,70,.18)';ctx.fill();stroke(6,GOLD2);ctx.restore();
  // motion lines while pushed
  const ml=prog(k,.95,.4);if(ml>0&&ml<1){ctx.save();ctx.globalAlpha*=1-ml;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(sx-140-i*10,sy-40+i*40);ctx.lineTo(sx-240-i*30,sy-40+i*40);stroke(4,GOLD)}ctx.restore()}
  const g=prog(k,1.3,1);if(g>0){softGlow(CX,IY+60,240,.45*(1-g*.5));ring(CX,IY+60,lerp(40,300,eO(g)),2,GOLD,.6*(1-g))}}
 ctx.restore()}
// ------------- text wrap with word reveal (typing)
function wrap(txt,size,maxW0){ctx.font=`500 ${size}px Am`;const tw=ctx.measureText(txt).width;const nL=Math.ceil(tw/maxW0);const maxW=Math.min(maxW0,tw/nL*1.12);const ws=txt.split(' '),L=[[]];let w=0;const sp=ctx.measureText(' ').width;for(const x of ws){const ww=ctx.measureText(x).width;if(w+ww>maxW&&L[L.length-1].length){L.push([]);w=0}L[L.length-1].push([x,ww]);w+=ww+sp}if(L.length>1&&L[L.length-1].length<2&&L[L.length-2].length>3)L[L.length-1].unshift(L[L.length-2].pop());return{L,sp}}
function typed(txt,y,size,t,t0,a){const {L,sp}=wrap(txt,size,860);let n=0;ctx.save();ctx.font=`500 ${size}px Am`;ctx.direction='rtl';ctx.textAlign='right';ctx.textBaseline='middle';
 L.forEach((ln,li)=>{const tot=ln.reduce((s,q)=>s+q[1],0)+sp*(ln.length-1);let x=CX+tot/2;const yy=y+li*size*1.45;for(const [wd,ww] of ln){const p=prog(t,t0+n*KW,.25);if(p>0){ctx.globalAlpha=a*eO(p);ctx.fillStyle=BONE;ctx.fillText(wd,x,yy+10*(1-eO(p)))}x-=ww+sp;n++}});
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
 const nl=typed(it.txt,1230,56,t,it.t0+.95,a);
 pill('صحيح البخاري ٢٩٨٩',1230+(nl-1)*56*1.45+80,a*eO(prog(t,it.t0+1.3,.4)));ctx.restore()}
function hook(t){if(t>TI+.1)return;const e=eI(prog(t,2.4,.3));const o={a:1-e,blur:e*20,s:1+e*.15};
 const s1=slam(t,.15);word('ما عندك قروش؟',CX,640,150,{...s1,...(e>0?o:{}),c:GOLD,glow:30});
 // coin crossed out, jitters
 const cp=eOB(prog(t,.35,.4),2);if(cp>0){const j=Math.sin(t*60)*3*(1-prog(t,.6,.6));ctx.save();ctx.globalAlpha*=(1-e);ctx.translate(CX+j,440);ctx.scale(cp,cp);ctx.beginPath();ctx.arc(0,0,62,0,7);ctx.fillStyle='rgba(142,59,70,.1)';ctx.fill();stroke(6);ctx.beginPath();ctx.arc(0,0,42,0,7);stroke(3,'rgba(142,59,70,.6)');
  const xl=eO(prog(t,.6,.25));ctx.beginPath();ctx.moveTo(-80,-80);ctx.lineTo(-80+160*xl,-80+160*xl);stroke(8,GOLD2);ctx.restore()}
 const s2=slam(t,.6);word('عندك ٥ صدقات كل يوم',CX,850,100,{...s2,...(e>0?o:{})});
 const r=reveal(t,1.25,.5);word('وما بتكلّفك ولا قرش',CX,1010,64,{...r,a:r.a*(1-e),w:500});
 const r2=reveal(t,1.75,.5);if(r2.a>0)pill('حديث واحد في صحيح البخاري',1150+r2.dy,r2.a*(1-e));
 for(let i=0;i<5;i++){const p=eOB(prog(t,1.0+i*.08,.35),2.4);ring(CX+(2-i)*70,1320,14*p,3,GOLD,(1-e)*p);}}
function intro(t){if(t<TI-.05||t>T0+.05)return;const k=t-TI;const out=prog(t,T0-.32,.32);const a=1-eI(out);ctx.save();ctx.translate(eI(out)*220,0);
 sun(t,TI,a,640);
 const lp=eIO(prog(k,.35,.5));ctx.save();ctx.globalAlpha*=a;ctx.beginPath();ctx.moveTo(CX-200*lp,1000);ctx.lineTo(CX+200*lp,1000);stroke(2,GOLD);ctx.restore();
 const r=reveal(t,TI+.5,.5);if(r.a>0){ctx.save();ctx.globalAlpha*=r.a*a;ctx.translate(0,r.dy);ctx.direction='rtl';ctx.textBaseline='middle';ctx.fillStyle=BONE;
  ctx.font='400 58px Am';const s1='قال رسول الله ';const w1=ctx.measureText(s1).width;ctx.font='64px Saw';const w2=ctx.measureText('ﷺ').width;ctx.font='400 58px Am';const w3=ctx.measureText(' :').width;const tot=w1+w2+w3;
  ctx.textAlign='right';ctx.fillText(s1,CX+tot/2,940);ctx.font='64px Saw';ctx.fillStyle=GOLD;ctx.fillText('ﷺ',CX+tot/2-w1,946);ctx.font='400 58px Am';ctx.fillStyle=BONE;ctx.fillText(' :',CX+tot/2-w1-w2,940);ctx.restore()}
 const nl=typed(INTRO.txt,1100,60,t,TI+1.0,a);
 pill(INTRO.src,1100+(nl-1)*60*1.45+90,a*eO(prog(t,TI+1.6,.4)));
 const r3=reveal(t,TI+2.0,.5);word('السُّلامى: مفاصل الجسم',CX,1100+(nl-1)*60*1.45+190,40,{...r3,a:r3.a*a*.8,w:500,f:'Px'});
 ctx.restore()}
function outro(t){if(t<OUT)return;const e=eI(prog(t,DUR-.45,.45));
 const r=reveal(t,OUT+.15,.5);word('كم صدقة منها عملتها اليوم؟',CX,700,74,{...r,a:r.a*(1-e)});
 const r2=reveal(t,OUT+.55,.5);word('اكتب الرقم في التعليقات',CX,830,58,{...r2,a:r2.a*(1-e),w:500,c:GOLD});
 const r3=reveal(t,OUT+1.0,.5);if(r3.a>0)pill('احفظ الفيديو وشاركه مع زول تحبّو',980+r3.dy,r3.a*(1-e));
 const kk=prog(t,OUT+1.8,.6);if(kk>0){ctx.save();ctx.globalAlpha=eO(kk)*(1-e);const y=1300;ctx.font='700 54px In';ctx.textBaseline='middle';
  ctx.fillStyle=BONE;ctx.textAlign='right';ctx.fillText('20',CX-150,y-34);ctx.fillStyle=GOLD;ctx.fillText('26',CX-150,y+34);ctx.fillStyle=BONE;ctx.fillRect(CX-134,y-66,3,132*eIO(prog(t,OUT+1.9,.5)));
  ctx.textAlign='left';ctx.letterSpacing='6px';ctx.fillStyle=GOLD;ctx.fillText('CRAFTED BY',CX-112+30*(1-eO(kk)),y-34);ctx.fillStyle=BONE;ctx.fillText('@SU7AIB.7',CX-112+50*(1-eO(prog(t,OUT+1.85,.6))),y+34);ctx.restore()}}
function flash(t){for(const it of ITEMS){const p=prog(t,it.t0,.35);if(p>0&&p<1){ctx.save();ctx.globalAlpha=(1-p)*.12;ctx.fillStyle='#FFFFFF';ctx.fillRect(0,0,W,H);ctx.restore()}}}
function draw(t){ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';ctx.globalAlpha=1;bg(t);progressBar(t);ctx.save();ctx.translate(0,110);hook(t);intro(t);for(const it of ITEMS)item(it,t);outro(t);ctx.restore();flash(t);
 ctx.globalAlpha=.45;ctx.font='700 26px In';ctx.textAlign='center';ctx.fillStyle=BONE;ctx.letterSpacing='4px';if(t<OUT)ctx.fillText('@SU7AIB.7',CX,1800);ctx.letterSpacing='0px';ctx.globalAlpha=1;
 ctx.drawImage(GR[Math.floor(t*24)%4],0,0,W,H);const f=prog(t,DUR-.4,.4);if(f>0){ctx.globalAlpha=f;ctx.fillStyle=BG_OUT;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}}
window.render=t=>{draw(t);return cv.toDataURL('image/png')};
window.drawCover=()=>{ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';ctx.globalAlpha=1;bg(2);
 ctx.save();ctx.translate(CX,470);ctx.beginPath();ctx.arc(0,0,80,0,7);ctx.fillStyle='rgba(142,59,70,.1)';ctx.fill();stroke(7);ctx.beginPath();ctx.arc(0,0,54,0,7);stroke(3,'rgba(142,59,70,.6)');ctx.beginPath();ctx.moveTo(-105,-105);ctx.lineTo(105,105);stroke(10,GOLD2);ctx.restore();
 word('ما عندك قروش؟',CX,720,160,{c:GOLD,glow:30});word('عندك ٥ صدقات كل يوم',CX,920,100);word('وما بتكلّفك ولا قرش',CX,1070,64,{w:500});
 for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(CX+(2-i)*80,1240,16,0,7);ctx.fillStyle=i==0?GOLD2:'rgba(142,59,70,.4)';ctx.fill()}softGlow(CX+160,1240,90,.6);
 pill('حديث واحد في صحيح البخاري',1400,1);ctx.drawImage(GR[0],0,0,W,H);return cv.toDataURL('image/png')};
