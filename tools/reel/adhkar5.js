// SU7IAB reel — "5 adhkar, light on the tongue" (Bukhari 6406, 6405, 6384; Muslim 2137, 2698). Listicle + cinematic light + particles + typing.
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
// ------------- content (verified: dorar mirrors + sunnah.com, Nov 2026)
const ITEMS=[
 {n:'١',title:'ثقيلتان في الميزان',txt:'«كلمتانِ خفيفتانِ على اللسانِ، ثقيلتانِ في الميزانِ، حبيبتانِ إلى الرحمنِ: سبحانَ اللهِ العظيمِ، سبحانَ اللهِ وبحمدِه»',src:'صحيح البخاري ٦٤٠٦',ic:'scale',d:4.5},
 {n:'٢',title:'مثل زَبَد البحر',txt:'«من قال: سبحانَ اللهِ وبحمدِه، في يومٍ مئةَ مرةٍ، حُطَّتْ خطاياه وإن كانت مثلَ زَبَدِ البحرِ»',src:'صحيح البخاري ٦٤٠٥',ic:'foam',d:4.4},
 {n:'٣',title:'كنزٌ من كنوز الجنة',txt:'«ألا أدلُّك على كلمةٍ هي كنزٌ من كنوزِ الجنةِ؟ لا حولَ ولا قوةَ إلا باللهِ»',src:'صحيح البخاري ٦٣٨٤',ic:'chest',d:4.1},
 {n:'٤',title:'أحبُّ الكلام إلى الله',txt:'«أحبُّ الكلامِ إلى اللهِ أربعٌ: سبحانَ اللهِ، والحمدُ للهِ، ولا إلهَ إلا اللهُ، واللهُ أكبرُ»',src:'صحيح مسلم ٢١٣٧',ic:'four',d:4.3},
 {n:'٥',title:'ألف حسنة كل يوم',txt:'«أيعجزُ أحدُكم أن يكسبَ كلَّ يومٍ ألفَ حسنةٍ؟… يسبِّحُ مئةَ تسبيحةٍ، فيُكتَبُ له ألفُ حسنةٍ»',src:'صحيح مسلم ٢٦٩٨',ic:'beads',d:4.6}];
const T0=2.9;let acc=T0;for(const it of ITEMS){it.t0=acc;acc+=it.d}const OUT=acc,DUR=OUT+3.4;window.DUR=DUR;
const KW=.085; // seconds per typed word
// ------------- SFX
window.SFX=[[0,'room'],[0.2,'impact_s'],[0.55,'impact'],[1.3,'air'],[2.65,'whoosh']];
for(const [i,it] of ITEMS.entries()){SFX.push([it.t0,'sub_soft'],[it.t0+.05,'tick']);
 const ws=it.txt.split(' ').length;for(let k=0;k<ws;k++)SFX.push([it.t0+.95+k*KW,'key']);
 if(it.ic=='scale')SFX.push([it.t0+.35,'swell'],[it.t0+1.05,'impact_s']);
 if(it.ic=='foam')SFX.push([it.t0+.3,'air'],[it.t0+1.1,'plip'],[it.t0+1.3,'plip'],[it.t0+1.5,'plip']);
 if(it.ic=='chest')SFX.push([it.t0+.4,'riser_s'],[it.t0+.9,'bloom']);
 if(it.ic=='four')SFX.push([it.t0+.3,'tick'],[it.t0+.45,'tick'],[it.t0+.6,'tick'],[it.t0+.75,'tick'],[it.t0+1.1,'sub_soft']);
 if(it.ic=='beads')SFX.push([it.t0+.3,'ticks'],[it.t0+1.6,'bloom']);
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
 if(kind=='scale'){ // balance: two light words drop into the right pan, it sinks heavily
  const tilt=eOB(prog(k,1.0,.7),1.6)*0.26+Math.sin(t*2)*.008;const by=IY-120;
  ctx.beginPath();ctx.moveTo(CX,by-40);ctx.lineTo(CX,IY+170);stroke(6);ctx.beginPath();ctx.moveTo(CX-90,IY+170);ctx.lineTo(CX+90,IY+170);stroke(7);
  ctx.beginPath();ctx.arc(CX,by-52,12,0,7);ctx.fillStyle=GOLD;ctx.fill();
  ctx.save();ctx.translate(CX,by);ctx.rotate(tilt);ctx.beginPath();ctx.moveTo(-250,0);ctx.lineTo(250,0);stroke(6);ctx.restore();
  for(const sd of[-1,1]){const px=CX+sd*250*Math.cos(tilt),py=by+sd*250*Math.sin(tilt);
   ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px-70,py+130);ctx.moveTo(px,py);ctx.lineTo(px+70,py+130);stroke(2.5,'rgba(142,59,70,.7)');
   ctx.beginPath();ctx.moveTo(px-95,py+130);ctx.quadraticCurveTo(px,py+190,px+95,py+130);ctx.closePath();ctx.fillStyle='rgba(142,59,70,.08)';ctx.fill();stroke(5);
   if(sd==1){const f=eI(prog(k,.55,.45));for(let j=0;j<2;j++){const dy=lerp(-320,0,eI(prog(k,.55+j*.12,.42)));const p=prog(k,.55+j*.12,.42);if(p<=0)continue;
     ctx.beginPath();ctx.roundRect(px-60+j*62,py+82+dy-j*0,56,40,10);ctx.fillStyle=GOLD2;ctx.fill()}
    const g=prog(k,1.05,1);if(g>0){softGlow(px,py+120,170,.5*(1-g*.5));ring(px,py+130,lerp(30,200,eO(g)),2,GOLD,.6*(1-g))}}}}
 if(kind=='foam'){ // foam bubbles over waves, popping away one by one
  for(let w=0;w<3;w++){ctx.beginPath();for(let x=-320;x<=320;x+=8){const y=IY+90+w*45+Math.sin(x/60+t*2.4+w)*14;x==-320?ctx.moveTo(CX+x,y):ctx.lineTo(CX+x,y)}stroke(4-w,`rgba(142,59,70,${.9-w*.25})`)}
  const r=rng(9);for(let i=0;i<26;i++){const bx=CX+(r()-.5)*560,byy=IY+60-r()*300,rad=12+r()*30,born=.15+r()*.4,pop=1.0+i*.11;
   const g=eOB(prog(k,born,.35),2);const pp=prog(k,pop,.22);if(g<=0)continue;
   if(pp<=0){ctx.beginPath();ctx.arc(bx,byy+Math.sin(t*3+i)*5,rad*g,0,7);ctx.fillStyle='rgba(142,59,70,.07)';ctx.fill();stroke(3)}
   else if(pp<1){ring(bx,byy,rad*(1+pp*.9),2,GOLD,1-pp);for(let q=0;q<5;q++){const an=q*1.256+i;ctx.globalAlpha=a*(1-pp);ctx.beginPath();ctx.arc(bx+Math.cos(an)*rad*(1+pp*1.4),byy+Math.sin(an)*rad*(1+pp*1.4),3,0,7);ctx.fillStyle=GOLD;ctx.fill();ctx.globalAlpha=a}}}}
 if(kind=='chest'){ // treasure chest: lid opens, light pours out
  const op=eOB(prog(k,.6,.6),1.4);const cy=IY+40;
  if(op>0){softGlow(CX,cy-40,300,.55*op);for(let i=0;i<7;i++){const an=-Math.PI/2+(i-3)*.22;ctx.save();ctx.globalAlpha*=.5*op;ctx.beginPath();ctx.moveTo(CX+Math.cos(an)*60,cy-30+Math.sin(an)*20);ctx.lineTo(CX+Math.cos(an)*lerp(60,330,op),cy-30+Math.sin(an)*lerp(20,330,op));stroke(4,GOLD2);ctx.restore()}}
  ctx.beginPath();ctx.roundRect(CX-170,cy-30,340,190,18);ctx.fillStyle='rgba(142,59,70,.08)';ctx.fill();stroke(6);
  ctx.beginPath();ctx.moveTo(CX-170,cy+40);ctx.lineTo(CX+170,cy+40);stroke(4);ctx.beginPath();ctx.roundRect(CX-26,cy+10,52,64,10);ctx.fillStyle=GOLD;ctx.fill();
  ctx.beginPath();ctx.arc(CX,cy+38,8,0,7);ctx.fillStyle=IVORY;ctx.fill();
  ctx.save();ctx.translate(CX-170,cy-30);ctx.rotate(-op*.95);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-50);ctx.quadraticCurveTo(170,-130,340,-50);ctx.lineTo(340,0);ctx.closePath();ctx.fillStyle='rgba(142,59,70,.1)';ctx.fill();stroke(6);ctx.restore();
  if(op>0){const r=rng(5);for(let i=0;i<12;i++){const p=prog(k,.8+r()*.6,1.1);if(p<=0||p>=1)continue;const x=CX+(r()-.5)*240,y=cy-40-eO(p)*300;ctx.globalAlpha=a*(1-p);ctx.beginPath();ctx.arc(x,y,4+r()*4,0,7);ctx.fillStyle=GOLD2;ctx.fill();ctx.globalAlpha=a}}}
 if(kind=='four'){ // four marks arrive one by one and join into a glowing ring
  const join=eIO(prog(k,1.1,.6));const R=lerp(200,150,join);
  for(let i=0;i<4;i++){const p=eOB(prog(k,.3+i*.15,.35),2.4);if(p<=0)continue;const an=-Math.PI/2+i*Math.PI/2+join*Math.PI/4;const x=CX+Math.cos(an)*R,y=IY+Math.sin(an)*R;
   softGlow(x,y,90,.3*p);ctx.beginPath();ctx.arc(x,y,lerp(0,44,p),0,7);ctx.fillStyle=BONE;ctx.fill();ctx.beginPath();ctx.arc(x,y,lerp(0,16,p),0,7);ctx.fillStyle=IVORY;ctx.fill()}
  if(join>0){ctx.beginPath();ctx.arc(CX,IY,150,-Math.PI/2,-Math.PI/2+Math.PI*2*join);ctx.setLineDash([2,14]);stroke(5,GOLD2);ctx.setLineDash([]);
   const br=1+.03*Math.sin(t*3);ctx.save();ctx.translate(CX,IY);ctx.scale(br*join,br*join);ctx.beginPath();// heart
   ctx.moveTo(0,40);ctx.bezierCurveTo(-90,-20,-50,-90,0,-45);ctx.bezierCurveTo(50,-90,90,-20,0,40);ctx.fillStyle=GOLD2;ctx.fill();ctx.restore();
   ring(CX,IY,lerp(150,320,prog(k,1.7,1)),2,GOLD,.6*(1-prog(k,1.7,1)))}}
 if(kind=='beads'){ // tasbih: 33 beads light up around a ring, counter climbs to 1000
  const N=33,R=210,c=prog(k,.3,1.3);
  for(let i=0;i<N;i++){const an=-Math.PI/2-i*Math.PI*2/N;const x=CX+Math.cos(an)*R,y=IY+Math.sin(an)*R;const on=c*N>i;
   ctx.beginPath();ctx.arc(x,y,on?14:11,0,7);ctx.fillStyle=on?GOLD2:'rgba(142,59,70,.25)';ctx.fill()}
  ctx.beginPath();ctx.arc(CX,IY+R,22,0,7);ctx.fillStyle=BONE;ctx.fill();ctx.beginPath();ctx.moveTo(CX,IY+R+22);ctx.lineTo(CX,IY+R+42);stroke(6);
  const num=Math.round(1000*eIO(prog(k,.3,1.4)));const pop=eOB(prog(k,1.7,.4),2.5);
  if(pop>0)softGlow(CX,IY,200,.4*pop);
  word(num.toLocaleString('en-US').replace(/,/g,''),CX,IY-6,lerp(96,120,pop),{f:'In',w:700,c:GOLD2});
  word('حسنة',CX,IY+78,46,{a:eO(prog(k,1.6,.4)),w:700})}
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
 pill(it.src,1230+(nl-1)*56*1.45+80,a*eO(prog(t,it.t0+1.3,.4)));ctx.restore()}
function hook(t){if(t>T0+.1)return;const e=eI(prog(t,2.6,.3));const o={a:1-e,blur:e*20,s:1+e*.15};
 const s1=slam(t,.2);word('٥ أذكار',CX,700,190,{...s1,...(e>0?o:{}),c:GOLD,glow:30});
 const s2=slam(t,.55);word('خفيفة… وأجرها عظيم',CX,900,104,{...s2,...(e>0?o:{})});
 const r=reveal(t,1.3,.5);word('كم واحد منها بتقولو كل يوم؟',CX,1100,62,{...r,a:r.a*(1-e),w:500});
 const r2=reveal(t,1.7,.5);if(r2.a>0)pill('من صحيح البخاري ومسلم',1240+r2.dy,r2.a*(1-e));
 // five dots preview
 for(let i=0;i<5;i++){const p=eOB(prog(t,1.0+i*.08,.35),2.4);ring(CX+(2-i)*70,1420,14*p,3,GOLD,(1-e)*p);}}
function outro(t){if(t<OUT)return;const k=t-OUT;const e=eI(prog(t,DUR-.45,.45));
 const r=reveal(t,OUT+.15,.5);word('كم ذكر منها بتقولو كل يوم؟',CX,700,76,{...r,a:r.a*(1-e)});
 const r2=reveal(t,OUT+.55,.5);word('اكتب الرقم في التعليقات',CX,830,58,{...r2,a:r2.a*(1-e),w:500,c:GOLD});
 const r3=reveal(t,OUT+1.0,.5);if(r3.a>0)pill('احفظ الفيديو وشاركه مع زول تحبّو',980+r3.dy,r3.a*(1-e));
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
 word('٥ أذكار',CX,640,200,{c:GOLD,glow:30});word('خفيفة… وأجرها عظيم',CX,850,104);word('كم واحد منها بتقولو كل يوم؟',CX,1040,62,{w:500});
 for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(CX+(2-i)*80,1230,16,0,7);ctx.fillStyle=i==0?GOLD2:'rgba(142,59,70,.4)';ctx.fill()}softGlow(CX+160,1230,90,.6);
 pill('من صحيح البخاري ومسلم',1400,1);ctx.drawImage(GR[0],0,0,W,H);return cv.toDataURL('image/png')};
