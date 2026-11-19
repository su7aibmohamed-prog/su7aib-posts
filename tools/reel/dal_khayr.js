// SUD reel — الدال على الخير كفاعله (Tirmidhi 2670; cf. Muslim 1893). Voice from the account's own istighfar video.
// v2: hook card, text inside shapes (cards / pills / highlight bars / lists), bigger type, bolder visuals, slow zoom, voice trimmed to ~35s.
// Audio edit (see build notes): keep [0,29.40] + [34.42,39.98] of the original voice  => words after the cut are at t-5.02.
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
const W=1080,H=1920,CX=540,DUR=20.8;window.DUR=DUR;const HANDLE='@SUD.REELS';
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
function pillSrc(s,y,a){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.font='500 30px Px';const w=ctx.measureText(s).width+52;ctx.beginPath();ctx.roundRect(CX-w/2,y-28,w,56,28);ctx.fillStyle='rgba(230,199,156,.12)';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='rgba(230,199,156,.55)';ctx.stroke();ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=GOLD;ctx.fillText(s,CX,y+2);ctx.restore()}
function igIcon(x,y,s,c){ctx.save();ctx.strokeStyle=c;ctx.fillStyle=c;ctx.lineWidth=3*s;ctx.beginPath();ctx.roundRect(x-17*s,y-17*s,34*s,34*s,10*s);ctx.stroke();ctx.beginPath();ctx.arc(x,y,7.5*s,0,7);ctx.stroke();ctx.beginPath();ctx.arc(x+9*s,y-9*s,2.4*s,0,7);ctx.fill();ctx.restore()}
function handleTag(cx,y,al,s=1){ctx.save();ctx.globalAlpha*=al;ctx.font=`700 ${28*s}px In`;ctx.letterSpacing=`${4*s}px`;const tw=ctx.measureText(HANDLE).width;const IC=34*s,G=18*s;const tot=IC+G*2+2+tw;let x=cx-tot/2;
 igIcon(x+IC/2,y,s,BONE);x+=IC+G;ctx.fillStyle=BONE;ctx.globalAlpha*=.7;ctx.fillRect(x,y-15*s,2,30*s);ctx.globalAlpha/=.7;x+=2+G;ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(HANDLE,x,y+1);ctx.restore()}

// ---------- network of nodes (no characters): each node = a person who makes istighfar
const NODES=[];{const L=[[CX],[CX],[CX+230,CX,CX-230],[],[]];for(let i=0;i<9;i++)L[3].push(130+i*102.5);for(let i=0;i<27;i++)L[4].push(70+i*34.6);
 const Y=[1185,1285,1385,1490,1590],ACT=[1.32,3.86,6.2,9.38,10.0],SEND=[null,3.04,5.3,8.4,9.55];
 L.forEach((xs,l)=>xs.forEach((x,i)=>{let p=null;if(l==1)p=0;else if(l==2)p=1;else if(l==3)p=4+Math.floor(i/3)-2;else if(l==4)p=5+Math.floor(i/3);
  NODES.push({x,y:Y[l],l,p,act:ACT[l]+(l>=2?i*.04:0),send:SEND[l]===null?null:SEND[l]+(l>=2?i*.03:0),r:[26,22,18,13,6][l]})}))}
// fix parents to absolute indices: level offsets 0,1,2..4,5..13,14..40
NODES.forEach(n=>{if(n.l==2)n.p=1;else if(n.l==3)n.p=2+Math.floor((n.x-130)/102.5/3);else if(n.l==4)n.p=5+Math.floor((n.x-70)/34.6/3)});
function qpt(a,c,b,k){return[(1-k)*(1-k)*a[0]+2*(1-k)*k*c[0]+k*k*b[0],(1-k)*(1-k)*a[1]+2*(1-k)*k*c[1]+k*k*b[1]]}
function dashArc(a,b,p,lw,al){if(p<=0)return;const c=[(a[0]+b[0])/2+(b[0]>a[0]?-30:30)*(Math.abs(b[0]-a[0])>5?1:0)+ (Math.abs(b[0]-a[0])<5?120:0),Math.min(a[1],b[1])-50];ctx.save();ctx.globalAlpha*=al;ctx.setLineDash([9,9]);ctx.beginPath();for(let s=0;s<=30*p;s++){const q=qpt(a,c,b,s/30);s?ctx.lineTo(...q):ctx.moveTo(...q)}stroke(lw,GOLD);ctx.setLineDash([]);
 if(p<1){const q=qpt(a,c,b,p);softGlow(q[0],q[1],30,.9);ctx.beginPath();ctx.arc(q[0],q[1],5,0,7);ctx.fillStyle=GOLD2;ctx.fill()}ctx.restore()}
function network(t){const dim=t>16.2?lerp(1,.22,eIO(prog(t,16.2,.5))):1;const fl=eIO(prog(t,10.8,1.4));ctx.save();ctx.globalAlpha*=dim;
 const shown=n=>t>=n.act-1.2||n.l==0;
 for(const n of NODES){if(n.p===null||n.p===undefined)continue;const P=NODES[n.p];const p=eIO(prog(t,n.send,n.l==4?.45:.6));dashArc([P.x,P.y],[n.x,n.y],p,n.l>=3?2:3,n.l>=4?.5:.8)}
 for(const n of NODES){const ap=prog(t,n.l==0?.0:n.send??0,.4);if(ap<=0&&n.l>0)continue;const lit=eOB(prog(t,n.act,.4),2.4);const k=eO(prog(t,n.l==0?.05:n.send,.35));
  ctx.beginPath();ctx.arc(n.x,n.y,n.r*lerp(.4,1,k),0,7);ctx.lineWidth=n.l>=4?2:3;ctx.strokeStyle=`rgba(248,246,239,${.55*k})`;ctx.stroke();
  if(lit>0){softGlow(n.x,n.y,n.r*4.2,.55*cl(lit));ctx.beginPath();ctx.arc(n.x,n.y,n.r*.62*lit,0,7);ctx.fillStyle=GOLD2;ctx.fill();if(n.l<3)ring(n.x,n.y,lerp(n.r,n.r*3.4,eO(prog(t,n.act,.9))),2,GOLD,1-prog(t,n.act,.9))}}
 // rewards flow back to the first node (10.8+)
 if(fl>0&&fl<1){const r=rng(4);for(const n of NODES){if(n.l==0)continue;const d=r()*.35;const k=prog(t,10.8+d+n.l*.08,.9);if(k<=0||k>=1)continue;const x=lerp(n.x,CX,eIO(k)),y=lerp(n.y,1185,eIO(k))-Math.sin(k*Math.PI)*40;softGlow(x,y,16,.9);ctx.beginPath();ctx.arc(x,y,3.5,0,7);ctx.fillStyle=GOLD2;ctx.fill()}}
 const big=eIO(prog(t,11.3,1.2));if(big>0){softGlow(CX,1185,lerp(110,280,big),.6*big);ring(CX,1185,26+30*big,3,GOLD,.8*big)}
 // "remind others": arc from first node down toward the viewer
 const rm=eIO(prog(t,15.44,.8));if(rm>0){dashArc([CX,1185],[CX+300,1700],rm,3,.9)}
 ctx.restore()}
function S0(t){scene(t,0,2.05,()=>{tag('تخيّل…',470,t,.0);phrase([['يقول',.56],['لك',.76],['فيه',.86],['واحد:',1.1]],640,80,t,{w:400});
 phrase([['استغفر',1.32],['الله',1.88]],800,110,t,{box:'fill',boxT:1.22})})}
function S1(t){scene(t,2.06,4.7,()=>{phrase([['واللي',2.06],['يستغفر',2.36,1]],560,84,t);
 phrase([['أرسل',3.04,2],['لصاحبه',3.38]],720,96,t);phrase([['يستغفر',3.86],['معه',4.44]],880,80,t,{box:'glass',boxT:3.76})})}
function S2(t){scene(t,4.72,7.08,()=>{phrase([['وصاحبه',4.72],['أرسل',5.3,2],['لأصحابه',5.64]],600,86,t);
 listPill([['يستغفروا',6.2,1],['معه',6.8]],790,80,t,6.05)})}
function S3(t){scene(t,7.1,10.3,()=>{phrase([['وكل',7.1],['واحد',7.4],['من',7.72],['أصحابه',7.86]],560,80,t,{w:400});
 phrase([['أرسل',8.4,2],['لأصحابه',8.74]],720,96,t);listPill([['يستغفروا',9.38,1],['معاه',10.0]],890,80,t,9.25)})}
function S4(t){scene(t,10.34,12.78,()=>{tag('والأجر؟',440,t,10.3);phrase([['وكل',10.34],['هذه',10.7],['الأجور',11.02]],620,104,t,{box:'fill',boxT:10.3});
 phrase([['في',11.44],['ميزان',11.62],['الشخص',11.98],['الأول',12.32,2]],820,90,t)})}
function S5(t){scene(t,12.8,14.42,()=>{phrase([['اللي',12.8],['أرسل',12.86,1],['لصاحبه',13.26]],620,90,t);phrase([['يستغفر',13.74],['الله',14.24]],790,96,t,{box:'glass',boxT:13.6})})}
function S6(t){scene(t,14.44,16.36,()=>{phrase([['فاستغفر',14.5],['الله',15.14]],620,120,t,{box:'fill',boxT:14.4});phrase([['وذكّر',15.44,2],['غيرك',15.92]],840,104,t)})}
function S7(t){scene(t,16.38,18.6,()=>{tag('قال النبي {S}',460,t,16.3);phrase([['«إنَّ',16.40],['الدّالَّ',16.46],['على',16.85],['الخير',17.05]],660,104,t);
 phrase([['كفاعله»',17.45]],860,170,t,{c:GOLD,ul:false});pillSrc('الترمذي ٢٦٧٠ · ونحوه في صحيح مسلم ١٨٩٣',1060,eO(prog(t,17.3,.5)))})}
function outro(t){if(t<18.5)return;const e=1-prog(t,DUR-.45,.4);ctx.save();ctx.globalAlpha=e;
 listPill([['استغفر',18.65,1],['الله',18.8]],680,80,t,18.6);listPill([['وأرسله',19.0,1],['لأصحابك',19.15]],840,80,t,18.95);ctx.restore()}
window.SFX=[[0,'room'],[1.22,'impact_s'],[1.35,'bloom'],[2.06,'whoosh'],[3.04,'air'],[3.86,'key'],[4.72,'whoosh'],[5.3,'air'],[6.2,'ticks'],[7.1,'whoosh'],[8.4,'air'],[9.38,'ticks'],[10.0,'ticks'],[10.34,'whoosh'],[10.3,'impact_s'],[10.8,'reverse'],[11.6,'bloom'],[12.8,'whoosh'],[14.44,'whoosh'],[14.4,'impact_s'],[15.44,'air'],[16.38,'whoosh'],[17.45,'bloom'],[18.6,'key'],[18.95,'key'],[19.4,'sub_soft']];
function draw(t){ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';ctx.globalAlpha=1;bg(t);network(t);S0(t);S1(t);S2(t);S3(t);S4(t);S5(t);S6(t);S7(t);outro(t);
 handleTag(CX,1730,.6,.72);ctx.drawImage(GR[Math.floor(t*24)%4],0,0,W,H);const f=prog(t,DUR-.4,.4);if(f>0){ctx.globalAlpha=f;ctx.fillStyle=BG_OUT;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}}
window.render=t=>{draw(t);return cv.toDataURL('image/png')};
window.drawCover=()=>{ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';bg(3);network(12.5);
 tag('حديث',470,1,0);phrase([['أجر',0],['ناس',0],['ما',0],['تعرفهم…',0]],660,96,9,{box:'fill',boxT:0});phrase([['في',0],['ميزانك!',0,1]],860,140,9,{ul:false});
 handleTag(CX,1730,.6,.72);ctx.drawImage(GR[0],0,0,W,H);return cv.toDataURL('image/png')};
