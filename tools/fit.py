"""Stretch letters (kashida) so each hadith line fills the width.
Usage: python3 fit.py spec.json   (mark one stretch point per word with | in black/accent)"""
import json,sys,asyncio,os
from playwright.async_api import async_playwright
D=os.path.dirname(os.path.abspath(__file__))+"/f/"
s=json.load(open(sys.argv[1])); T=1136-70
open(D+"../fit.html","w").write(f"<style>@font-face{{font-family:A;font-weight:700;src:url({D}amiri-arabic-700-normal.woff2)}}</style><span id=s style='font:700 84px A;direction:rtl;white-space:nowrap'>ا</span>")
async def m():
  async with async_playwright() as p:
    kw={}
    if os.path.exists('/usr/bin/google-chrome'): kw['executable_path']='/usr/bin/google-chrome'
    b=await p.chromium.launch(**kw); pg=await b.new_page()
    await pg.goto('file://'+D+'../fit.html'); await pg.evaluate("document.fonts.ready")
    async def w(t): return await pg.evaluate("t=>{const e=document.getElementById('s');e.textContent=t;return e.getBoundingClientRect().width}",t)
    for k in ("black","accent"):
      src=s.get(k+"_src",s[k]); s[k+"_src"]=src
      parts=src.split("|"); n=len(parts)-1; ks=[0]*n
      mk=lambda: parts[0]+"".join("ـ"*ks[i]+parts[i+1] for i in range(n))
      i=0
      while n:
        ks[i%n]+=1
        if await w(mk()+("." if k=="accent" else ""))>T: ks[i%n]-=1; break
        i+=1
      s[k]=mk(); print(k,ks,round(await w(s[k])))
    await b.close()
asyncio.run(m())
json.dump(s,open(sys.argv[1],"w"),ensure_ascii=False)
