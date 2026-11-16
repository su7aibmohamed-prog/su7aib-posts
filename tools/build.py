"""SU7IAB hadith card builder. Usage: python3 build.py spec.json out.png"""
import json,sys,asyncio,os
from playwright.async_api import async_playwright
D=os.path.dirname(os.path.abspath(__file__))+"/f/"
s=json.load(open(sys.argv[1]))
DARK=s.get("theme")=="dark"
ACC,INK,BG,TX,EN=("#E6C79C","#F8F6EF","#791C2E","#F8F6EF","#F8F6EF") if DARK else ("#8E5BD0","#030202","#F9F6EF","#161511","#0b0e0f")
saw=f"<span style='font-family:Saw;color:{ACC}'>ﷺ</span>"
eng=s["english"].replace("ﷺ",saw)
dia=f"<span style='color:{ACC}'><span style='font-size:.7em'>◆</span>|</span>"
html=f"""<meta charset=utf-8><style>
@font-face{{font-family:Naskh;font-weight:500;src:url({D}amiri-arabic-400-normal.woff2)}}
@font-face{{font-family:Naskh;font-weight:700;src:url({D}amiri-arabic-700-normal.woff2)}}
@font-face{{font-family:NS;font-weight:500;src:url({D}noto-sans-latin-500-normal.woff2)}}
@font-face{{font-family:IN;font-weight:700;src:url({D}inter-latin-700-normal.woff2)}}
@font-face{{font-family:Saw;src:url({D}amiri-quran-arabic-400-normal.woff2)}}
html,body{{margin:0}}
#p{{width:1933px;height:2560px;background:{BG};position:relative;overflow:hidden}}
.hd{{position:absolute;left:295px;top:278px;display:flex;align-items:stretch;font:700 27px/34px IN;letter-spacing:.12em;color:{INK}}}
.yr{{color:{INK};text-align:right;padding-right:10px;border-right:2px solid {INK};letter-spacing:.06em}}
.yr b{{display:block;color:{ACC}}}
.cb{{padding-left:11px}} .cb .r{{color:{ACC}}}
.c{{position:absolute;left:399px;width:1136px;top:50%;transform:translateY(-50%)}}
.ar{{direction:rtl;font:700 84px/150px Naskh;color:{INK}}}
.ar .h{{font-size:72px;text-align:right}}
.j{{text-align:justify;text-align-last:justify;white-space:nowrap}}
.acc{{color:{ACC}}}
.nar{{direction:rtl;font:500 {s.get("nar_size",38)}px Naskh,NS;color:{TX};margin-top:40px}}
.en{{font:500 40px/50px NS;color:{EN};text-align:justify;margin-top:52px}}
</style><div id=p>
<div class=hd><div class=yr>20<b>26</b></div><div class=cb><div class=r>CRAFTED BY</div><div>@SU7AIB.7</div></div></div>
<div class=c>
 <div class=ar><div class=h>قال رسول الله {saw} :</div>
  <div class=j>{s['black']}</div>
  <div class="j acc">{s['accent']}<span style='color:{INK}'>.</span></div></div>
 <div class="nar j">{dia} الراوي : {s['narrator']} {dia} المصدر : {s['source']} {dia} الصفحة أو الرقم: {s['number']}</div>
 <div class=en>{eng}</div>
</div></div>"""
open(D+"../page.html","w").write(html)
async def m():
    async with async_playwright() as p:
        kw={}
        if os.path.exists('/usr/bin/google-chrome'): kw['executable_path']='/usr/bin/google-chrome'
        b=await p.chromium.launch(**kw)
        pg=await b.new_page(viewport={'width':1933,'height':2560})
        await pg.goto('file://'+D+'../page.html'); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(400)
        await pg.locator('#p').screenshot(path=sys.argv[2]); await b.close()
asyncio.run(m())
