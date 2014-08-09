#!/usr/bin/env python3

import os, fnmatch

def find_and_replace (pattern, replacement, arr):
    for i in range (len (arr)):
        if arr[i].find (pattern) != -1:
            index = arr[i].find (pattern)
            begin = arr[i][:index]
            rec_doc = [arr[i][index + len (pattern):]]
            temp = begin + replacement
            result = find_and_replace (pattern, replacement, rec_doc)
            arr[i] = temp + str (result[0])
            print (temp)
    return(arr)

def locate (pattern, root=os.curdir):
    '''Locate all files matching supplied filename'''
    arr = []
    for path, dirs, files in os.walk (os.path.abspath (root)):
        for filename in fnmatch.filter (files, pattern):
            arr.append (path + '/' + filename)
    return arr


os.system ('sudo cp -r * /home/riley/site/')

os.chdir ('/home/riley/site')

for indexfile in  locate ('index.html'):
    contents = open (indexfile, 'r').readlines ()
    contents = find_and_replace ('index.html','',contents)
    f = open (indexfile, 'w')
    f.truncate ()
    f.writelines (contents)
    f.close ()
