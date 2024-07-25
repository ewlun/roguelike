import re
import os
import glob

if (len(glob.glob('./dist/*.js')) == 0):
    raise Exception('No javascript files found')

file = open("./dist/index.html", "r+")

content = file.read()

jsFileName = re.search("(?<=src=\.\/).*?\.js", content)[0]
jsFile = open(f"./dist/{jsFileName}")
js = jsFile.read().replace('\\n', '\\\\n')

replaced = re.sub("\ssrc=.*?\.js", "", content)
replaced = re.sub("(?<=true>)(?=<\/script)", js, replaced)

file.seek(0)
file.write(replaced)

file.close()
jsFile.close()

os.remove(f'./dist/{jsFileName}')
os.remove(f'./dist/{jsFileName}.map')