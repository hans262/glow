#!/bin/sh -l

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

# Checks to see if the remote exists prior to deploying.
# If the branch doesn't exist it gets created here as an orphan.
# 统计输出行数 wc -l
# -eq 对比相等的意思
if [ "$(git ls-remote --heads "$REPOSITORY_PATH" "$BRANCH" | wc -l)" -eq 0 ];
then
  echo "Creating remote branch ${BRANCH} as it doesn't exist..."
  git checkout main && \
  git checkout --orphan $BRANCH && \
  git rm -rf . && \
  touch README.md && \
  git add README.md && \
  git commit -m "Initial ${BRANCH} commit" && \
  git push $REPOSITORY_PATH $BRANCH
  # 上一条命令的执行失败则退出
  if [ $? -ne 0 ];
  then
    echo "create remote branch failed..."
    exit 1
  fi
fi

# Checks out the base branch to begin the deploy process.
git checkout main && \

# Builds the project if a build script is provided.
echo "Running build scripts... $BUILD_SCRIPT" && \
eval "$BUILD_SCRIPT" && \
cp build/index.html build/404.html && \

# Commits the data to Github.
echo "Deploying to GitHub..." && \
git add -f $FOLDER && \

git commit -m "Deploying to ${BRANCH} from main ${GITHUB_SHA}" --quiet && \
# 获取docs文件夹的hash值，只提交docs文件夹到branch分支
git push $REPOSITORY_PATH `git subtree split --prefix $FOLDER main`:$BRANCH --force && \
echo "Deployment succesful!"

# ${BASE_BRANCH:-main}