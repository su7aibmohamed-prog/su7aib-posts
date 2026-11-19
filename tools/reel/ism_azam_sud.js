// SU7IAB reel — الاسم الأعظم (Abu Dawud 1493 / Tirmidhi 3475, sahih per al-Albani). Voice: @lamha_story narration.
// Style = reel 001: burgundy #791C2E + gold, Amiri, kinetic typography, no characters. Text synced to voice word timings.
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
const W=1080,H=1920,CX=540,DUR=48.4;window.DUR=DUR;
const BG='#791C2E',BG_IN='#8B2437',BG_OUT='#4E0F1C',BONE='#F8F6EF',GOLD='#E6C79C',GOLD2='#F3DDB8';
const cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x)),lerp=(a,b,k)=>a+(b-a)*k,prog=(t,a,d)=>cl((t-a)/d);
const eIO=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const eO=x=>{x=cl(x);return 1-Math.pow(1-x,3)},eO5=x=>{x=cl(x);return 1-Math.pow(1-x,5)},eI=x=>{x=cl(x);return x*x*x};
const eOB=(x,s=1.70158)=>{x=cl(x);return 1+(s+1)*Math.pow(x-1,3)+s*Math.pow(x-1,2)};
function rng(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
const GR=[];{for(let k=0;k<4;k++){const g=document.createElement('canvas');g.width=540;g.height=960;const gx=g.getContext('2d'),im=gx.createImageData(540,960),r=rng(77+k);for(let i=0;i<im.data.length;i+=4){const v=r()*255;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=14}gx.putImageData(im,0,0);GR.push(g)}}
function ring(x,y,r,lw,col,a){if(a<=0||r<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.lineWidth=lw;ctx.strokeStyle=col;ctx.stroke();ctx.restore()}
function arcDraw(x,y,r,p,lw,col,a=1,st=-Math.PI/2){if(p<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.beginPath();ctx.arc(x,y,r,st,st+p*Math.PI*2);ctx.lineWidth=lw;ctx.lineCap='round';ctx.strokeStyle=col;ctx.stroke();ctx.restore()}
function softGlow(x,y,r,a){if(a<=0)return;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(230,199,156,${a})`);g.addColorStop(.5,`rgba(230,199,156,${a*.35})`);g.addColorStop(1,'rgba(230,199,156,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r)}
function stroke(lw=4,c=GOLD){ctx.lineWidth=lw;ctx.strokeStyle=c;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}
function txt(s,x,y,size,o={}){const a=o.a??1;if(a<=.003)return;ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y+(o.dy||0));const sc=o.s??1;ctx.scale(sc,sc);if(o.blur>.2)ctx.filter=`blur(${o.blur}px)`;
 if(o.glow){ctx.shadowColor='rgba(230,199,156,.55)';ctx.shadowBlur=o.glow}ctx.font=`${o.w||700} ${size}px ${o.f||'Am'}`;ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=o.c||BONE;ctx.fillText(s,0,0);ctx.restore()}
function reveal(t,t0,d=.5){const k=prog(t,t0,d);return{a:eO(k),blur:14*(1-eO5(k)),dy:22*(1-eO(k)),s:lerp(1.1,1,eO(k))}}
// ---- a synced line: words [[w,t,key]] appear exactly when spoken
function line(words,y,size,t,o={}){const a=(o.a??1)*ctx.globalAlpha;if(a<=.003)return;ctx.save();ctx.font=`${o.w||700} ${size}px Am`;const sp=ctx.measureText(' ').width;
 const ws=words.map(q=>ctx.measureText(q[0]).width);const tot=ws.reduce((s,v)=>s+v,0)+sp*(ws.length-1);let x=CX+tot/2;ctx.direction='rtl';ctx.textAlign='right';ctx.textBaseline='middle';
 words.forEach((q,i)=>{const k=prog(t,q[1]-.04,.28);if(k>0){ctx.save();ctx.globalAlpha=a*eO(k);if(k<1)ctx.filter=`blur(${8*(1-eO5(k))}px)`;
   const key=q[2];ctx.fillStyle=key?GOLD:(o.c||BONE);if(key){ctx.shadowColor='rgba(230,199,156,.5)';ctx.shadowBlur=24}
   const sc=lerp(1.14,1,eO(k));ctx.translate(x-ws[i]/2,y+18*(1-eO(k)));ctx.scale(sc,sc);ctx.fillText(q[0],ws[i]/2,0);ctx.restore();
   if(key&&o.ul!==false){const u=eIO(prog(t,q[1]+.15,.35));if(u>0){ctx.save();ctx.globalAlpha=a*.8;ctx.strokeStyle=GOLD;ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x,y+size*.62);ctx.lineTo(x-ws[i]*u,y+size*.62);ctx.stroke();ctx.restore()}}}
  x-=ws[i]+sp});ctx.restore()}
function pill(s,y,a){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.font='500 30px Px';const w=ctx.measureText(s).width+52;ctx.beginPath();ctx.roundRect(CX-w/2,y-28,w,56,28);ctx.fillStyle='rgba(230,199,156,.12)';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='rgba(230,199,156,.55)';ctx.stroke();
 ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=GOLD;ctx.fillText(s,CX,y+2);ctx.restore()}
function saw(x,y,size,a){ctx.save();ctx.globalAlpha*=a;ctx.font=`${size}px Saw`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=GOLD;ctx.fillText('ﷺ',x,y);ctx.restore()}
// ---- shapes
function arch(cx,base,w,h,p,a){if(p<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.beginPath();const L=cx-w/2,R=cx+w/2,top=base-h;ctx.moveTo(L,base);ctx.lineTo(L,top+w*.55);ctx.quadraticCurveTo(L,top+w*.05,cx,top);ctx.quadraticCurveTo(R,top+w*.05,R,top+w*.55);ctx.lineTo(R,base);
 ctx.setLineDash([2400]);ctx.lineDashOffset=2400*(1-p);stroke(4);ctx.restore()}
function star8(cx,cy,R,rot,p,a,lw=3){if(p<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.translate(cx,cy);ctx.rotate(rot);for(let k=0;k<2;k++){ctx.save();ctx.rotate(k*Math.PI/4);ctx.beginPath();ctx.rect(-R*.7,-R*.7,R*1.4,R*1.4);ctx.setLineDash([R*5.6]);ctx.lineDashOffset=R*5.6*(1-p);stroke(lw);ctx.restore()}ctx.restore()}
const DUST=[];{const r=rng(31);for(let i=0;i<60;i++)DUST.push({x:r()*W,y:r()*H,z:.3+r(),ph:r()*6.28,s:1+r()*2.6})}
const RAIN=[];{const r=rng(12);for(let i=0;i<40;i++)RAIN.push({x:CX+(r()-.5)*520,d:r()*.9,sp:.8+r()*.6,s:3+r()*5})}
// ---- background
function bg(t){const g=ctx.createRadialGradient(CX,900,80,CX,960,1300);g.addColorStop(0,BG_IN);g.addColorStop(.55,BG);g.addColorStop(1,BG_OUT);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 ctx.save();ctx.globalAlpha=.06;ctx.strokeStyle=GOLD;ctx.lineWidth=1.5;ctx.translate(CX,960);ctx.rotate(t*.02);for(let i=0;i<2;i++){ctx.rotate(Math.PI/4);ctx.strokeRect(-470,-470,940,940)}ctx.restore();
 for(const p of DUST){const y=((p.y-t*22*p.z)%H+H)%H,x=p.x+Math.sin(t*.5*p.z+p.ph)*20;ctx.globalAlpha=(.25+.25*Math.sin(t*2*p.z+p.ph))*p.z;ctx.fillStyle=GOLD2;ctx.beginPath();ctx.arc(x,y,p.s*p.z,0,7);ctx.fill()}ctx.globalAlpha=1}
// scene envelope: fade/blur out at end
function env(t,a,b){if(t<a-.05||t>b+.05)return 0;return 1-eI(prog(t,b-.35,.35))}
// ---- word timings (from transcription, text corrected)
const VIS_Y=1360;
function S1(t){const A=env(t,0,4.6);if(!A)return;ctx.save();ctx.globalAlpha=A;
 arch(CX,VIS_Y+200,300,440,eIO(prog(t,.1,1.6)),.9);arch(CX,VIS_Y+200,240,370,eIO(prog(t,.4,1.6)),.35);softGlow(CX,VIS_Y+40,260,.3*eO(prog(t,1.6,1)));
 // little lamp
 const lp=eOB(prog(t,2.0,.5),2);if(lp>0){ctx.beginPath();ctx.moveTo(CX,VIS_Y-250);ctx.lineTo(CX,VIS_Y-150);stroke(2,'rgba(230,199,156,.6)');softGlow(CX,VIS_Y-130,90*lp,.7);ring(CX,VIS_Y-130,16*lp,3,GOLD2,1)}
 line([['دخل',0],['النبيُّ',.36]],560,64,t,{w:400});saw(CX-170,560,70,eO(prog(t,.5,.4)));
 line([['ذاتَ',1.5],['مرةٍ…',1.76]],660,64,t,{w:400});
 line([['إلى',2.02],['المسجد',2.18,1]],790,120,t);
 line([['فسمع',3.06],['رجلًا',3.48],['يدعو',3.8],['ويقول:',4.16]],950,60,t,{w:400,c:GOLD2});ctx.restore()}
function S2(t){const A=env(t,4.5,14.1);if(!A)return;ctx.save();ctx.globalAlpha=A;
 // star grows one stroke per attribute
 const rs=t*.08;softGlow(CX,VIS_Y,300,.18+.12*eO(prog(t,10.1,.6)));
 star8(CX,VIS_Y,150,rs,eIO(prog(t,4.7,1.4)),.8);star8(CX,VIS_Y,210,-rs,eIO(prog(t,8.2,1.4)),.35,2);
 const one=eOB(prog(t,10.14,.5),2.4);if(one>0){softGlow(CX,VIS_Y,140,.7*one);ctx.beginPath();ctx.arc(CX,VIS_Y,12*one,0,7);ctx.fillStyle=GOLD2;ctx.fill()}
 for(const t0 of [10.15,10.65])ring(CX,VIS_Y,lerp(20,320,eO(prog(t,t0,1.3))),2,GOLD,(1-prog(t,t0,1.3))*.7);
 const pa=1-eI(prog(t,9.85,.3)),pb=prog(t,10.0,.01)>0?1:0;
 ctx.save();ctx.globalAlpha*=pa;ctx.translate(0,-40*eI(prog(t,9.85,.3)));
  line([['اللَّهُمَّ',4.72],['إِنِّي',5.5],['أَسْأَلُكَ',5.78]],560,74,t);
  line([['بِأَنِّي',6.18],['أَشْهَدُ',6.76],['أَنَّكَ',7.12],['أَنْتَ',7.44],['اللَّهُ',7.74,1]],700,74,t);
  line([['لَا',8.26],['إِلَهَ',8.76],['إِلَّا',9.1],['أَنْتَ',9.4]],840,74,t);ctx.restore();
 if(pb){line([['الأَحَدُ',10.14,1],['الصَّمَدُ',10.62,1]],600,120,t,{ul:false});
  line([['الَّذِي',11.28],['لَمْ',11.64],['يَلِدْ',11.84],['وَلَمْ',12.14],['يُولَدْ',12.38]],770,68,t);
  line([['وَلَمْ',12.74],['يَكُنْ',12.98],['لَهُ',13.24],['كُفُوًا',13.4],['أَحَدٌ',13.8]],900,68,t)}
 pill('دعاء الرجل',430,eO(prog(t,4.8,.5)));ctx.restore()}
function S3(t){const A=env(t,14.1,23.2);if(!A)return;ctx.save();ctx.globalAlpha=A;
 line([['فقال',14.16],['النبيُّ',14.56]],470,58,t,{w:400});saw(CX-150,470,62,eO(prog(t,14.8,.4)));
 txt('لمّا سمعه:',CX,550,52,{...reveal(t,15.64,.4),w:400,c:GOLD2});
 line([['وَالَّذِي',16.54],['نَفْسِي',17.08],['بِيَدِهِ',17.54]],680,76,t);
 line([['لَقَدْ',18.06],['سَأَلَ',18.42],['اللَّهَ',18.78],['بِاسْمِهِ',19.02],['الأَعْظَمِ',19.5,1]],820,84,t);
 line([['الَّذِي',20.3],['إِذَا',20.66],['دُعِيَ',20.96],['بِهِ',21.28],['أَجَابَ',21.48,1]],960,68,t);
 line([['وَإِذَا',21.96],['سُئِلَ',22.22],['بِهِ',22.52],['أَعْطَى',22.74,1]],1075,68,t);
 // light column rising (du'a ascends) and blessing descending
 const b=eIO(prog(t,19.5,.9));if(b>0){const g=ctx.createLinearGradient(0,(VIS_Y+110)+300,0,(VIS_Y+110)-260);g.addColorStop(0,'rgba(243,221,184,0)');g.addColorStop(1,`rgba(243,221,184,${.22*b})`);ctx.fillStyle=g;ctx.fillRect(CX-60*b,(VIS_Y+110)-260,120*b,560);
  softGlow(CX,(VIS_Y+110)-240,220,.5*b);for(const t0 of [19.55,20.0])ring(CX,(VIS_Y+110)-240,lerp(20,380,eO(prog(t,t0,1.4))),2,GOLD,(1-prog(t,t0,1.4))*.6)}
 const aj=prog(t,21.5,1.2);if(aj>0&&aj<1)ring(CX,(VIS_Y+110)+220,lerp(10,300,eO(aj)),3,GOLD2,1-aj);
 for(const r of RAIN){const k=prog(t,22.75+r.d*.6,1.1*r.sp);if(k<=0||k>=1)continue;const y=lerp((VIS_Y+110)-260,(VIS_Y+110)+260,eI(k)*.6+k*.4);softGlow(r.x*.7+CX*.3,y,24,.9*(1-k));ctx.beginPath();ctx.arc(r.x*.7+CX*.3,y,r.s*.6,0,7);ctx.fillStyle=GOLD2;ctx.globalAlpha=A*(1-k);ctx.fill();ctx.globalAlpha=A}
 pill('أبو داود ١٤٩٣ · الترمذي ٣٤٧٥ · صحّحه الألباني',1680,eO(prog(t,16.6,.6)));ctx.restore()}
function S4(t){const A=env(t,23.2,29.4);if(!A)return;ctx.save();ctx.globalAlpha=A;
 line([['تخيّل',23.24,1],['كلمات…',23.74]],600,100,t,{ul:false});
 line([['ما',24.3],['تأخذ',24.46],['منك',24.76],['ثواني',25.06,1]],750,70,t,{w:400});
 line([['تستفتح',25.82],['فيها',26.5],['دعاءك',26.76]],880,70,t,{w:400});
 line([['قد',27.5],['تجعل',27.82],['هذا',28.2],['الدعاء',28.46],['مستجابًا',28.86,1]],1010,74,t);
 // stopwatch: sweeps only a few seconds
 const cp=eOB(prog(t,23.4,.5),2);if(cp>0){ctx.save();ctx.translate(CX,VIS_Y);ctx.scale(cp,cp);ctx.beginPath();ctx.arc(0,0,150,0,7);stroke(4);ctx.beginPath();ctx.moveTo(-20,-170);ctx.lineTo(20,-170);ctx.moveTo(0,-170);ctx.lineTo(0,-152);stroke(6);
  for(let i=0;i<12;i++){const an=i/12*Math.PI*2;ctx.beginPath();ctx.moveTo(Math.sin(an)*128,-Math.cos(an)*128);ctx.lineTo(Math.sin(an)*140,-Math.cos(an)*140);stroke(3,'rgba(230,199,156,.6)')}
  const sw=eIO(prog(t,24.4,1.2))*.12;ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,118,-Math.PI/2,-Math.PI/2+sw*Math.PI*2);ctx.closePath();ctx.fillStyle='rgba(230,199,156,.25)';ctx.fill();
  const an=-Math.PI/2+sw*Math.PI*2;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(an)*110,Math.sin(an)*110);stroke(4,GOLD2);ctx.beginPath();ctx.arc(0,0,7,0,7);ctx.fillStyle=GOLD2;ctx.fill();
  const ok=eOB(prog(t,28.9,.5),2.4);if(ok>0){softGlow(0,0,220,.5*ok);ring(0,0,150+40*ok,2,GOLD,1-prog(t,29.0,.5))}ctx.restore()}
 ctx.restore()}
function S5(t){const A=env(t,29.4,34.4);if(!A)return;ctx.save();ctx.globalAlpha=A;
 line([['النبيُّ',29.46]],560,60,t,{w:400});saw(CX-110,560,60,eO(prog(t,29.6,.4)));
 txt('يقول لك:',CX,640,54,{...reveal(t,29.88,.4),w:400,c:GOLD2});
 line([['هذا',30.3],['الرجل',30.46],['دعا',30.8],['الله',31.1]],770,74,t);
 line([['باسمه',31.26],['الأعظم',31.64,1]],900,110,t);
 line([['الذي',32.1],['إذا',32.44],['دُعي',32.6],['به',32.9],['أجاب',33.08,1]],1050,64,t,{w:400});
 line([['وإذا',33.46],['سُئل',33.64],['به',33.92],['أعطى',34.08,1]],1150,64,t,{w:400});
 star8(CX,VIS_Y+90,120,t*.1,eIO(prog(t,29.6,1.2)),.6);softGlow(CX,VIS_Y+90,260,.25*eO(prog(t,31.6,.6)));ctx.restore()}
function S6(t){const A=env(t,34.4,40.0);if(!A)return;ctx.save();ctx.globalAlpha=A;
 line([['فاحفظ',34.48,1],['هذه',34.9],['الكلمات',35.08],['عندك',35.52],['زين',35.84]],600,74,t);
 line([['واستفتح',36.36],['فيها',36.68],['دائمًا',36.96],['دعاءك',37.26]],740,70,t,{w:400});
 line([['لأنها',38.08],['قد',38.38],['تكون',38.7],['سببًا',39.04],['في',39.32],['استجابته',39.44,1]],880,66,t,{w:400});
 // mini du'a card that gets "kept"
 const c=eOB(prog(t,34.6,.5),1.8);if(c>0){ctx.save();ctx.translate(CX,VIS_Y);ctx.scale(c,c);ctx.beginPath();ctx.roundRect(-330,-150,660,300,26);ctx.fillStyle='rgba(248,246,239,.06)';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='rgba(230,199,156,.6)';ctx.stroke();
  ctx.font='700 40px Am';ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=BONE;
  ctx.fillText('اللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنِّي أَشْهَدُ أَنَّكَ أَنْتَ اللَّهُ',0,-80);ctx.fillText('لَا إِلَهَ إِلَّا أَنْتَ الأَحَدُ الصَّمَدُ',0,-12);ctx.fillText('الَّذِي لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',0,56);
  const hl=eIO(prog(t,36.4,.8));if(hl>0){ctx.beginPath();ctx.roundRect(-330,-150,660*1,300,26);ctx.lineWidth=3;ctx.strokeStyle=GOLD;ctx.setLineDash([1900]);ctx.lineDashOffset=1900*(1-hl);ctx.stroke();ctx.setLineDash([])}ctx.restore()}
 ctx.restore()}
function bookmark(x,y,s,fill,a){ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.scale(s,s);ctx.beginPath();ctx.moveTo(-55,-80);ctx.lineTo(55,-80);ctx.lineTo(55,85);ctx.lineTo(0,45);ctx.lineTo(-55,85);ctx.closePath();
 if(fill>0){ctx.save();ctx.clip();ctx.fillStyle=GOLD;ctx.fillRect(-60,85-170*fill,120,170*fill);ctx.restore()}stroke(5);ctx.restore()}
function plane(x,y,s,rot,a){ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);ctx.beginPath();ctx.moveTo(-70,10);ctx.lineTo(80,-50);ctx.lineTo(20,70);ctx.lineTo(5,25);ctx.closePath();ctx.fillStyle='rgba(248,246,239,.08)';ctx.fill();stroke(5);ctx.beginPath();ctx.moveTo(5,25);ctx.lineTo(80,-50);stroke(3);ctx.restore()}
function S7(t){const A=env(t,40.0,47.0);if(!A)return;ctx.save();ctx.globalAlpha=A;
 line([['احفظ',40.04,1],['هذا',40.48],['المقطع',40.66],['عندك',41.0]],580,72,t);
 line([['عشان',41.3],['ترجع',41.54],['له',41.9]],690,64,t,{w:400});
 line([['وأرسله',42.16,1],['لشخص',43.18],['يعزّ',43.56],['عليك',43.78]],820,72,t);
 line([['لعلّه',44.16],['يدعو',44.82],['لك',45.14],['فيه',45.42]],950,64,t,{w:400});
 line([['فيُستجاب',45.8,1],['دعاؤه',46.24]],1070,80,t,{ul:false});
 const bm=eOB(prog(t,40.1,.45),2);bookmark(CX+150,VIS_Y,bm,eIO(prog(t,40.5,.6)),1);
 const pk=prog(t,42.3,1.6);const px=lerp(CX-120,CX-420,eIO(pk)),py=lerp(VIS_Y+10,VIS_Y-260,eIO(pk))+Math.sin(pk*Math.PI)*-60;
 if(t>42.1){plane(px,py,eOB(prog(t,42.1,.4),2)*(1-prog(t,43.6,.3)*.3),-.2-pk*.3,1);ctx.save();ctx.setLineDash([8,12]);ctx.beginPath();ctx.moveTo(CX-120,VIS_Y+10);ctx.quadraticCurveTo(CX-240,VIS_Y-180,px,py);ctx.globalAlpha*=.5*eO(pk);stroke(3);ctx.restore()}
 ctx.restore()}
function outro(t){if(t<46.9)return;const k=prog(t,47.0,.6);ctx.save();ctx.globalAlpha=eO(k)*(1-prog(t,DUR-.5,.45));const y=960;ctx.font='700 54px In';ctx.textBaseline='middle';
 ctx.fillStyle=BONE;ctx.textAlign='right';ctx.fillText('20',CX-150,y-34);ctx.fillStyle=GOLD;ctx.fillText('26',CX-150,y+34);ctx.fillStyle=BONE;ctx.fillRect(CX-134,y-66,3,132*eIO(prog(t,47.1,.5)));
 ctx.textAlign='left';ctx.letterSpacing='6px';ctx.fillStyle=GOLD;ctx.fillText('CRAFTED BY',CX-112+30*(1-eO(k)),y-34);ctx.fillStyle=BONE;ctx.fillText('@SUD.REELS',CX-112+50*(1-eO(prog(t,47.05,.6))),y+34);ctx.restore()}
window.SFX=[[0,'room'],[0.1,'line'],[2.1,'air'],[4.6,'whoosh'],[4.75,'swell'],[10.12,'bloom'],[14.1,'whoosh'],[19.45,'bloom'],[21.5,'air'],[22.75,'ticks'],[23.2,'whoosh'],[24.4,'ticks'],[28.9,'air'],[29.4,'whoosh'],[31.6,'swell'],[34.4,'whoosh'],[36.4,'line'],[40.0,'whoosh'],[40.5,'tick'],[42.2,'air'],[45.8,'swell'],[47.0,'sub_soft'],[47.1,'line']];
function draw(t){ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';ctx.globalAlpha=1;bg(t);S1(t);S2(t);S3(t);S4(t);S5(t);S6(t);S7(t);outro(t);
 ctx.globalAlpha=.45;ctx.font='700 26px In';ctx.textAlign='center';ctx.fillStyle=BONE;ctx.letterSpacing='4px';if(t<46.8)ctx.fillText('@SUD.REELS',CX,1800);ctx.letterSpacing='0px';ctx.globalAlpha=1;
 ctx.drawImage(GR[Math.floor(t*24)%4],0,0,W,H);const f=prog(t,DUR-.4,.4);if(f>0){ctx.globalAlpha=f;ctx.fillStyle=BG_OUT;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}}
window.render=t=>{draw(t);return cv.toDataURL('image/png')};
window.drawCover=()=>{ctx.setTransform(1,0,0,1,0,0);ctx.filter='none';bg(3);
 txt('دعاءٌ قال عنه النبي',CX,560,64,{w:400});saw(CX,650,80,1);
 txt('دعا اللهَ باسمه',CX,800,110);txt('الأعظم',CX,960,170,{c:GOLD,glow:30});
 softGlow(CX,1330,300,.35);star8(CX,1330,150,.3,1,.8);star8(CX,1330,210,-.2,1,.35,2);ctx.beginPath();ctx.arc(CX,1330,12,0,7);ctx.fillStyle=GOLD2;ctx.fill();
 ctx.drawImage(GR[0],0,0,W,H);return cv.toDataURL('image/png')};
