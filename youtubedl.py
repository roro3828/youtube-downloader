import youtube_dl
import sys
from os.path import expanduser
home=expanduser("~")

id=sys.argv[1].split(':')[-1]
ydl_opts = {
    'outtmpl':home+r'\Downloads\%(title)s.%(ext)s',
    'format':'bestvideo[ext!=webm]+bestaudio[ext!=webm]'
    }
with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download(id)