import numpy as np,json,wave
from scipy.signal import butter,sosfilt
SR=48000;D=20;N=int(SR*D);L=np.zeros(N);R=np.zeros(N);g=np.random.default_rng(3)
def T(d):return np.arange(int(d*SR))/SR
def bp(x,lo,hi):return sosfilt(butter(2,[lo,hi],'band',fs=SR,output='sos'),x)
def lp(x,f):return sosfilt(butter(2,f,'low',fs=SR,output='sos'),x)
def hp(x,f):return sosfilt(butter(2,f,'high',fs=SR,output='sos'),x)
def ad(t,a,d):return np.minimum(1,t/a)*np.exp(-t/d)
def sweep(f0,f1,t):return np.sin(2*np.pi*np.cumsum(np.geomspace(f0,f1,len(t)))/SR)
def impact(big=1.):t=T(1.6);s=sweep(90,38,t)*ad(t,.002,.35*big)+.5*lp(g.standard_normal(len(t)),900)*ad(t,.001,.05);return s,0
def impact_s():t=T(.6);s=sweep(140,60,t)*ad(t,.002,.12)+.6*bp(g.standard_normal(len(t)),800,5000)*ad(t,.001,.02);return s*.7,0
def shatter():
    t=T(1.3);s=hp(g.standard_normal(len(t)),3000)*ad(t,.001,.12)*.6
    for k in range(14):
        o=int(g.uniform(0,.5)*SR);f=g.uniform(2500,6500);tt=T(.25);p=np.sin(2*np.pi*f*tt)*ad(tt,.0005,.04)*g.uniform(.2,.5)
        s[o:o+len(p)]+=p[:len(s)-o]
    return s,0
def bands(x,fs):
    K=len(fs);y=np.zeros_like(x)
    for i,f in enumerate(fs):
        q=slice(i*len(x)//K,(i+1)*len(x)//K);y[q]=bp(x,f,min(f*1.8,20000))[q]
    return y
def whoosh(d=.5,lo=300,hi=3000):
    t=T(d);y=bands(g.standard_normal(len(t)),np.geomspace(lo,hi,8))
    return lp(y,6000)*np.sin(np.pi*t/d)**2*1.4,.6
def riser(d=1.0,lo=200,hi=4000):
    t=T(d);y=bands(g.standard_normal(len(t)),np.geomspace(lo,hi,14));return y*(t/d)**2*1.2,0
def reverse():return riser(.9,300,6000)
def sub(d=1.2,f=45):t=T(d);return np.sin(2*np.pi*f*t)*ad(t,.01,d/3)*.9,0
def tick():t=T(.05);return np.sin(2*np.pi*3200*t)*ad(t,.0005,.008)*.5,0
def ticks():
    s=np.zeros(int(1.4*SR))
    for k in range(10):
        o=int(k*.11*SR);a,_=tick();s[o:o+len(a)]+=a*(1-k/12)
    return s,.8
def air():s,_=whoosh(.7,500,5000);return s*.45,.5
def line():t=T(.8);x=bp(g.standard_normal(len(t)),4000,9000);return x*np.sin(np.pi*t/.8)*.35,.3
def stretch():
    t=T(1.6);y=bands(g.standard_normal(len(t)),np.geomspace(150,1500,16))*np.sin(np.pi*t/1.6)
    return y+.25*np.sin(2*np.pi*(55+15*t)*t)*np.sin(np.pi*t/1.6),0
def swell():t=T(1.6);x=lp(g.standard_normal(len(t)),1200);return x*np.sin(np.pi*t/1.6)**1.5*.8,0
def bloom():
    t=T(2.5);x=bp(g.standard_normal(len(t)),2000,7000)*ad(t,.02,.5)*.25
    return x+np.sin(2*np.pi*48*t)*ad(t,.01,.5)*.6+.3*lp(g.standard_normal(len(t)),500)*ad(t,.02,.3),0
def sub_soft():return sub(1.8,42)[0]*.7,0
def room():t=T(D);return lp(g.standard_normal(len(t)),260),0
F=dict(impact=impact,impact_big=lambda:impact(1.8),impact_s=impact_s,shatter=shatter,whoosh=whoosh,riser_s=lambda:riser(.45,400,5000),reverse=reverse,sub=sub,tick=tick,ticks=ticks,air=air,line=line,stretch=stretch,swell=swell,bloom=bloom,sub_soft=sub_soft,room=room)
GAIN=dict(room=.07,impact=1,impact_big=1.3,impact_s=.8,shatter=.55,whoosh=.7,riser_s=.5,reverse=.6,sub=.9,tick=.6,ticks=.5,air=.5,line=.5,stretch=.6,swell=.6,bloom=.8,sub_soft=.8)
for t0,k in json.load(open('sfx.json')):
    s,w=F[k]();s=s/max(1e-9,np.abs(s).max())*GAIN[k]
    if k=='room':
        tt=np.arange(len(s))/SR;s=s*(1-.8*np.clip((tt-5.9)/.3,0,1)*np.clip((7.0-tt)/.3,0,1))*np.clip(tt/.3,0,1)
    i=int(t0*SR);n=min(len(s),N-i)
    pan=np.sin(np.arange(n)/SR*2.1)*w*.5 if w else 0
    L[i:i+n]+=s[:n]*(1-pan);R[i:i+n]+=s[:n]*(1+pan)
m=np.stack([L,R],1);m=m/np.abs(m).max()*.89
w=wave.open('raw.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((m*32767).astype(np.int16).tobytes());w.close()
