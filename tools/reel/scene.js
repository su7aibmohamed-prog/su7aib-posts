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
// ------------- content: Muslim 2699 (Abu Huraira). Verified Nov 25 2026 via sunnah.com muslim:2699a (search-matched text+translation), hadeethenc 4801; dorar.net fetch unavailable.
// "الجزاء من جنس العمل" — Ibn Rajab, Jami' al-Ulum wal-Hikam (sharh of this hadith).
const ITEMS=[
 {n:'١',title:'تفرّج كربة',txt:'«مَن نفَّسَ عن مؤمنٍ كُرْبةً من كُرَبِ الدنيا، نفَّسَ اللهُ عنه كُرْبةً من كُرَبِ يومِ القيامة»',ic:'relief',d:4.2},
 {n:'٢',title:'تيسّر على معسر',txt:'«ومَن يسَّرَ على مُعْسِرٍ، يسَّرَ اللهُ عليه في الدنيا والآخرة»',ic:'ease',d:3.8},
 {n:'٣',title:'تستر أخوك',txt:'«ومَن سَتَرَ مسلماً، سَتَرَه اللهُ في الدنيا والآخرة»',ic:'cover',d:3.6},
 {n:'٤',title:'تعين أخوك',txt:'«واللهُ في عَوْنِ العبدِ ما كان العبدُ في عَوْنِ أخيه»',ic:'help',d:3.8},
 {n:'٥',title:'تطلب العلم',txt:'«ومَن سلَكَ طريقاً يلتمسُ فيه عِلْماً، سهَّلَ اللهُ له به طريقاً إلى الجنة»',ic:'path',d:4.2}];
const SRC='عن أبي هريرة · صحيح مسلم ٢٦٩٩';
const TI=2.9,DI=2.4,T0=TI+DI;let acc=T0;for(const it of ITEMS){it.t0=acc;acc+=it.d}const OUT=acc,DUR=OUT+3.0;window.DUR=DUR;
const KW=.085;
// ------------- SFX
window.SFX=[[0,'room'],[0.15,'impact_s'],[0.6,'impact'],[1.3,'air'],[1.9,'tick'],[2.6,'whoosh'],
 [TI,'sub_soft'],[TI+.1,'swell'],[TI+.35,'line'],[TI+.9,'tick'],[TI+1.4,'impact_s'],[TI+1.45,'bloom'],[T0-.3,'whoosh']];
for(const it of ITEMS){SFX.push([it.t0,'sub_soft'],[it.t0+.05,'tick']);
 const ws=it.txt.split(' ').length;for(let k=0;k<ws;k++)SFX.push([it.t0+.95+k*KW,'key']);
 if(it.ic=='relief')SFX.push([it.t0+.25,'sub'],[it.t0+.8,'reverse'],[it.t0+1.25,'bloom']);
 if(it.ic=='ease')SFX.push([it.t0+.3,'ticks'],[it.t0+.75,'stretch'],[it.t0+1.2,'plip'],[it.t0+1.3,'bloom']);
 if(it.ic=='cover')SFX.push([it.t0+.3,'plip'],[it.t0+.7,'air'],[it.t0+1.2,'swell'],[it.t0+1.5,'bloom']);
 if(it.ic=='help')SFX.push([it.t0+.3,'line'],[it.t0+.75,'impact_s'],[it.t0+1.1,'riser_s'],[it.t0+1.5,'bloom']);
 if(it.ic=='path')SFX.push([it.t0+.3,'air'],[it.t0+.6,'line'],[it.t0+1.4,'swell'],[it.t0+1.7,'bloom']);
 if(it!==ITEMS[ITEMS.length-1])SFX.push([it.t0+it.d-.3,'whoosh'])}
SFX.push([OUT-.3,'whoosh'],[OUT+.2,'air'],[OUT+1.0,'air'],[OUT+2.0,'sub_soft'],[OUT+2.05,'line']);
const IY=780;
function icon(kind,t,t0,a){const k=t-t0;ctx.save();ctx.globalAlpha*=a;const ent=eOB(prog(t,t0+.15,.5),2);ctx.translate(CX,IY);ctx.scale(ent,ent);ctx.translate(-CX,-IY);
 softGlow(CX,IY,260,.18);
 if(kind=='relief'){ // a heavy block presses a circle flat; it lifts away and the circle breathes free
  const lift=eIO(prog(k,.8,.6));const press=eO(prog(k,.15,.4))*(1-lift);
  const by=lerp(IY-330,IY-95,eO(prog(k,.15,.35)))-lift*260;const jx=press>.5&&lift<.05?Math.sin(t*70)*3:0;
  const sq=lerp(1,.62,press),br=1+(lift>.9?.02*Math.sin(t*3):0);
  ctx.save();ctx.translate(CX,IY+120);ctx.scale((2-sq)*br,sq*br);ctx.translate(0,-80);ctx.beginPath();ctx.arc(0,0,80,0,7);ctx.fillStyle='rgba(142,59,70,.1)';ctx.fill();stroke(6);ctx.restore();
  ctx.save();ctx.globalAlpha*=1-eI(prog(k,1.1,.4));ctx.translate(CX+jx,by);ctx.beginPath();ctx.roundRect(-150,-70,300,140,12);ctx.fillStyle=GOLD2;ctx.fill();
  ctx.font='700 46px Am';ctx.fillStyle=IVORY;ctx.textAlign='center';ctx.textBaseline='middle';ctx.direction='rtl';ctx.fillText('كُربة',0,2);ctx.restore();
  const g=prog(k,1.2,1.3);if(g>0){for(let r=0;r<3;r++){const q=prog(k,1.2+r*.25,1.1);if(q>0)ring(CX,IY+40,lerp(90,360,eO(q)),2.5,GOLD,.55*(1-q))}softGlow(CX,IY+40,240,.5*(1-g*.5))}}
 if(kind=='ease'){ // jagged steep steps smooth into a gentle ramp; a ball rolls up it
  const m=eIO(prog(k,.55,.6));const x0=CX-340,x1=CX+340,y0=IY+200,y1=IY-120;
  const dr=eIO(prog(k,.1,.45));ctx.save();ctx.beginPath();ctx.rect(x0-20,y1-300,(x1-x0+40)*dr,800);ctx.clip();ctx.beginPath();
  const N=6;for(let i=0;i<=N;i++){const sx=lerp(x1,x0,i/N),sy=lerp(y0,y1,i/N);const nx=lerp(x1,x0,(i+1)/N);
   const pts=[[sx,sy],[sx,lerp(sy,lerp(y0,y1,(i+1)/N),1)]];// step corner
   if(i==0)ctx.moveTo(sx,sy);if(i<N){const ny=lerp(y0,y1,(i+1)/N);const cx=lerp(sx,sx,m),cy=lerp(ny,sy,m);ctx.lineTo(lerp(sx,sx+(nx-sx)*.5,m),lerp(ny,(sy+ny)/2,m));ctx.lineTo(nx,ny)}}
  ctx.lineTo(x0,y0);ctx.lineTo(x1,y0);ctx.closePath();ctx.fillStyle='rgba(142,59,70,.08)';ctx.fill();stroke(6);ctx.restore();
  const bp=eIO(prog(k,1.15,1.1));if(k>1.05){const bx=lerp(x1-40,x0+60,bp),byy=lerp(y0,y1,(x1-40-bx)/(x1-x0))-36;ctx.save();ctx.translate(bx,byy);ctx.rotate(-bp*9);ctx.beginPath();ctx.arc(0,0,30,0,7);ctx.fillStyle=GOLD2;ctx.fill();ctx.beginPath();ctx.moveTo(0,-30);ctx.lineTo(0,30);ctx.strokeStyle=IVORY;ctx.lineWidth=4;ctx.stroke();ctx.restore();if(bp>.95)softGlow(bx,byy,160,.5)}}
 if(kind=='cover'){ // a small crack on a circle; a soft veil arcs over it, then a larger dome covers all
  const cy=IY+90;ctx.beginPath();ctx.arc(CX,cy,90,0,7);ctx.fillStyle='rgba(142,59,70,.1)';ctx.fill();stroke(6);
  const ck=eO(prog(k,.25,.25));if(ck>0){ctx.save();ctx.globalAlpha*=1-eIO(prog(k,.8,.4));ctx.beginPath();ctx.moveTo(CX-25,cy-60);ctx.lineTo(CX-25+20*ck,cy-30);ctx.lineTo(CX-25+5*ck,cy);ctx.lineTo(CX-25+30*ck,cy+30*ck);stroke(4,GOLD2);ctx.restore()}
  const v=eIO(prog(k,.55,.5));if(v>0){ctx.save();ctx.beginPath();ctx.arc(CX,cy,150,Math.PI,Math.PI+Math.PI*v);ctx.lineTo(CX,cy);ctx.closePath();ctx.fillStyle='rgba(142,59,70,.12)';ctx.fill();ctx.beginPath();ctx.arc(CX,cy,150,Math.PI,Math.PI+Math.PI*v);stroke(6);ctx.restore()}
  const d=eOB(prog(k,1.1,.6),1.4);if(d>0){ctx.save();ctx.beginPath();ctx.arc(CX,cy+60,lerp(150,300,d),Math.PI,0);stroke(5,GOLD2);ctx.restore();ctx.beginPath();ctx.moveTo(CX-330,cy+60);ctx.lineTo(CX+330,cy+60);stroke(3,'rgba(142,59,70,.4)');softGlow(CX,cy-60,280,.4*d)}}
 if(kind=='help'){ // one circle lifts another; a great arc from above holds them both up
  const by=IY+200;const up=eOB(prog(k,.55,.5),1.6);
  const s1=[CX+90,by-80],s2x=CX-90,s2y=lerp(by-80,by-210,up);
  ctx.beginPath();ctx.moveTo(CX-360,by);ctx.lineTo(CX+360,by);stroke(3,'rgba(142,59,70,.4)');
  ctx.beginPath();ctx.arc(s1[0],s1[1],70,0,7);ctx.fillStyle='rgba(142,59,70,.1)';ctx.fill();stroke(6);
  const ar=eIO(prog(k,.25,.35));if(ar>0){ctx.beginPath();ctx.moveTo(s1[0]-60,s1[1]-20);ctx.quadraticCurveTo(CX,s1[1]-30,lerp(s1[0]-60,s2x+40,ar),lerp(s1[1]-20,s2y+50,ar));stroke(6,GOLD2)}
  ctx.beginPath();ctx.arc(s2x,s2y,70,0,7);ctx.fillStyle='rgba(142,59,70,.1)';ctx.fill();stroke(6);
  const h=eIO(prog(k,1.1,.7));if(h>0){const y=lerp(IY-560,IY-260,eO(h));ctx.save();ctx.beginPath();ctx.arc(CX,y+330,380,Math.PI*1.15,Math.PI*1.85);stroke(8,GOLD2);ctx.restore();softGlow(CX,IY-60,320,.35*h);
   for(let i=0;i<3;i++){const q=prog(k,1.5+i*.15,.6);if(q<=0)continue;const x=CX+(i-1)*150;const yy=IY+40-eO(q)*60;ctx.save();ctx.globalAlpha*=(1-q)*.8+.2;ctx.beginPath();ctx.moveTo(x-16,yy+10);ctx.lineTo(x,yy-8);ctx.lineTo(x+16,yy+10);stroke(5,GOLD);ctx.restore()}}}
 if(kind=='path'){ // an open book; a path rises from its pages toward a glowing arch (gate)
  const bx=CX,by=IY+120;const op=eOB(prog(k,.15,.5),1.5);
  ctx.save();ctx.translate(bx,by);for(const sd of[-1,1]){ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(sd*80*op,-30*op,sd*170*op,-10*op);ctx.lineTo(sd*170*op,60);ctx.quadraticCurveTo(sd*80*op,40,0,70);ctx.closePath();ctx.fillStyle=BG_IN;ctx.fill();stroke(5)}
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,70);stroke(4);ctx.restore();
  const pr=eIO(prog(k,.55,.9));if(pr>0){const pt=s=>[bx+Math.sin(s*Math.PI*1.6)*110*(1-s),lerp(by-20,IY-150,s)];ctx.save();ctx.setLineDash([16,16]);ctx.beginPath();for(let i=0;i<=40*pr;i++){const [x,y]=pt(i/40);i?ctx.lineTo(x,y):ctx.moveTo(x,y)}stroke(6,GOLD2);ctx.setLineDash([]);ctx.restore();
   const [hx,hy]=pt(pr);dot(hx,hy,12)}
  const gt=eOB(prog(k,1.3,.6),1.8);if(gt>0){ctx.save();ctx.translate(bx,IY-200);ctx.scale(gt,gt);ctx.beginPath();ctx.moveTo(-80,70);ctx.lineTo(-80,-20);ctx.arc(0,-20,80,Math.PI,0);ctx.lineTo(80,70);ctx.fillStyle='rgba(142,59,70,.1)';ctx.fill();stroke(7,GOLD2);ctx.restore();
   const g=prog(k,1.6,1.2);softGlow(bx,IY-210,240,.3+.3*g);for(let r=0;r<2;r++){const q=prog(k,1.6+r*.35,1);if(q>0)ring(bx,IY-210,lerp(60,240,eO(q)),2.5,GOLD,.5*(1-q))}}}
 ctx.restore()}
function item(it,t){if(t<it.t0-.05||t>it.t0+it.d+.05)return;const out=prog(t,it.t0+it.d-.32,.32);const a=1-eI(out);const dx=eI(out)*220;
 const inn=eO5(prog(t,it.t0,.45));ctx.save();ctx.translate(dx-(1-inn)*160,0);
 const nb=eOB(prog(t,it.t0+.05,.45),2.2);ctx.save();ctx.globalAlpha=a;ctx.translate(CX,330);ctx.scale(nb,nb);ctx.beginPath();ctx.arc(0,0,74,0,7);ctx.fillStyle=BONE;ctx.fill();ctx.beginPath();ctx.arc(0,0,74,-Math.PI/2,-Math.PI/2+Math.PI*2*eIO(prog(t,it.t0+.1,.6)));ctx.lineWidth=3;ctx.strokeStyle=GOLD;ctx.stroke();ctx.restore();
 word(it.n,CX,328,92,{...slam(t,it.t0+.12),a:slam(t,it.t0+.12).a*a,c:IVORY});
 icon(it.ic,t,it.t0,a);
 const r=reveal(t,it.t0+.55,.5);word(it.title,CX,1100,100,{...r,a:r.a*a,c:GOLD,glow:22});
 const nl=typed(it.txt,1240,56,t,it.t0+.95,a);let py=1240+(nl-1)*56*1.45;
 pill('صحيح مسلم ٢٦٩٩',py+85,a*eO(prog(t,it.t0+1.4,.4)));ctx.restore()}
function hook(t){if(t>TI+.1)return;const e=eI(prog(t,2.6,.3));const o={a:1-e,blur:e*20,s:1+e*.15};
 const s1=slam(t,.15);word('أي خير بتعملو لأخوك',CX,560,88,{...s1,...(e>0?o:{}),w:700});
 const s2=slam(t,.6);word('الله برجّعو ليك',CX,730,128,{...s2,...(e>0?o:{}),c:GOLD,glow:30});
 const r=reveal(t,1.3,.5);word('بنفس نوعو… وأكبر',CX,900,70,{...r,a:r.a*(1-e),w:500});
 const r2=reveal(t,1.9,.5);if(r2.a>0)pill('٥ أعمال في حديث واحد',1040+r2.dy,r2.a*(1-e));
 // mirror: a dot goes out, a bigger one returns
 const go=eIO(prog(t,.9,.5)),back=eIO(prog(t,1.45,.5));ctx.save();ctx.globalAlpha=1-e;
 ctx.beginPath();ctx.moveTo(CX-240,1220);ctx.lineTo(CX+240,1220);stroke(3,'rgba(142,59,70,.35)');
 if(go>0&&back<=0)dot(lerp(CX+240,CX-240,go),1220,12);if(back>0){const x=lerp(CX-240,CX+240,back);dot(x,1220,lerp(12,30,back));if(back>.95)softGlow(x,1220,140,.5)}
 ctx.restore()}
function intro(t){if(t<TI-.05||t>T0+.05)return;const k=t-TI;const out=prog(t,T0-.32,.32);const a=1-eI(out);ctx.save();ctx.translate(eI(out)*220,0);ctx.globalAlpha=a;
 // balance: deed ↔ reward, settles level
 const cy=640;const dr=eIO(prog(k,.1,.5));ctx.beginPath();ctx.moveTo(CX,cy+200);ctx.lineTo(CX,cy+200-220*dr);stroke(6);
 const st=prog(k,.6,1.2);const ang=k<.6?-.25*eO(prog(k,.3,.3)):-.25*Math.exp(-4*st)*Math.cos(st*11);
 if(dr>.9){ctx.save();ctx.translate(CX,cy-20);ctx.rotate(ang);ctx.beginPath();ctx.moveTo(-260,0);ctx.lineTo(260,0);stroke(6);
  for(const [sd,lb] of[[1,'عملك'],[-1,'جزاؤك']]){ctx.save();ctx.translate(sd*260,0);ctx.rotate(-ang);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-60,110);ctx.moveTo(0,0);ctx.lineTo(60,110);stroke(3,'rgba(142,59,70,.6)');
   ctx.beginPath();ctx.ellipse(0,115,85,20,0,0,Math.PI);ctx.fillStyle='rgba(142,59,70,.12)';ctx.fill();stroke(5);word(lb,0,80,44,{a:eO(prog(k,.5,.4)),c:GOLD2});ctx.restore()}
  ctx.restore();dot(CX,cy-20,12)}
 if(st>.85)softGlow(CX,cy+40,320,.3*eO(prog(k,1.5,.5)));
 const r0=reveal(t,TI+1.35,.5);word('الجزاء من جنس العمل',CX,920,84,{...r0,c:GOLD,glow:24});
 const lp=eIO(prog(k,.35,.5));ctx.beginPath();ctx.moveTo(CX-200*lp,1010);ctx.lineTo(CX+200*lp,1010);stroke(2,GOLD);
 const r=reveal(t,TI+.6,.5);if(r.a>0){ctx.save();ctx.globalAlpha*=r.a;ctx.translate(0,r.dy);ctx.direction='rtl';ctx.textBaseline='middle';ctx.fillStyle=BONE;
  ctx.font='400 58px Am';const s1='قال رسول الله ';const w1=ctx.measureText(s1).width;ctx.font='64px Saw';const w2=ctx.measureText('ﷺ').width;ctx.font='400 58px Am';const w3=ctx.measureText(' :').width;const tot=w1+w2+w3;
  ctx.textAlign='right';ctx.fillText(s1,CX+tot/2,1100);ctx.font='64px Saw';ctx.fillStyle=GOLD;ctx.fillText('ﷺ',CX+tot/2-w1,1106);ctx.font='400 58px Am';ctx.fillStyle=BONE;ctx.fillText(' :',CX+tot/2-w1-w2,1100);ctx.restore()}
 pill(SRC,1220,eO(prog(t,TI+1.7,.4)));
 ctx.restore()}
function outro(t){if(t<OUT)return;const e=eI(prog(t,DUR-.45,.45));
 const r=reveal(t,OUT+.15,.5);word('أنو واحد فيهم حتعملو الليلة؟',CX,700,70,{...r,a:r.a*(1-e)});
 const r2=reveal(t,OUT+.55,.5);word('اكتب رقمو في التعليقات',CX,830,58,{...r2,a:r2.a*(1-e),w:500,c:GOLD});
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
 ctx.save();ctx.translate(0,-170);{const cy=640;ctx.beginPath();ctx.moveTo(CX,cy+200);ctx.lineTo(CX,cy-20);stroke(6);ctx.beginPath();ctx.moveTo(CX-260,cy-20);ctx.lineTo(CX+260,cy-20);stroke(6);
  for(const [sd,lb] of[[1,'عملك'],[-1,'جزاؤك']]){ctx.save();ctx.translate(CX+sd*260,cy-20);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-60,110);ctx.moveTo(0,0);ctx.lineTo(60,110);stroke(3,'rgba(142,59,70,.6)');ctx.beginPath();ctx.ellipse(0,115,85,20,0,0,Math.PI);ctx.fillStyle='rgba(142,59,70,.12)';ctx.fill();stroke(5);word(lb,0,80,44,{c:GOLD2});ctx.restore()}dot(CX,cy-20,12);softGlow(CX,cy+40,320,.3)}ctx.restore();
 word('أي خير بتعملو لأخوك',CX,830,84);word('الله برجّعو ليك',CX,1000,130,{c:GOLD,glow:30});word('بنفس نوعو… وأكبر',CX,1160,66,{w:500});
 pill('٥ أعمال في صحيح مسلم',1320,1);ctx.drawImage(GR[0],0,0,W,H);return cv.toDataURL('image/png')};
