#!/bin/bash
# Downloads all fonts used by build.py (cards) and reel/ (videos) into tools/f
cd "$(dirname "$0")" && mkdir -p f && T=$(mktemp -d) && cd $T
for p in amiri noto-sans amiri-quran inter ibm-plex-sans-arabic scheherazade-new; do npm pack @fontsource/$p >/dev/null 2>&1; done
for t in *.tgz; do mkdir -p x && tar xzf $t -C x && cp x/package/files/*.woff2 "$OLDPWD/f/" 2>/dev/null; rm -rf x; done
