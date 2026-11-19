// SU7IAB kinetic typography — hadith al-rifq (Bukhari 6024). 1080x1920 units, deterministic draw(t)
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
const W=1080,H=1920,CX=540,DUR=20;
const BG='#791C2E',BG_IN='#8B2437',BG_OUT='#4E0F1C',BONE='#F8F6EF',GOLD='#E6C79C',GOLD2='#F3DDB8';
const cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),lerp=(a,b,k)=>a+(b-a)*k,prog=(t,a,d)=>cl((t-a)/d);
const eIO=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const eO=x=>{x=cl(x);return 1-Math.pow(1-x,3)};
const eO5=x=>{x=cl(x);return 1-Math.pow(1-x,5)};
const eI=x=>{x=cl(x);return x*x*x};
const eOB=(x,s=1.70158)=>{x=cl(x);return 1+(s+1)*Math.pow(x-1,3)+s*Math.pow(x-1,2)};
const eIB=x=>{x=cl(x);const s=1.70158;return (s+1)*x*x*x-s*x*x};
function rng(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
// ---------- grain
const GR=[];{for(let k=0;k<4;k++){const g=document.createElement('canvas');g.width=540;g.height=960;const gx=g.getContext('2d'),im=gx.createImageData(540,960),r=rng(77+k);for(let i=0;i<im.data.length;i+=4){const v=r()*255;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=14}gx.putImageData(im,0,0);GR.push(g)}}
// ---------- text helpers
function seg(parts,x,y,al='center'){ // parts:[[str,font,color]] RTL; x anchor
 ctx.save();ctx.direction='rtl';ctx.textBaseline='alphabetic';let ws=parts.map(p=>{ctx.font=p[1];return ctx.measureText(p[0]).width});
 const tot=ws.reduce((a,b)=>a+b,0);let xr=al=='center'?x+tot/2:x;ctx.textAlign='right';
 parts.forEach((p,i)=>{ctx.font=p[1];ctx.fillStyle=p[2];ctx.fillText(p[0],xr,y);xr-=ws[i]});ctx.restore();return tot}
function word(str,x,y,size,o={}){const a=o.a??1;if(a<=0.003)return;ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y+(o.dy||0));const s=o.s??1;ctx.scale(s*(o.sx||1),s*(o.sy||1));ctx.rotate(o.rot||0);
 if(o.blur>0.2)ctx.filter=`blur(${o.blur}px)`;if(o.glow){ctx.shadowColor=o.glowC||'rgba(230,199,156,.55)';ctx.shadowBlur=o.glow}
 ctx.font=`${o.w||700} ${size}px ${o.f||'Am'}`;ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=o.c||BONE;ctx.fillText(str,0,0);ctx.restore()}
// reveal: blur→sharp, rise, slight scale-down settle
function reveal(t,t0,d=.55){const k=prog(t,t0,d);return{a:eO(k),blur:18*(1-eO5(k)),dy:28*(1-eO(k)),s:lerp(1.12,1,eO(k))}}
function slam(t,t0){const k=prog(t,t0,.32);if(k<=0)return{a:0};const sq=Math.sin(Math.PI*cl(k*1.6))*.12;return{a:cl(k*4),s:lerp(1.9,1,eO5(k)),blur:10*(1-eO(k)),sx:1+sq,sy:1-sq}}
// ---------- shapes
function spikePath(cx,cy,R,amp,n,rot,jit,t,seed){ctx.beginPath();const r=rng(seed);for(let i=0;i<=n*2;i++){const ang=rot+i*Math.PI/n,out=i%2==0;const j=jit*(r()-.5)*2*(1+.5*Math.sin(t*40+i));const rr=out?R+amp+j:R-amp*.55+j*.4;const x=cx+Math.cos(ang)*rr,y=cy+Math.sin(ang)*rr;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath()}
function morphShape(cx,cy,R,amp,rot,jit,t,seed,col,lw,fillA){ // amp 0 => circle (smooth via many points)
 const n=11,N=264;ctx.beginPath();const r=rng(seed);const js=[];for(let i=0;i<n*2;i++)js.push((r()-.5)*2);
 for(let i=0;i<=N;i++){const u=i/N,ang=rot+u*Math.PI*2;const ph=u*n*2;const i0=Math.floor(ph)%(n*2),f=ph-Math.floor(ph);
  // triangle wave between spike tips and valleys
  const tri=Math.abs(((ph)%2)-1); // 1 at tip(even),0 at valley
  const j=jit*lerp(js[i0],js[(i0+1)%(n*2)],f)*(1+.6*Math.sin(t*37+i0));
  const rr=R+amp*(tri*1.55-.55)+j*tri;const x=cx+Math.cos(ang)*rr,y=cy+Math.sin(ang)*rr;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}
 ctx.closePath();if(fillA>0){ctx.fillStyle=`rgba(248,246,239,${fillA})`;ctx.fill()}ctx.lineWidth=lw;ctx.lineJoin=amp>4?'miter':'round';ctx.strokeStyle=col;ctx.stroke()}
function ring(x,y,r,lw,col,a){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.lineWidth=lw;ctx.strokeStyle=col;ctx.stroke();ctx.restore()}
function arcDraw(x,y,r,p,lw,col,a=1,start=-Math.PI/2){if(p<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.beginPath();ctx.arc(x,y,r,start,start+p*Math.PI*2);ctx.lineWidth=lw;ctx.lineCap='round';ctx.strokeStyle=col;ctx.stroke();ctx.restore()}
function softGlow(x,y,r,a,c='230,199,156'){if(a<=0)return;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${c},${a})`);g.addColorStop(.5,`rgba(${c},${a*.35})`);g.addColorStop(1,`rgba(${c},0)`);ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r)}
// shards (deterministic)
const SH=[];{const r=rng(9);for(let i=0;i<46;i++){const ang=r()*Math.PI*2;SH.push({ang,sp:380+r()*820,rot:(r()-.5)*14,sz:10+r()*34,ph:r(),burst:i<22?0:1,ox:(r()-.5)*40,oy:(r()-.5)*40})}}
const BURST=[[1.05,CX,960],[4.25,CX,960]];
function shardPos(s,t){const [t0,bx,by]=BURST[s.burst];const k=t-t0;if(k<0)return null;
 // decelerating flight, then at 5.25 they get sucked into centre
 const d=s.sp*(1-Math.exp(-k*2.6))/2.6;let x=bx+s.ox+Math.cos(s.ang)*d,y=by+s.oy+Math.sin(s.ang)*d+40*k*k*.3;const rot=s.rot*(1-Math.exp(-k*2));
 const su=eI(prog(t,5.2,.75));x=lerp(x,CX,su);y=lerp(y,960,su);return{x,y,rot,sc:1-su*.9,a:(1-prog(t,5.85,.12))}}
function drawShards(t){for(const s of SH){const p=shardPos(s,t);if(!p||p.a<=0)continue;ctx.save();ctx.globalAlpha*=p.a*.9;ctx.translate(p.x,p.y);ctx.rotate(p.rot+s.ph*6);ctx.scale(p.sc,p.sc);ctx.beginPath();ctx.moveTo(0,-s.sz);ctx.lineTo(s.sz*.45,s.sz*.6);ctx.lineTo(-s.sz*.35,s.sz*.35);ctx.closePath();ctx.fillStyle=s.burst?GOLD:BONE;ctx.fill();ctx.restore()}}
function shake(t){let a=0;for(const [t0,amp] of [[1.05,16],[4.25,30],[0.25,6],[0.6,7]]){const k=t-t0;if(k>=0&&k<.5)a+=amp*Math.exp(-k*9)}const r=Math.floor(t*30);return[a*Math.sin(r*12.9898),a*Math.cos(r*78.233)]}
// ---------- SFX timeline (exported)
window.SFX=[[0.0,'room'],[0.25,'impact_s'],[0.6,'impact_s'],[1.0,'impact'],[1.05,'shatter'],[2.55,'whoosh'],[3.0,'tick'],[3.3,'impact_s'],[3.62,'tick'],[3.8,'riser_s'],[4.25,'impact_big'],[4.27,'shatter'],[5.0,'reverse'],[5.9,'sub'],[6.6,'line'],[7.0,'air'],[7.6,'air'],[8.0,'stretch'],[9.6,'air'],[10.4,'air'],[11.2,'swell'],[11.5,'bloom'],[12.6,'air'],[12.9,'ticks'],[14.0,'air'],[15.3,'whoosh'],[15.7,'air'],[16.4,'bloom'],[18.0,'sub_soft'],[18.1,'line']];
// ---------- scenes
function hook(t){ // 0 - 6.0
 const ex=prog(t,2.55,.35); // first phrase exits
 // spiky shape A
 const aIn=eOB(prog(t,1.0,.4),2.2);const su=eI(prog(t,5.2,.75));
 if(t>=1.0&&t<6){const R=230*aIn*(1-su*.97),amp=lerp(70,90,Math.sin(t*3)*.5+.5)*(1-su);
  const xA=CX-(t>3.6?eIO(prog(t,3.6,.6))*170:0)+(t>4.25?Math.exp(-(t-4.25)*5)*-40:0);
  ctx.save();ctx.globalAlpha=lerp(1,.55,ex)*(1-prog(t,5.8,.15));morphShape(xA,960,R,amp,t*.15,10*(1-su),t,3,BONE,4,.04);ctx.restore()}
 // shape B (enters from right on 'بأقسى')
 if(t>=3.55&&t<6){const k=eO5(prog(t,3.6,.62));const R=200*(1-su*.97),amp=95*(1-su);const xB=lerp(1350,CX+170,k)+(t>4.25?Math.exp(-(t-4.25)*5)*40:0);
  ctx.save();ctx.globalAlpha=1-prog(t,5.8,.15);morphShape(xB,960,R,amp,-t*.2,14*(1-su),t,8,GOLD,4,.05);ctx.restore()}
 drawShards(t);
 // flash on collision
 const fl=prog(t,4.25,.35);if(fl>0&&fl<1){ctx.save();ctx.globalAlpha=(1-fl)*.35;ctx.fillStyle=GOLD2;ctx.fillRect(0,0,W,H);ctx.restore()}
 // phrase 1
 if(t<3){const o={a:1-ex,blur:ex*22,s:1+ex*.25};
  const j=t>1.0&&t<2.55?[Math.sin(t*61)*3,Math.cos(t*53)*3]:[0,0];
  word('كلمةٌ',CX+135,560,120,{...slam(t,.25),...(ex>0?o:{})});
  word('واحدة',CX-135,560,120,{...slam(t,.6),...(ex>0?o:{})});
  const s3=slam(t,1.0);word('جارحة…',CX+j[0],1440+j[1],170,{...s3,...(ex>0?o:{}),c:GOLD})}
 // phrase 2
 if(t>=2.9&&t<6){const e2=eI(prog(t,5.05,.5));const o2=e2>0?{a:1-e2,blur:e2*24,s:1-e2*.2}:{};
  word('تُقابِلُها',CX,540,96,{...reveal(t,3.0,.4),...o2});
  word('بأقسى منها؟',CX,1430,150,{...slam(t,3.3),...o2,c:GOLD,rot:t>4.25?Math.sin((t-4.25)*30)*Math.exp(-(t-4.25)*6)*.05:0})}
 // suck point
 const pt=prog(t,5.85,.5);if(pt>0&&pt<1){softGlow(CX,960,lerp(40,260,eO(pt)),(1-pt)*.9);ring(CX,960,lerp(10,420,eO(pt)),3,GOLD,1-pt)}
}
function sawLabel(t){const r=reveal(t,6.95,.6);if(r.a<=0)return;ctx.save();ctx.globalAlpha=r.a*(1-prog(t,14.9,.4));if(r.blur>.2)ctx.filter=`blur(${r.blur}px)`;
 seg([['قال رسول الله ','400 58px Am',BONE],['ﷺ','64px Saw',GOLD],[' :','400 58px Am',BONE]],CX,452+r.dy);ctx.restore()}
function hadith(t){ // 6.6 - 15.3
 if(t<6.5||t>15.5)return;const out=eI(prog(t,14.9,.45));const OA=1-out;
 // gold hairline
 const ln=eIO(prog(t,6.6,.7));if(ln>0){ctx.save();ctx.globalAlpha=OA;ctx.strokeStyle=GOLD;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(CX-280*ln,505);ctx.lineTo(CX+280*ln,505);ctx.stroke();
  ctx.fillStyle=GOLD;ctx.beginPath();ctx.save();ctx.translate(CX,505);ctx.rotate(Math.PI/4);const d=9*eOB(prog(t,7.1,.35));ctx.fillRect(-d/2,-d/2,d,d);ctx.restore();ctx.restore()}
 sawLabel(t);
 // مهلا with kashida slowing down
 const k=eIO(prog(t,8.0,1.5));const n=Math.round(k*7);const mh='مَهْ'+'ـ'.repeat(n)+'لًا';
 const r1=reveal(t,7.6,.7);word(mh,CX,640,150,{...r1,a:r1.a*OA,glow:k>0?18*k:0});
 // slow-motion dots under مهلا (time slowing)
 if(t>8.0){for(let i=0;i<5;i++){const p=prog(t,8.05+i*.22,.6);const x=CX+(i-2)*46;ring(x,752,lerp(2,6,eOB(p)),3,GOLD,eO(p)*OA*(.35+.13*i))}}
 const r2=reveal(t,9.6);word('يَا عَائِشَةُ،',CX,860,92,{...r2,a:r2.a*OA});
 const r3=reveal(t,10.4);word('إِنَّ اللَّهَ يُحِبُّ',CX,1000,92,{...r3,a:r3.a*OA});
 // circle of rifq: draws smoothly, breathes
 const cy=1255,cp=eIO(prog(t,11.15,.9));if(cp>0){const br=1+.015*Math.sin(t*2.2);softGlow(CX,cy,lerp(120,380,eO(prog(t,11.5,1.2))),.32*OA*eO(prog(t,11.45,.6)));
  arcDraw(CX,cy,200*br,cp,3,GOLD,OA*.9,Math.PI/2);arcDraw(CX,cy,224*br,eIO(prog(t,11.35,.9)),1.5,GOLD,OA*.35,-Math.PI/2)}
 const r4=reveal(t,11.5,.75);word('الرِّفْقَ',CX,cy-6,196,{...r4,a:r4.a*OA,c:GOLD,glow:28});
 // ripples
 for(const t0 of [11.55,11.95]){const p=prog(t,t0,1.4);if(p>0&&p<1)ring(CX,cy,lerp(200,560,eO(p)),2,GOLD,(1-p)*.5*OA)}
 const r5=reveal(t,12.6);word('فِي الأَمْرِ كُلِّهِ',CX,1500,92,{...r5,a:r5.a*OA});
 // "in all matters": the circle multiplies into a lattice of small rings
 if(t>12.9){const rr=rng(5);for(let gy=0;gy<9;gy++)for(let gx=0;gx<6;gx++){const x=90+gx*180,y=170+gy*200;const dist=Math.hypot(x-CX,y-cy);const t0=12.9+dist/1400;const p=prog(t,t0,.55);if(p<=0)continue;
   const busy=Math.abs(y-cy)<300&&Math.abs(x-CX)<330||Math.abs(y-640)<110||Math.abs(y-860)<90||Math.abs(y-1000)<90||Math.abs(y-1500)<90||Math.abs(y-452)<70||y>1600;if(busy)continue;
   ring(x,y,lerp(0,22,eOB(p,2.4))*(1+.06*Math.sin(t*2+gx+gy)),2,GOLD,eO(p)*.4*OA)}}
 // source
 const rs=reveal(t,13.9,.6);if(rs.a>0){ctx.save();ctx.globalAlpha=rs.a*.75*OA;ctx.font='500 34px Px';ctx.direction='rtl';ctx.textAlign='center';ctx.fillStyle=GOLD;ctx.fillText('عن عائشة رضي الله عنها  ·  صحيح البخاري ٦٠٢٤',CX,1665+rs.dy*.5);ctx.restore()}
}
function takeaway(t){if(t<15.3||t>18.2)return;const out=eI(prog(t,17.7,.45));const OA=1-out;
 // jagged → smooth echo: small spiky shape relaxes into circle
 const m=eIO(prog(t,15.4,1.3));ctx.save();ctx.globalAlpha=OA*eO(prog(t,15.35,.4));morphShape(CX,960,150,lerp(55,0,m),t*.1,lerp(8,0,m),t,3,m>.5?GOLD:BONE,3,0);ctx.restore();
 softGlow(CX,960,320,.25*m*OA);
 word('رُدَّ بالحقّ…',CX,640,104,{...reveal(t,15.7),a:reveal(t,15.7).a*OA});
 const r=reveal(t,16.4,.7);word('وزيِّنه بالرِّفق',CX,1300,124,{...r,a:r.a*OA,c:GOLD,glow:20})}
function outro(t){if(t<17.9)return;const k=prog(t,18.0,.6);ctx.save();
 const a=eO(k)*(1-prog(t,19.5,.5));ctx.globalAlpha=a;
 // header lockup like the cards
 const y=900;ctx.font='700 54px In';ctx.textBaseline='middle';
 ctx.fillStyle=BONE;ctx.textAlign='right';ctx.fillText('20',CX-150,y-34);ctx.fillStyle=GOLD;ctx.fillText('26',CX-150,y+34);
 ctx.fillStyle=BONE;const lh=eIO(prog(t,18.1,.5));ctx.fillRect(CX-134,y-66,3,132*lh);
 ctx.textAlign='left';ctx.fillStyle=GOLD;ctx.save();ctx.letterSpacing='6px';ctx.fillText('CRAFTED BY',CX-112+30*(1-eO(k)),y-34);ctx.fillStyle=BONE;ctx.fillText('@SU7AIB.7',CX-112+50*(1-eO(prog(t,18.12,.6))),y+34);ctx.restore();
 ctx.restore()}
function bg(t){const g=ctx.createRadialGradient(CX,900,80,CX,960,1250);g.addColorStop(0,BG_IN);g.addColorStop(.55,BG);g.addColorStop(1,BG_OUT);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 // slow drifting geometric hairlines
 ctx.save();ctx.globalAlpha=.06;ctx.strokeStyle=GOLD;ctx.lineWidth=1.5;ctx.translate(CX,960);ctx.rotate(t*.02);for(let i=0;i<2;i++){ctx.rotate(Math.PI/4);ctx.strokeRect(-470,-470,940,940)}ctx.restore()}
function draw(t){ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';bg(t);
 const [sx,sy]=shake(t);ctx.save();ctx.translate(sx,sy);hook(t);hadith(t);takeaway(t);outro(t);ctx.restore();
 ctx.globalAlpha=1;ctx.filter='none';ctx.drawImage(GR[Math.floor(t*24)%4],0,0,W,H);
 const f=prog(t,DUR-.4,.4);if(f>0){ctx.globalAlpha=f;ctx.fillStyle=BG_OUT;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}}
window.render=t=>{draw(t);return cv.toDataURL('image/png')};
window.drawCover=()=>{ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';bg(3);
 ctx.save();ctx.globalAlpha=.5;morphShape(CX-150,1180,150,70,.3,6,1,3,BONE,4,.03);ctx.restore();
 ctx.save();softGlow(CX+170,1180,300,.35);ctx.beginPath();ctx.arc(CX+170,1180,150,0,7);ctx.lineWidth=4;ctx.strokeStyle=GOLD;ctx.stroke();ctx.restore();
 word('كيف تردّ على',CX,560,96,{c:BONE});word('كلمةٍ جارحة؟',CX,730,140,{c:GOLD,glow:20});
 word('حديث في صحيح البخاري',CX,1500,48,{f:'Px',w:500,c:BONE,a:.7});
 ctx.drawImage(GR[0],0,0,W,H);return cv.toDataURL('image/png')};
