#!/bin/sh
cd /Users/michaelchan/Data_michaelychen/Workspace/java-workspace/WebDev-Blog/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log