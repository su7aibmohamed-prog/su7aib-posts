// SU7IAB reel — "3 deeds that continue after death" (Muslim 1631). Listicle + light + particles + typing.
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
// ------------- particles + light
const P=[];{const r=rng(31);for(let i=0;i<70;i++)P.push({x:r()*W,y:r()*H,z:.3+r()*1,ph:r()*6.28,s:1+r()*3})}
function bg(t){const g=ctx.createRadialGradient(CX,760,80,CX,960,1300);g.addColorStop(0,BG_IN);g.addColorStop(.55,BG);g.addColorStop(1,BG_OUT);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 ctx.save();for(let i=0;i<5;i++){const a=-.32+i*.16+Math.sin(t*.25+i)*.04;ctx.save();ctx.translate(CX+(i-2)*60,-120);ctx.rotate(a);
  const gr=ctx.createLinearGradient(0,0,0,1700);gr.addColorStop(0,`rgba(142,59,70,${.035+.01*Math.sin(t*.7+i*2)})`);gr.addColorStop(1,'rgba(142,59,70,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(-18,0);ctx.lineTo(18,0);ctx.lineTo(150,1700);ctx.lineTo(-150,1700);ctx.closePath();ctx.fill();ctx.restore()}ctx.restore();
 for(const p of P){const y=((p.y-t*28*p.z)%H+H)%H,x=p.x+Math.sin(t*.6*p.z+p.ph)*24;const tw=.35+.35*Math.sin(t*2*p.z+p.ph);ctx.globalAlpha=tw*p.z*.45;ctx.fillStyle=GOLD2;ctx.beginPath();ctx.arc(x,y,p.s*p.z,0,7);ctx.fill()}ctx.globalAlpha=1;
 ctx.save();ctx.globalAlpha=.05;ctx.strokeStyle=GOLD;ctx.lineWidth=1.5;ctx.translate(CX,960);ctx.rotate(t*.02);for(let i=0;i<2;i++){ctx.rotate(Math.PI/4);ctx.strokeRect(-470,-470,940,940)}ctx.restore()}
function dot(x,y,r,fill=GOLD2){ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fillStyle=fill;ctx.fill()}
function bubble(x,y,w,h,tail,dr,label,la){ctx.save();ctx.beginPath();ctx.roundRect(x-w/2,y-h/2,w,h,h/2);const tx=x+tail*w*.25;ctx.moveTo(tx-20,y+h/2-2);ctx.lineTo(tx+tail*30,y+h/2+50);ctx.lineTo(tx+20,y+h/2-2);
 ctx.setLineDash([2400*dr,2400]);ctx.fillStyle=`rgba(142,59,70,${.08*dr})`;ctx.fill();stroke(5);ctx.setLineDash([]);ctx.restore();
 if(la>0)word(label,x,y+2,54,{a:la,s:lerp(.85,1,eOB(la,2)),c:GOLD2})}
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
// ------------- content: Muslim 1631 (Abu Huraira). Verified Nov 26 2026: hadithunlocked muslim:1631 (Arabic + sunnah.com/Siddiqui translation), hadeethenc 65566 (صحيح مسلم 1631, صحيح), sunnah.com riyadussalihin:949 ([Muslim]); dorar.net + sunnah.com/muslim:1631 fetch unavailable.
const ITEMS=[
 {n:'١',title:'صدقة جارية',txt:'«إلا مِن صَدَقَةٍ جَارِيَةٍ»',ic:'flow',d:4.3},
 {n:'٢',title:'علم يُنتفَع بيهو',txt:'«أو عِلْمٍ يُنْتَفَعُ بِهِ»',ic:'light',d:4.3},
 {n:'٣',title:'ولد صالح يدعو ليك',txt:'«أو وَلَدٍ صَالِحٍ يَدْعُو لَهُ»',ic:'dua',d:4.5}];
const SRC='عن أبي هريرة · صحيح مسلم ١٦٣١';
const TI=2.9,DI=4.6,T0=TI+DI;let acc=T0;for(const it of ITEMS){it.t0=acc;acc+=it.d}const OUT=acc,DUR=OUT+3.0;window.DUR=DUR;
const KW=.12;
const HAD='«إذا ماتَ الإنسانُ انقطَعَ عنه عملُه إلا مِن ثلاثةٍ»';
// ------------- SFX
window.SFX=[[0,'room'],[0.15,'impact_s'],[0.6,'impact'],[1.15,'line'],[1.45,'cut'],[1.55,'shatter'],[1.95,'bloom'],[2.25,'tick'],[2.6,'whoosh'],
 [TI,'sub_soft'],[TI+.1,'ticks'],[TI+.75,'stretch'],[TI+1.15,'sub'],[TI+1.6,'tick']];
{const ws=HAD.split(' ').length;for(let k=0;k<ws;k++)SFX.push([TI+1.7+k*KW,'key'])}
SFX.push([TI+2.9,'bloom'],[TI+3.4,'tick'],[T0-.3,'whoosh']);
for(const it of ITEMS){SFX.push([it.t0,'sub_soft'],[it.t0+.05,'tick']);
 const ws=it.txt.split(' ').length;for(let k=0;k<ws;k++)SFX.push([it.t0+1.0+k*KW,'key']);
 if(it.ic=='flow')SFX.push([it.t0+.3,'plip'],[it.t0+.6,'air'],[it.t0+1.2,'plip'],[it.t0+1.8,'plip'],[it.t0+2.0,'bloom']);
 if(it.ic=='light')SFX.push([it.t0+.3,'swell'],[it.t0+.9,'tick'],[it.t0+1.3,'ticks'],[it.t0+1.9,'bloom']);
 if(it.ic=='dua')SFX.push([it.t0+.3,'sub_soft'],[it.t0+.7,'riser_s'],[it.t0+1.4,'air'],[it.t0+2.0,'swell'],[it.t0+2.3,'bloom']);
 if(it!==ITEMS[ITEMS.length-1])SFX.push([it.t0+it.d-.3,'whoosh'])}
SFX.push([OUT-.3,'whoosh'],[OUT+.2,'air'],[OUT+1.0,'air'],[OUT+2.0,'sub_soft'],[OUT+2.05,'line']);
const IY=780;
function sprout(x,y,g,sc=1){if(g<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(sc,sc);const h=lerp(0,150,eO(g));ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(10,-h*.5,0,-h);stroke(6,GOLD2);
 for(const [sd,f] of[[1,.55],[-1,.8]]){const q=eOB(prog(g,f*.8,.35),2);if(q<=0)continue;ctx.save();ctx.translate(0,-h*f);ctx.rotate(sd*.6);ctx.scale(q,q);ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(sd*30,-34,sd*70,-10);ctx.quadraticCurveTo(sd*30,14,0,0);ctx.fillStyle='rgba(142,59,70,.25)';ctx.fill();stroke(4,GOLD2);ctx.restore()}ctx.restore()}
function icon(kind,t,t0,a){const k=t-t0;ctx.save();ctx.globalAlpha*=a;const ent=eOB(prog(t,t0+.15,.5),2);ctx.translate(CX,IY);ctx.scale(ent,ent);ctx.translate(-CX,-IY);
 softGlow(CX,IY,260,.18);
 if(kind=='flow'){ // a spout pours a never-ending dashed stream into a pool; ripples keep going; a sprout grows from it
  const sx=CX+190,sy=IY-170,px=CX-60,py=IY+200;
  ctx.save();ctx.translate(sx,sy);ctx.beginPath();ctx.roundRect(-10,-40,150,56,20);ctx.fillStyle='rgba(142,59,70,.12)';ctx.fill();stroke(6);ctx.beginPath();ctx.moveTo(-10,-12);ctx.lineTo(-40,-12);stroke(10);ctx.restore();
  const op=eIO(prog(k,.3,.5));if(op>0){ctx.save();ctx.beginPath();ctx.moveTo(sx-40,sy-6);ctx.bezierCurveTo(sx-140,sy-6,px+60,lerp(sy,py,.4),lerp(sx-40,px+30,op),lerp(sy-6,py-20,op));ctx.setLineDash([22,16]);ctx.lineDashOffset=-k*90;stroke(8,GOLD2);ctx.restore()}
  ctx.beginPath();ctx.ellipse(px,py,200,40,0,0,7);ctx.fillStyle=`rgba(142,59,70,${.06+.08*eO(prog(k,.7,.8))})`;ctx.fill();stroke(5);
  if(k>.75){for(let r=0;r<3;r++){const q=((k-.75)*.8+r/3)%1;ctx.save();ctx.globalAlpha*=(1-q)*.7;ctx.beginPath();ctx.ellipse(px+30,py,lerp(20,180,q),lerp(5,34,q),0,0,7);stroke(2.5,GOLD);ctx.restore()}}
  sprout(px-140,py-20,prog(k,1.3,1.0),1);sprout(px+150,py-14,prog(k,1.7,1.0),.7);
  // infinity mark
  const inf=prog(k,2.0,.8);if(inf>0){ctx.save();ctx.translate(CX,IY-330);ctx.beginPath();for(let i=0;i<=60*eIO(inf);i++){const s=i/60*Math.PI*2;const d=1+Math.sin(s)**2;const x=70*Math.cos(s)/d,y=70*Math.sin(s)*Math.cos(s)/d;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}stroke(6,GOLD2);ctx.restore();softGlow(CX,IY-330,140,.4*inf)}}
 if(kind=='light'){ // an open book; one light rises from it and passes to more and more points
  const bx=CX,by=IY+230;const op=eOB(prog(k,.15,.5),1.5);
  ctx.save();ctx.translate(bx,by);for(const sd of[-1,1]){ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(sd*80*op,-30*op,sd*170*op,-10*op);ctx.lineTo(sd*170*op,60);ctx.quadraticCurveTo(sd*80*op,40,0,70);ctx.closePath();ctx.fillStyle=BG_IN;ctx.fill();stroke(5)}
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,70);stroke(4);ctx.restore();
  const L0=[[bx,by-90]],L1=[[bx-170,IY-30],[bx,IY-70],[bx+170,IY-30]],L2=[];for(let i=0;i<7;i++)L2.push([bx-330+i*110,IY-230-Math.abs(i-3)*-8-(i%2)*40]);
  const r0=eOB(prog(k,.45,.4),2);if(r0>0){dot(L0[0][0],L0[0][1],14*r0);softGlow(L0[0][0],L0[0][1],120,.5*r0)}
  const lv=(A,B,t1,map)=>{B.forEach((p,i)=>{const s=A[map(i)],q=eIO(prog(k,t1+i*.06,.4));if(q<=0)return;ctx.beginPath();ctx.moveTo(s[0],s[1]);ctx.lineTo(lerp(s[0],p[0],q),lerp(s[1],p[1],q));stroke(3,'rgba(142,59,70,.55)');const d=eOB(prog(k,t1+.35+i*.06,.35),2.5);if(d>0){dot(p[0],p[1],12*d);softGlow(p[0],p[1],90,.35*d)}})};
  lv(L0,L1,.85,()=>0);lv(L1,L2,1.35,i=>Math.min(2,Math.floor(i/2.4)));
  if(k>2){for(let r=0;r<2;r++){const q=((k-2)*.6+r/2)%1;ring(bx,IY-80,lerp(60,380,q),2,GOLD,.4*(1-q))}}}
 if(kind=='dua'){ // a tree grows (good offspring); soft waves rise from it up to a glowing arch, light comes back down
  const gx=CX,gy=IY+250;ctx.beginPath();ctx.moveTo(CX-300,gy);ctx.lineTo(CX+300,gy);stroke(3,'rgba(142,59,70,.4)');
  const g=prog(k,.15,1.0);if(g>0){const h=lerp(0,200,eO(g));ctx.beginPath();ctx.moveTo(gx,gy);ctx.lineTo(gx,gy-h);stroke(8,GOLD2);
   const c=eOB(prog(k,.6,.6),1.8);if(c>0){ctx.save();ctx.translate(gx,gy-h-60);ctx.scale(c,c);ctx.beginPath();ctx.arc(-55,20,62,0,7);ctx.arc(55,20,62,0,7);ctx.moveTo(70,-30);ctx.arc(0,-30,70,0,7);ctx.fillStyle='rgba(142,59,70,.12)';ctx.fill();
    ctx.beginPath();ctx.arc(-55,20,62,Math.PI*.5,Math.PI*1.45);ctx.arc(0,-30,70,Math.PI*1.1,Math.PI*1.9);ctx.arc(55,20,62,Math.PI*1.55,Math.PI*.5);ctx.closePath();stroke(6);ctx.restore()}}
  for(let i=0;i<4;i++){const q=prog(k,1.1+i*.28,1.1);if(q<=0||q>=1)continue;const y=lerp(IY-80,IY-260,eO(q));ctx.save();ctx.globalAlpha*=Math.sin(q*Math.PI);ctx.beginPath();ctx.arc(gx,y+80,lerp(60,150,q),Math.PI*1.2,Math.PI*1.8);stroke(5,GOLD);ctx.restore()}
  const ar=eOB(prog(k,1.6,.6),1.6);if(ar>0){ctx.save();ctx.translate(gx,IY-330);ctx.scale(ar,ar);ctx.beginPath();ctx.moveTo(-80,60);ctx.lineTo(-80,-10);ctx.arc(0,-10,80,Math.PI,0);ctx.lineTo(80,60);ctx.fillStyle='rgba(142,59,70,.1)';ctx.fill();stroke(7,GOLD2);ctx.restore();softGlow(gx,IY-340,220,.45*ar)}
  const dn=prog(k,2.3,1.2);if(dn>0){for(let i=0;i<5;i++){const q=(dn*1.4+i*.2)%1;if(dn*1.4<i*.2)continue;const x=gx+(i-2)*46,y=lerp(IY-270,IY-110,q);ctx.save();ctx.globalAlpha*=Math.sin(q*Math.PI)*.9;dot(x,y,6);ctx.restore()}}}
 ctx.restore()}
function item(it,t){if(t<it.t0-.05||t>it.t0+it.d+.05)return;const out=prog(t,it.t0+it.d-.32,.32);const a=1-eI(out);const dx=eI(out)*220;
 const inn=eO5(prog(t,it.t0,.45));ctx.save();ctx.translate(dx-(1-inn)*160,0);
 const nb=eOB(prog(t,it.t0+.05,.45),2.2);ctx.save();ctx.globalAlpha=a;ctx.translate(CX,230);ctx.scale(nb,nb);ctx.beginPath();ctx.arc(0,0,74,0,7);ctx.fillStyle=BONE;ctx.fill();ctx.beginPath();ctx.arc(0,0,74,-Math.PI/2,-Math.PI/2+Math.PI*2*eIO(prog(t,it.t0+.1,.6)));ctx.lineWidth=3;ctx.strokeStyle=GOLD;ctx.stroke();ctx.restore();
 word(it.n,CX,228,92,{...slam(t,it.t0+.12),a:slam(t,it.t0+.12).a*a,c:IVORY});
 icon(it.ic,t,it.t0,a);
 const r=reveal(t,it.t0+.55,.5);word(it.title,CX,1150,104,{...r,a:r.a*a,c:GOLD,glow:22});
 const nl=typed(it.txt,1290,70,t,it.t0+1.0,a);let py=1290+(nl-1)*70*1.45;
 pill('صحيح مسلم ١٦٣١',py+95,a*eO(prog(t,it.t0+1.5,.4)));ctx.restore()}
function hook(t){if(t>TI+.1)return;const e=eI(prog(t,2.6,.3));const o={a:1-e,blur:e*20,s:1+e*.15};
 const s1=slam(t,.15);word('لمّن الزول يموت…',CX,520,88,{...s1,...(e>0?o:{}),w:700});
 const s2=slam(t,.6);word('عملو كلو بيقيف',CX,690,124,{...s2,...(e>0?o:{}),c:GOLD,glow:30});
 const r=reveal(t,1.9,.5);word('إلا ٣ حاجات بتفضل شغّالة',CX,860,70,{...r,a:r.a*(1-e),w:500});
 const r2=reveal(t,2.2,.4);if(r2.a>0)pill('حديث في صحيح مسلم',990+r2.dy,r2.a*(1-e));
 // a line of deeds flowing; it is cut, the dots fall, three stay and glow
 ctx.save();ctx.globalAlpha=1-e;const y=1210,cut=prog(t,1.45,.9);const lp=eIO(prog(t,.9,.45));
 ctx.beginPath();ctx.moveTo(CX-300,y);ctx.lineTo(CX-300+600*lp,y);stroke(3,`rgba(142,59,70,${.35*(1-eO(cut))})`);
 if(cut>0&&cut<.6){const c=1-cut/.6;ctx.save();ctx.globalAlpha*=c;ctx.beginPath();ctx.moveTo(CX-40,y-60);ctx.lineTo(CX+40,y+60);stroke(5,GOLD2);ctx.restore()}
 const keep=[2,5,8];for(let i=0;i<11;i++){const x0=CX-300+i*60,x=((x0-CX+300+t*80)%600)+CX-300;if(lp<(x-CX+300)/600)continue;
  if(keep.includes(i)){const g=eO(prog(t,1.8,.5));const kx=lerp(x,CX+(keep.indexOf(i)-1)*150,g);dot(kx,y,lerp(9,22,g));if(g>.5)softGlow(kx,y,110,.4*g)}
  else{const f=eI(cut);ctx.save();ctx.globalAlpha*=1-f;dot(x,y+f*260,9);ctx.restore()}}
 ctx.restore()}
function intro(t){if(t<TI-.05||t>T0+.05)return;const k=t-TI;const out=prog(t,T0-.32,.32);const a=1-eI(out);ctx.save();ctx.translate(eI(out)*220,0);ctx.globalAlpha=a;
 // hourglass: sand runs, stops; three threads keep flowing out of it
 const hx=CX,hy=520;const dr=eIO(prog(k,.05,.5));ctx.save();ctx.translate(hx,hy);ctx.scale(dr,dr);
 ctx.beginPath();ctx.moveTo(-110,-170);ctx.lineTo(110,-170);ctx.lineTo(18,0);ctx.lineTo(110,170);ctx.lineTo(-110,170);ctx.lineTo(-18,0);ctx.closePath();ctx.fillStyle='rgba(142,59,70,.06)';ctx.fill();stroke(6);
 ctx.beginPath();ctx.moveTo(-140,-170);ctx.lineTo(140,-170);ctx.moveTo(-140,170);ctx.lineTo(140,170);stroke(8,GOLD2);
 const s=cl(prog(k,.3,.85));const top=lerp(110,0,s),bot=lerp(0,110,s);
 ctx.beginPath();ctx.moveTo(-top*.8,-160+ (110-top)*1.4);ctx.lineTo(top*.8,-160+(110-top)*1.4);ctx.lineTo(0,-10);ctx.closePath();if(top>2){ctx.fillStyle=GOLD2;ctx.fill()}
 ctx.beginPath();ctx.moveTo(-bot*.85,160);ctx.lineTo(bot*.85,160);ctx.lineTo(0,160-bot*1.0);ctx.closePath();ctx.fillStyle=GOLD2;ctx.fill();
 if(s>0&&s<1){ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(0,160-bot);stroke(3,GOLD2)}ctx.restore();
 if(k>1.15){const st=prog(k,1.15,.35);if(st<1)ring(hx,hy,lerp(60,260,eO(st)),3,GOLD,.6*(1-st))}
 for(let i=0;i<3;i++){const q=eIO(prog(k,1.3+i*.12,.6));if(q<=0)continue;const ex=hx+(i-1)*260;ctx.save();ctx.beginPath();ctx.moveTo(hx+(i-1)*60,hy+175);ctx.quadraticCurveTo(hx+(i-1)*80,hy+260,lerp(hx,ex,q),lerp(hy+175,hy+300,q));ctx.setLineDash([12,12]);ctx.lineDashOffset=-k*50;stroke(4,GOLD);ctx.restore();if(q>.95){dot(ex,hy+300,12);softGlow(ex,hy+300,90,.35)}}
 const r=reveal(t,TI+.9,.5);if(r.a>0){ctx.save();ctx.globalAlpha*=r.a;ctx.translate(0,r.dy);ctx.direction='rtl';ctx.textBaseline='middle';ctx.fillStyle=BONE;
  ctx.font='400 58px Am';const s1='قال رسول الله ';const w1=ctx.measureText(s1).width;ctx.font='64px Saw';const w2=ctx.measureText('ﷺ').width;ctx.font='400 58px Am';const w3=ctx.measureText(' :').width;const tot=w1+w2+w3;
  ctx.textAlign='right';ctx.fillText(s1,CX+tot/2,940);ctx.font='64px Saw';ctx.fillStyle=GOLD;ctx.fillText('ﷺ',CX+tot/2-w1,946);ctx.font='400 58px Am';ctx.fillStyle=BONE;ctx.fillText(' :',CX+tot/2-w1-w2,940);ctx.restore()}
 const lp=eIO(prog(k,.75,.5));ctx.beginPath();ctx.moveTo(CX-200*lp,1010);ctx.lineTo(CX+200*lp,1010);stroke(2,GOLD);
 const nl=typed(HAD,1100,76,t,TI+1.7,1);
 pill(SRC,1100+(nl-1)*76*1.45+105,eO(prog(t,TI+3.3,.4)));
 ctx.restore()}
function outro(t){if(t<OUT)return;const e=eI(prog(t,DUR-.45,.45));
 const r=reveal(t,OUT+.15,.5);word('ياتو واحدة بتبدأ بيها الليلة؟',CX,700,70,{...r,a:r.a*(1-e)});
 const r2=reveal(t,OUT+.55,.5);word('اكتب رقمها في التعليقات',CX,830,58,{...r2,a:r2.a*(1-e),w:500,c:GOLD});
 const r3=reveal(t,OUT+1.0,.5);if(r3.a>0)pill('احفظ الفيديو وشاركه مع زول محتاجه',980+r3.dy,r3.a*(1-e));
 const kk=prog(t,OUT+1.9,.6);if(kk>0){ctx.save();ctx.globalAlpha=eO(kk)*(1-e);const y=1300;ctx.font='700 54px In';ctx.textBaseline='middle';
  ctx.fillStyle=BONE;ctx.textAlign='right';ctx.fillText('20',CX-150,y-34);ctx.fillStyle=GOLD;ctx.fillText('26',CX-150,y+34);ctx.fillStyle=BONE;ctx.fillRect(CX-134,y-66,3,132*eIO(prog(t,OUT+2.0,.5)));
  ctx.textAlign='left';ctx.letterSpacing='6px';ctx.fillStyle=GOLD;ctx.fillText('CRAFTED BY',CX-112+30*(1-eO(kk)),y-34);ctx.fillStyle=BONE;ctx.fillText('@SU7AIB.7',CX-112+50*(1-eO(prog(t,OUT+1.95,.6))),y+34);ctx.restore()}}
function flash(t){for(const it of ITEMS){const p=prog(t,it.t0,.35);if(p>0&&p<1){ctx.save();ctx.globalAlpha=(1-p)*.12;ctx.fillStyle='#FFFFFF';ctx.fillRect(0,0,W,H);ctx.restore()}}}
function shake(t){const p=prog(t,.6,.35);if(p<=0||p>=1)return[0,0];const m=14*(1-p);return[Math.sin(t*90)*m,Math.cos(t*77)*m]}
function draw(t){ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';ctx.globalAlpha=1;ctx.letterSpacing='0px';bg(t);progressBar(t);const [sx,sy]=shake(t);ctx.save();ctx.translate(sx,110+sy);hook(t);intro(t);for(const it of ITEMS)item(it,t);outro(t);ctx.restore();flash(t);
 ctx.globalAlpha=.45;ctx.font='700 26px In';ctx.textAlign='center';ctx.fillStyle=BONE;ctx.letterSpacing='4px';if(t<OUT)ctx.fillText('@SU7AIB.7',CX,1800);ctx.letterSpacing='0px';ctx.globalAlpha=1;
 ctx.drawImage(GR[Math.floor(t*24)%4],0,0,W,H);const f=prog(t,DUR-.4,.4);if(f>0){ctx.globalAlpha=f;ctx.fillStyle=BG_OUT;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}}
window.render=t=>{draw(t);return cv.toDataURL('image/png')};
window.drawCover=()=>{ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';ctx.globalAlpha=1;bg(2);
 {const y=560;ctx.beginPath();ctx.moveTo(CX-330,y);ctx.lineTo(CX+330,y);stroke(3,'rgba(142,59,70,.25)');for(let i=0;i<3;i++){const x=CX+(i-1)*200;softGlow(x,y,130,.45);dot(x,y,26);ring(x,y,52,2.5,GOLD,.5);ring(x,y,80,2,GOLD,.25)}}
 word('لمّن الزول يموت…',CX,800,84);word('٣ أعمال',CX,975,150,{c:GOLD,glow:30});word('بتفضل شغّالة ليهو',CX,1145,80);
 pill('حديث في صحيح مسلم ١٦٣١',1300,1);ctx.drawImage(GR[0],0,0,W,H);return cv.toDataURL('image/png')};
