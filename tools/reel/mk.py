"""Wrap a reel script into page.html with embedded fonts. Usage: python3 mk.py scene.js"""
import base64,sys,os
D=os.path.dirname(os.path.abspath(__file__));F=D+'/../f/'
b=lambda f:base64.b64encode(open(F+f,'rb').read()).decode()
ff=[('Am',400,'amiri-arabic-400-normal.woff2'),('Am',700,'amiri-arabic-700-normal.woff2'),('Saw',400,'amiri-quran-arabic-400-normal.woff2'),
    ('Px',500,'ibm-plex-sans-arabic-arabic-500-normal.woff2'),('Px',700,'ibm-plex-sans-arabic-arabic-700-normal.woff2'),('In',700,'inter-latin-700-normal.woff2')]
css=''.join(f"@font-face{{font-family:{n};font-weight:{w};src:url(data:font/woff2;base64,{b(p)})}}" for n,w,p in ff)
loads="await document.fonts.load('700 90px Am');await document.fonts.load('400 58px Am');await document.fonts.load('64px Saw');await document.fonts.load('500 34px Px');await document.fonts.load('700 40px In');"
html=f"""<meta charset="utf-8"><style>{css}body{{margin:0}}</style><canvas id=c width=1080 height=1920></canvas><script>
{open(sys.argv[1]).read()}
window.ready=(async()=>{{{loads}await document.fonts.ready;return ['700 90px Am','64px Saw','500 34px Px','700 40px In'].every(f=>document.fonts.check(f))}})();</script>"""
open(D+'/page.html','w').write(html)
