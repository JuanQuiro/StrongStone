import os as OS
import re as RE
import sys as SYS 

def refactor_name_file(name_file):
    #name = OS.path.splitext(name_file)[0] get the name without the extention
    refactor_name = RE.sub(r"[^a-zA-Z0-9_. ]", "", str(name_file)) # Remove Special Characters from a String Using re.sub()
    refactor_name = RE.sub(r" ", "_", str(refactor_name))
    return refactor_name.lower()

root_path = OS.getcwd() + chr(92)  #chr(92) = \ #chr(47) = /

for subdir, dirs, files in OS.walk(root_path):
    subdirectoryPath = OS.path.relpath(subdir, root_path) #get the path to your subdirectory
    for file in OS.listdir(subdirectoryPath):
        path  = subdirectoryPath + chr(92) + file
        newPath = subdirectoryPath + chr(92) + refactor_name_file(file)
        OS.rename(path,newPath)