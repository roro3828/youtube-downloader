import youtube_dl
import sys
from os.path import expanduser
home=expanduser("~")

id=sys.argv[1].split(':')[-1]
ydl_opts = {
    'outtmpl':home+r'\Downloads\%(title)s-%(id)s.%(ext)s'
    }
with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download(id)