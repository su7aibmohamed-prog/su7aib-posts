// SU7IAB reel — "6 rights of a Muslim over a Muslim" (Muslim 2162). Listicle + light + particles + typing.
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
// ------------- content (verified Nov 23 2026: sunnah.com muslim:2162b + hadeethenc 5343 [صحيح مسلم 2162، أبو هريرة، صحيح]; dorar.net blocked, surahquran (dorar API) confirms)
const INTRO={txt:'«حقُّ المسلمِ على المسلمِ ستٌّ» قيل: ما هنَّ يا رسولَ الله؟',src:'عن أبي هريرة · صحيح مسلم ٢١٦٢'};
const ITEMS=[
 {n:'١',title:'تسلّم عليه',txt:'«إذا لَقِيتَه فسَلِّمْ عليه»',ic:'salam',d:3.1},
 {n:'٢',title:'تجيب دعوته',txt:'«وإذا دعاك فأَجِبْه»',ic:'invite',d:3.1},
 {n:'٣',title:'تنصحه',txt:'«وإذا استنصحَك فانصَحْ له»',ic:'advice',d:3.1},
 {n:'٤',title:'تشمّته',txt:'«وإذا عطَسَ فحَمِدَ اللهَ فسَمِّتْه»',ic:'sneeze',d:3.4},
 {n:'٥',title:'تزوره',txt:'«وإذا مَرِضَ فعُدْه»',ic:'visit',d:3.1},
 {n:'٦',title:'تتبع جنازته',txt:'«وإذا مات فاتَّبِعْه»',ic:'follow',d:3.2}];
const TI=2.7,DI=3.1,T0=TI+DI;let acc=T0;for(const it of ITEMS){it.t0=acc;acc+=it.d}const OUT=acc,DUR=OUT+3.0;window.DUR=DUR;
const KW=.085;
// ------------- SFX
window.SFX=[[0,'room'],[0.15,'impact_s'],[0.55,'impact'],[1.2,'air'],[1.7,'tick'],[2.45,'whoosh'],
 [TI,'sub_soft'],[TI+.1,'swell'],[TI+.4,'line']];
{const ws=INTRO.txt.split(' ').length;for(let k=0;k<ws;k++)SFX.push([TI+1.0+k*KW,'key'])}
SFX.push([T0-.3,'whoosh']);
for(const it of ITEMS){SFX.push([it.t0,'sub_soft'],[it.t0+.05,'tick']);
 const ws=it.txt.split(' ').length;for(let k=0;k<ws;k++)SFX.push([it.t0+.95+k*KW,'key']);
 if(it.ic=='salam')SFX.push([it.t0+.3,'whoosh'],[it.t0+.75,'impact_s'],[it.t0+.8,'bloom']);
 if(it.ic=='invite')SFX.push([it.t0+.35,'stretch'],[it.t0+.8,'plip'],[it.t0+1.1,'bloom']);
 if(it.ic=='advice')SFX.push([it.t0+.3,'line'],[it.t0+.7,'tick'],[it.t0+.85,'tick'],[it.t0+1.05,'impact_s'],[it.t0+1.1,'bloom']);
 if(it.ic=='sneeze')SFX.push([it.t0+.3,'plip'],[it.t0+1.1,'plip'],[it.t0+1.4,'bloom']);
 if(it.ic=='visit')SFX.push([it.t0+.3,'line'],[it.t0+.85,'sub_soft'],[it.t0+1.25,'sub_soft'],[it.t0+1.3,'bloom']);
 if(it.ic=='follow')for(let j=0;j<6;j++)SFX.push([it.t0+.3+j*.17,'tick']);
 if(it!==ITEMS[ITEMS.length-1])SFX.push([it.t0+it.d-.3,'whoosh'])}
SFX.push([OUT-.3,'whoosh'],[OUT+.2,'air'],[OUT+1.0,'air'],[OUT+1.9,'sub_soft'],[OUT+1.95,'line']);
// ------------- particles + light
const P=[];{const r=rng(31);for(let i=0;i<70;i++)P.push({x:r()*W,y:r()*H,z:.3+r()*1,ph:r()*6.28,s:1+r()*3})}
function bg(t){const g=ctx.createRadialGradient(CX,760,80,CX,960,1300);g.addColorStop(0,BG_IN);g.addColorStop(.55,BG);g.addColorStop(1,BG_OUT);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 ctx.save();for(let i=0;i<5;i++){const a=-.32+i*.16+Math.sin(t*.25+i)*.04;ctx.save();ctx.translate(CX+(i-2)*60,-120);ctx.rotate(a);
  const gr=ctx.createLinearGradient(0,0,0,1700);gr.addColorStop(0,`rgba(142,59,70,${.035+.01*Math.sin(t*.7+i*2)})`);gr.addColorStop(1,'rgba(142,59,70,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(-18,0);ctx.lineTo(18,0);ctx.lineTo(150,1700);ctx.lineTo(-150,1700);ctx.closePath();ctx.fill();ctx.restore()}ctx.restore();
 for(const p of P){const y=((p.y-t*28*p.z)%H+H)%H,x=p.x+Math.sin(t*.6*p.z+p.ph)*24;const tw=.35+.35*Math.sin(t*2*p.z+p.ph);ctx.globalAlpha=tw*p.z*.45;ctx.fillStyle=GOLD2;ctx.beginPath();ctx.arc(x,y,p.s*p.z,0,7);ctx.fill()}ctx.globalAlpha=1;
 ctx.save();ctx.globalAlpha=.05;ctx.strokeStyle=GOLD;ctx.lineWidth=1.5;ctx.translate(CX,960);ctx.rotate(t*.02);for(let i=0;i<2;i++){ctx.rotate(Math.PI/4);ctx.strokeRect(-470,-470,940,940)}ctx.restore()}
// ------------- symbols
const IY=780;
function dot(x,y,r,fill=GOLD2){ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fillStyle=fill;ctx.fill()}
function bubble(x,y,w,h,tail,dr,label,la){ctx.save();ctx.beginPath();ctx.roundRect(x-w/2,y-h/2,w,h,h/2);const tx=x+tail*w*.25;ctx.moveTo(tx-20,y+h/2-2);ctx.lineTo(tx+tail*30,y+h/2+50);ctx.lineTo(tx+20,y+h/2-2);
 ctx.setLineDash([2400*dr,2400]);ctx.fillStyle=`rgba(142,59,70,${.08*dr})`;ctx.fill();stroke(5);ctx.setLineDash([]);ctx.restore();
 if(la>0)word(label,x,y+2,54,{a:la,s:lerp(.85,1,eOB(la,2)),c:GOLD2})}
function bond(t,t0,a,cy){ // two souls linked by a bond line with 6 knots: the six rights
 const k=t-t0;ctx.save();ctx.globalAlpha*=a;const sp=eO(prog(k,.1,.7));const xl=CX-lerp(60,300,sp),xr=CX+lerp(60,300,sp);
 const br=1+.02*Math.sin(t*3);for(const x of[xl,xr]){ctx.beginPath();ctx.arc(x,cy,70*br,0,7);ctx.fillStyle='rgba(142,59,70,.1)';ctx.fill();stroke(6)}
 const lp=eIO(prog(k,.5,.6));ctx.beginPath();ctx.moveTo(xl+75,cy);ctx.lineTo(lerp(xl+75,xr-75,lp),cy);stroke(4);
 for(let i=0;i<6;i++){const p=eOB(prog(k,.8+i*.09,.3),2.4);const x=lerp(xl+110,xr-110,i/5);dot(x,cy,13*p);}
 softGlow(CX,cy,300,.25*lp);ctx.restore()}
function icon(kind,t,t0,a){const k=t-t0;ctx.save();ctx.globalAlpha*=a;const ent=eOB(prog(t,t0+.15,.5),2);ctx.translate(CX,IY);ctx.scale(ent,ent);ctx.translate(-CX,-IY);
 softGlow(CX,IY,260,.18);
 if(kind=='salam'){ // two circles glide in on arcs, meet, and a greeting ripples out
  const m=eIO(prog(k,.2,.55));const lift=Math.sin(m*Math.PI)*-70;const xl=lerp(CX-330,CX-55,m),xr=lerp(CX+330,CX+55,m);
  const sq=1-.08*Math.sin(Math.PI*prog(k,.72,.25));
  for(const [x,sd] of[[xl,-1],[xr,1]]){ctx.save();ctx.translate(x,IY+60+lift);ctx.scale(sq,1/sq);ctx.beginPath();ctx.arc(0,0,80,0,7);ctx.fillStyle='rgba(142,59,70,.1)';ctx.fill();stroke(6);ctx.restore()}
  const g=prog(k,.75,1.2);if(g>0){for(let r=0;r<3;r++){const q=prog(k,.75+r*.25,1.1);ring(CX,IY+60,lerp(90,360,eO(q)),2.5,GOLD,.55*(1-q))}softGlow(CX,IY+60,240,.5*(1-g*.5))}
  bubble(CX,IY-150,420,110,-1,eIO(prog(k,.8,.4)),'السلام عليكم',eO(prog(k,1.05,.4)))}
 if(kind=='invite'){ // an envelope's flap opens and an invitation card rises with a check
  const ex=CX,ey=IY+50,w=380,h=240;const op=eIO(prog(k,.3,.45));const up=eOB(prog(k,.65,.55),1.6);const cy=lerp(ey,ey-205,up);
  // flap (behind the card once open)
  const fy=lerp(ey+20,ey-h/2-120,op);const flap=()=>{ctx.beginPath();ctx.moveTo(ex-w/2,ey-h/2);ctx.lineTo(ex,fy);ctx.lineTo(ex+w/2,ey-h/2);ctx.closePath();ctx.fillStyle='rgba(235,218,198,1)';ctx.fill();stroke(6)};
  if(op>.5)flap();
  ctx.beginPath();ctx.roundRect(ex-150,cy-130,300,230,16);ctx.fillStyle=BG_IN;ctx.fill();stroke(5);
  ctx.beginPath();ctx.moveTo(ex-90,cy-80);ctx.lineTo(ex+90,cy-80);ctx.moveTo(ex-90,cy-40);ctx.lineTo(ex+40,cy-40);stroke(4,'rgba(142,59,70,.5)');
  const ck=eIO(prog(k,1.05,.35));if(ck>0){ctx.beginPath();ctx.moveTo(ex-40,cy+20);ctx.lineTo(ex-40+30*cl(ck*2),cy+20+30*cl(ck*2));if(ck>.5)ctx.lineTo(ex-10+70*cl(ck*2-1),cy+50-70*cl(ck*2-1));stroke(8,GOLD2)}
  ctx.beginPath();ctx.roundRect(ex-w/2,ey-h/2,w,h,14);ctx.fillStyle='rgba(235,218,198,1)';ctx.fill();stroke(6);
  ctx.beginPath();ctx.moveTo(ex-w/2+6,ey+h/2-6);ctx.lineTo(ex,ey+10);ctx.lineTo(ex+w/2-6,ey+h/2-6);stroke(4,'rgba(142,59,70,.6)');
  if(op<=.5)flap();
  const g=prog(k,1.1,1);if(g>0){softGlow(ex,cy,200,.45*(1-g*.5));ring(ex,cy,lerp(40,260,eO(g)),2,GOLD,.6*(1-g))}}
 if(kind=='advice'){ // a fork in the road; a compass needle swings, settles, and lights the right path
  const by=IY+200,fy=IY+20;const dr=eIO(prog(k,.1,.5));
  ctx.save();ctx.setLineDash([1400*dr,1400]);ctx.beginPath();ctx.moveTo(CX,by);ctx.lineTo(CX,fy);ctx.moveTo(CX,fy);ctx.quadraticCurveTo(CX,fy-90,CX-230,fy-200);ctx.moveTo(CX,fy);ctx.quadraticCurveTo(CX,fy-90,CX+230,fy-200);stroke(6,'rgba(142,59,70,.45)');ctx.setLineDash([]);ctx.restore();
  const lit=eIO(prog(k,1.05,.5));if(lit>0){ctx.save();ctx.setLineDash([600*lit,600]);ctx.beginPath();ctx.moveTo(CX,fy);ctx.quadraticCurveTo(CX,fy-90,CX+230,fy-200);stroke(9,GOLD2);ctx.setLineDash([]);ctx.restore();softGlow(CX+230,fy-200,170,.5*lit);dot(CX+230,fy-200,16*eOB(lit,2.4))}
  // X on the other branch
  const xo=eO(prog(k,1.2,.3));if(xo>0){ctx.save();ctx.globalAlpha*=xo;ctx.translate(CX-230,fy-200);ctx.beginPath();ctx.moveTo(-18,-18);ctx.lineTo(18,18);ctx.moveTo(18,-18);ctx.lineTo(-18,18);stroke(5,'rgba(142,59,70,.5)');ctx.restore()}
  // compass
  const cx=CX,cy=by-20;ctx.beginPath();ctx.arc(cx,cy,70,0,7);ctx.fillStyle=BG_IN;ctx.fill();stroke(5);
  const st=prog(k,.45,.75);const ang=-Math.PI/4-(st<=0?-.9:.9*Math.exp(-4*st)*Math.cos(st*13));
  ctx.save();ctx.translate(cx,cy);ctx.rotate(ang);ctx.beginPath();ctx.moveTo(0,-52);ctx.lineTo(12,0);ctx.lineTo(0,10);ctx.lineTo(-12,0);ctx.closePath();ctx.fillStyle=GOLD2;ctx.fill();ctx.beginPath();ctx.moveTo(0,52);ctx.lineTo(10,0);ctx.lineTo(-10,0);ctx.closePath();ctx.fillStyle='rgba(142,59,70,.3)';ctx.fill();ctx.restore();dot(cx,cy,7,BG_IN)}
 if(kind=='sneeze'){ // a burst puff, then "الحمد لله" bubble; the reply "يرحمك الله" answers it
  const pf=prog(k,.25,.5);if(pf>0&&pf<1){for(let i=0;i<7;i++){const an=-Math.PI*.15-i*.12;const r0=40+eO(pf)*170;ctx.save();ctx.globalAlpha*=1-pf;dot(CX+200+Math.cos(an+Math.PI)*r0,IY-40+Math.sin(an)*r0*.6,7*(1-pf)+3);ctx.restore()}}
  bubble(CX+110,IY-120,380,110,1,eIO(prog(k,.25,.4)),'الحمد لله',eO(prog(k,.45,.4)));
  bubble(CX-110,IY+90,400,110,-1,eIO(prog(k,1.05,.4)),'يرحمك الله',eO(prog(k,1.25,.4)));
  const g=prog(k,1.4,1);if(g>0){softGlow(CX-110,IY+90,220,.45*(1-g*.5));ring(CX-110,IY+90,lerp(60,280,eO(g)),2,GOLD,.55*(1-g))}}
 if(kind=='visit'){ // a weak flat pulse line; a heart arrives and the beat grows steady
  const y0=IY+20;const dr=eIO(prog(k,.15,.6));const amp=lerp(.15,1,eO(prog(k,.85,.6)));
  ctx.save();ctx.beginPath();ctx.rect(CX-380,y0-250,760*dr,500);ctx.clip();ctx.beginPath();
  for(let x=-380;x<=380;x+=4){const ph=((x+380)/760*3+t*.9)%1;let y=0;if(ph>.42&&ph<.5)y=-160*Math.sin((ph-.42)/.08*Math.PI);else if(ph>.5&&ph<.55)y=60*Math.sin((ph-.5)/.05*Math.PI);x==-380?ctx.moveTo(CX+x,y0+y*amp):ctx.lineTo(CX+x,y0+y*amp)}stroke(6,GOLD2);ctx.restore();
  const hj=eOB(prog(k,.6,.45),2.2);if(hj>0){const beat=1+.08*Math.max(0,Math.sin(t*7));ctx.save();ctx.translate(CX,y0-230);ctx.scale(hj*beat*1.1,hj*beat*1.1);ctx.beginPath();ctx.moveTo(0,40);ctx.bezierCurveTo(-90,-20,-50,-90,0,-45);ctx.bezierCurveTo(50,-90,90,-20,0,40);ctx.fillStyle=GOLD2;ctx.fill();ctx.restore();
   for(let r=0;r<2;r++){const q=prog(k,.9+r*.4,1);ring(CX,y0-230,lerp(50,220,eO(q)),2.5,GOLD,.5*(1-q))}}}
 if(kind=='follow'){ // footsteps walking along a path that rises toward a soft horizon light
  const path=s=>{const x=lerp(CX+300,CX-120,s)+Math.sin(s*Math.PI)*-60,y=lerp(IY+200,IY-160,s);return[x,y]};
  const hz=eIO(prog(k,.1,.6));ctx.beginPath();ctx.moveTo(CX-330*hz,IY-200);ctx.lineTo(CX+330*hz,IY-200);stroke(3,'rgba(142,59,70,.5)');
  const lit=prog(k,1.3,.8);softGlow(CX-120,IY-210,260,.3+.3*lit);
  for(let j=0;j<6;j++){const p=prog(k,.3+j*.17,.25);if(p<=0)continue;const s=.05+j*.17;const [x,y]=path(s);const [x2,y2]=path(s+.02);const an=Math.atan2(y2-y,x2-x);const side=j%2?1:-1;
   ctx.save();ctx.translate(x-Math.sin(an)*side*18,y+Math.cos(an)*side*18);ctx.rotate(an+Math.PI/2);const sc=eOB(p,2.4)*lerp(1,.7,s);ctx.scale(sc,sc);
   ctx.beginPath();ctx.ellipse(0,0,11,19,0,0,7);ctx.fillStyle=GOLD2;ctx.fill();ctx.beginPath();ctx.ellipse(0,-28,8,8,0,0,7);ctx.fill();ctx.restore()}}
 ctx.restore()}
// ------------- text wrap with word reveal (typing)
function wrap(txt,size,maxW0){ctx.font=`500 ${size}px Am`;const tw=ctx.measureText(txt).width;const nL=Math.ceil(tw/maxW0);const maxW=Math.min(maxW0,tw/nL*1.12);const ws=txt.split(' '),L=[[]];let w=0;const sp=ctx.measureText(' ').width;for(const x of ws){const ww=ctx.measureText(x).width;if(w+ww>maxW&&L[L.length-1].length){L.push([]);w=0}L[L.length-1].push([x,ww]);w+=ww+sp}if(L.length>1&&L[L.length-1].length<2&&L[L.length-2].length>3)L[L.length-1].unshift(L[L.length-2].pop());return{L,sp}}
function typed(txt,y,size,t,t0,a){const {L,sp}=wrap(txt,size,860);let n=0;ctx.save();ctx.font=`500 ${size}px Am`;ctx.direction='rtl';ctx.textAlign='right';ctx.textBaseline='middle';
 L.forEach((ln,li)=>{const tot=ln.reduce((s,q)=>s+q[1],0)+sp*(ln.length-1);let x=CX+tot/2;const yy=y+li*size*1.45;for(const [wd,ww] of ln){const p=prog(t,t0+n*KW,.25);if(p>0){ctx.globalAlpha=a*eO(p);ctx.fillStyle=BONE;ctx.fillText(wd,x,yy+10*(1-eO(p)))}x-=ww+sp;n++}});
 // caret
 ctx.restore();return L.length}
function pill(s,y,a){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.font='500 34px Px';const w=ctx.measureText(s).width+56;ctx.beginPath();ctx.roundRect(CX-w/2,y-30,w,60,30);ctx.fillStyle='rgba(142,59,70,.12)';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='rgba(142,59,70,.6)';ctx.stroke();
 ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=GOLD;ctx.fillText(s,CX,y+2);ctx.restore()}
function progressBar(t){if(t<T0-.3||t>OUT+.3)return;const a=eO(prog(t,T0-.3,.4))*(1-prog(t,OUT,.3));ctx.save();ctx.globalAlpha=a;const n=ITEMS.length,gap=14,w=(800-gap*(n-1))/n;
 ITEMS.forEach((it,i)=>{const x=940-(i+1)*w-i*gap;/*RTL: first segment on the right*/ctx.fillStyle='rgba(142,59,70,.18)';ctx.beginPath();ctx.roundRect(x,170,w,8,4);ctx.fill();const p=prog(t,it.t0,it.d);if(p>0){ctx.fillStyle=GOLD;ctx.beginPath();ctx.roundRect(x+w*(1-p),170,w*p,8,4);ctx.fill()}});ctx.restore()}
function item(it,t){if(t<it.t0-.05||t>it.t0+it.d+.05)return;const out=prog(t,it.t0+it.d-.32,.32);const a=1-eI(out);const dx=eI(out)*220;
 const inn=eO5(prog(t,it.t0,.45));ctx.save();ctx.translate(dx-(1-inn)*160,0);
 const nb=eOB(prog(t,it.t0+.05,.45),2.2);ctx.save();ctx.globalAlpha=a;ctx.translate(CX,370);ctx.scale(nb,nb);ctx.beginPath();ctx.arc(0,0,74,0,7);ctx.fillStyle=BONE;ctx.fill();ctx.beginPath();ctx.arc(0,0,74,-Math.PI/2,-Math.PI/2+Math.PI*2*eIO(prog(t,it.t0+.1,.6)));ctx.lineWidth=3;ctx.strokeStyle=GOLD;ctx.stroke();ctx.restore();
 word(it.n,CX,368,92,{...slam(t,it.t0+.12),a:slam(t,it.t0+.12).a*a,c:IVORY});
 icon(it.ic,t,it.t0,a);
 const r=reveal(t,it.t0+.55,.5);word(it.title,CX,1080,104,{...r,a:r.a*a,c:GOLD,glow:22});
 const nl=typed(it.txt,1230,58,t,it.t0+.95,a);let py=1230+(nl-1)*58*1.45;
 if(it.ic=='sneeze'){const r4=reveal(t,it.t0+1.6,.5);word('تشميته: تقول له «يرحمك الله»',CX,py+80,40,{...r4,a:r4.a*a*.85,w:500,f:'Px'});py+=70}
 pill('صحيح مسلم ٢١٦٢',py+80,a*eO(prog(t,it.t0+1.3,.4)));ctx.restore()}
function hook(t){if(t>TI+.1)return;const e=eI(prog(t,2.4,.3));const o={a:1-e,blur:e*20,s:1+e*.15};
 const s1=slam(t,.15);word('أخوك المسلم',CX,560,96,{...s1,...(e>0?o:{}),w:700});
 const s2=slam(t,.55);word('ليهو ٦ حقوق عليك',CX,730,132,{...s2,...(e>0?o:{}),c:GOLD,glow:30});
 const r=reveal(t,1.2,.5);word('كم واحد منها بتأدّيهو؟',CX,900,66,{...r,a:r.a*(1-e),w:500});
 const r2=reveal(t,1.7,.5);if(r2.a>0)pill('حديث واحد في صحيح مسلم',1040+r2.dy,r2.a*(1-e));
 for(let i=0;i<6;i++){const p=eOB(prog(t,.9+i*.08,.35),2.4);ring(CX+(2.5-i)*70,1200,14*p,3,GOLD,(1-e)*p)}
 }
function intro(t){if(t<TI-.05||t>T0+.05)return;const k=t-TI;const out=prog(t,T0-.32,.32);const a=1-eI(out);ctx.save();ctx.translate(eI(out)*220,0);
 bond(t,TI,a,660);
 const lp=eIO(prog(k,.35,.5));ctx.save();ctx.globalAlpha*=a;ctx.beginPath();ctx.moveTo(CX-200*lp,1000);ctx.lineTo(CX+200*lp,1000);stroke(2,GOLD);ctx.restore();
 const r=reveal(t,TI+.5,.5);if(r.a>0){ctx.save();ctx.globalAlpha*=r.a*a;ctx.translate(0,r.dy);ctx.direction='rtl';ctx.textBaseline='middle';ctx.fillStyle=BONE;
  ctx.font='400 58px Am';const s1='قال رسول الله ';const w1=ctx.measureText(s1).width;ctx.font='64px Saw';const w2=ctx.measureText('ﷺ').width;ctx.font='400 58px Am';const w3=ctx.measureText(' :').width;const tot=w1+w2+w3;
  ctx.textAlign='right';ctx.fillText(s1,CX+tot/2,940);ctx.font='64px Saw';ctx.fillStyle=GOLD;ctx.fillText('ﷺ',CX+tot/2-w1,946);ctx.font='400 58px Am';ctx.fillStyle=BONE;ctx.fillText(' :',CX+tot/2-w1-w2,940);ctx.restore()}
 const nl=typed(INTRO.txt,1100,62,t,TI+1.0,a);
 pill(INTRO.src,1100+(nl-1)*62*1.45+95,a*eO(prog(t,TI+1.9,.4)));
 ctx.restore()}
function outro(t){if(t<OUT)return;const e=eI(prog(t,DUR-.45,.45));
 const r=reveal(t,OUT+.15,.5);word('أنو حق منها بتنساهو كتير؟',CX,700,72,{...r,a:r.a*(1-e)});
 const r2=reveal(t,OUT+.55,.5);word('اكتب رقمو في التعليقات',CX,830,58,{...r2,a:r2.a*(1-e),w:500,c:GOLD});
 const r3=reveal(t,OUT+1.0,.5);if(r3.a>0)pill('احفظ الفيديو وشاركه مع أخوك',980+r3.dy,r3.a*(1-e));
 const kk=prog(t,OUT+1.8,.6);if(kk>0){ctx.save();ctx.globalAlpha=eO(kk)*(1-e);const y=1300;ctx.font='700 54px In';ctx.textBaseline='middle';
  ctx.fillStyle=BONE;ctx.textAlign='right';ctx.fillText('20',CX-150,y-34);ctx.fillStyle=GOLD;ctx.fillText('26',CX-150,y+34);ctx.fillStyle=BONE;ctx.fillRect(CX-134,y-66,3,132*eIO(prog(t,OUT+1.9,.5)));
  ctx.textAlign='left';ctx.letterSpacing='6px';ctx.fillStyle=GOLD;ctx.fillText('CRAFTED BY',CX-112+30*(1-eO(kk)),y-34);ctx.fillStyle=BONE;ctx.fillText('@SU7AIB.7',CX-112+50*(1-eO(prog(t,OUT+1.85,.6))),y+34);ctx.restore()}}
function flash(t){for(const it of ITEMS){const p=prog(t,it.t0,.35);if(p>0&&p<1){ctx.save();ctx.globalAlpha=(1-p)*.12;ctx.fillStyle='#FFFFFF';ctx.fillRect(0,0,W,H);ctx.restore()}}}
function shake(t){const p=prog(t,.55,.35);if(p<=0||p>=1)return[0,0];const m=14*(1-p);return[Math.sin(t*90)*m,Math.cos(t*77)*m]}
function draw(t){ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';ctx.globalAlpha=1;bg(t);progressBar(t);const [sx,sy]=shake(t);ctx.save();ctx.translate(sx,110+sy);hook(t);intro(t);for(const it of ITEMS)item(it,t);outro(t);ctx.restore();flash(t);
 ctx.globalAlpha=.45;ctx.font='700 26px In';ctx.textAlign='center';ctx.fillStyle=BONE;ctx.letterSpacing='4px';if(t<OUT)ctx.fillText('@SU7AIB.7',CX,1800);ctx.letterSpacing='0px';ctx.globalAlpha=1;
 ctx.drawImage(GR[Math.floor(t*24)%4],0,0,W,H);const f=prog(t,DUR-.4,.4);if(f>0){ctx.globalAlpha=f;ctx.fillStyle=BG_OUT;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}}
window.render=t=>{draw(t);return cv.toDataURL('image/png')};
window.drawCover=()=>{ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';ctx.globalAlpha=1;bg(2);
 bond(9,0,1,470);
 word('أخوك المسلم',CX,690,96);word('ليهو ٦ حقوق عليك',CX,880,138,{c:GOLD,glow:30});word('كم واحد منها بتأدّيهو؟',CX,1060,66,{w:500});
 pill('حديث واحد في صحيح مسلم',1230,1);ctx.drawImage(GR[0],0,0,W,H);return cv.toDataURL('image/png')};
