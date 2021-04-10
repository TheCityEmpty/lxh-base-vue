#! /bin/sh

set -e
echo '上传代码至gitHub'
git status

git add .

read -p '请输入提交msg:' commitMsg

git commit -m $commitMsg

git push

echo '本次提交已完成....'