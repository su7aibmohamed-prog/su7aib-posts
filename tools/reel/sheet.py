import sys;from PIL import Image
fs=sys.argv[2:];ims=[Image.open(f).resize((360,640)) for f in fs];n=5
S=Image.new('RGB',(360*n,640*((len(ims)+n-1)//n)),'white')
for i,im in enumerate(ims):S.paste(im,((i%n)*360,(i//n)*640))
S.save(sys.argv[1])
