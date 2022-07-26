#!/bin/sh -l

set -e

echo "哈哈哈"

if [ -z "$ACCESS_TOKEN" ]
then
  echo "必须设置仓库的ACCESS_TOKEN环境变量s"
  exit 1
fi

if [ -z "$BRANCH" ]
then
  echo "必须设置将内容发布到哪个分支"
  exit 1
fi

if [ -z "$FOLDER" ]
then
  echo "You must provide the action with the folder name in the repository where your compiled page lives."
  exit 1
fi

case "$FOLDER" in /*|./*)
  echo "The deployment folder cannot be prefixed with '/' or './'. Instead reference the folder name directly."
  exit 1
esac
