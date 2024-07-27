import re
import os
import glob
import base64
import shutil

if (len(glob.glob('./dist/*.js')) == 0):
    raise Exception('No javascript files found')

file = open("./dist/index.html", "r+")

content = file.read()

jsFileName = re.search("(?<=src=\.\/).*?\.js", content)[0]
jsFile = open(f"./dist/{jsFileName}")
js = jsFile.read().replace('\\n', '\\\\n')

spriteSheetName = re.search("(?<=src=\.\/assets\/).*?(?= )", content)[0]

with open(f"./dist/assets/{spriteSheetName}", 'rb') as image_file:
    base64_bytes = base64.b64encode(image_file.read())

    spriteSheetData = base64_bytes.decode()
    spriteSheetData = f'"data:image/png;base64, {spriteSheetData}"'

replaced = re.sub("\ssrc=.*?\.js", "", content)
replaced = re.sub("(?<=src=)\.\/assets\/.*?(?= )", spriteSheetData, replaced)
replaced = re.sub("(?<=true>)(?=<\/script)", js, replaced)

file.seek(0)
file.write(replaced)

file.close()
jsFile.close()

os.remove(f'./dist/{jsFileName}')
os.remove(f'./dist/{jsFileName}.map')
shutil.rmtree(f'./dist/assets/')