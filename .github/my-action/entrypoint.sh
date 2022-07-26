#!/bin/sh -l
echo "开始工作"
git --version && \
git status && \
node -v && \
npm -v && \

set -e

if [ -z "$ACCESS_TOKEN" ]
then
  echo "必须设置仓库的ACCESS_TOKEN环境变量"
  exit 1
fi

if [ -z "$BRANCH" ]
then
  echo "请设置发布到哪个分支"
  exit 1
fi

if [ -z "$FOLDER" ]
then
  echo "选择哪个文件夹进行发布"
  exit 1
fi

case "$FOLDER" in /*|./*)
  echo "文件夹名，不能以/或者./开头"
  exit 1
esac

# 安装git
apt-get update && \
apt-get install -y git && \

# 进入工作区目录
cd $GITHUB_WORKSPACE && \

# 初始化git
git init && \
git config --global user.email 771565119@qq.com && \
git config --global user.name hans && \

# 使用令牌访问github仓库
REPOSITORY_PATH="https://${ACCESS_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" && \

# 检查发布分支是否存在，不存在则创建
# wc -l统计输出行数，-eq对比相等
if [ "$(git ls-remote --heads "$REPOSITORY_PATH" "$BRANCH" | wc -l)" -eq 0 ];
then
  echo "Creating remote branch ${BRANCH} as it doesn't exist..."
  git checkout $BASE_BRANCH && \
  git checkout --orphan $BRANCH && \
  git rm -rf . && \
  touch README.md && \
  git add README.md && \
  git commit -m "Initial ${BRANCH} commit" && \
  git push $REPOSITORY_PATH $BRANCH
  # 上一条命令的执行失败则退出
  if [ $? -ne 0 ];
  then
    echo "创建发布分支失败"
    exit 1
  fi
fi

# 切换到主分支
git checkout $BASE_BRANCH && \

git branch -a && \
echo "发布成功！"

# # 执行编译脚本
# echo "Running build scripts... $BUILD_SCRIPT" && \
# eval "$BUILD_SCRIPT" && \

# # gh-page 不支持history路由的应对策略
# cp build/index.html build/404.html && \

# # 提交到git
# echo "Deploying to GitHub..." && \
# git add -f $FOLDER && \
# git commit -m "Deploying to ${BRANCH} from $BASE_BRANCH ${GITHUB_SHA}" --quiet && \

# # 获取文件夹的hash值，只提交文件夹到发布分支
# git push $REPOSITORY_PATH `git subtree split --prefix $FOLDER $BASE_BRANCH`:$BRANCH --force && \

# echo "发布成功！"