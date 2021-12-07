import yt_dlp
import sys
from os.path import expanduser
import path
home=expanduser("~")

option,id=sys.argv[1].split('?')
option=option.split('/')[2]
ydl_opts={
    'outtmpl':home+r'\Downloads\%(title)s.%(ext)s',
    'cookiefile':path.cookiefile,
    'writethumbnail':True,
    'postprocessors':[
        {
            'key': 'EmbedThumbnail'
        }
    ]
}

print(option)

if option=='video':
    ydl_opts.setdefault('format','bestvideo[ext!=webm]+bestaudio[ext!=webm]')
elif option=='audio':
    ydl_opts.setdefault('format','bestaudio[ext!=webm]')

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    ydl.download(id)