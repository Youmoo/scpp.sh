#!/bin/bash
# @author youmoolee@gmail.com
# https://github.com/Youmoo/scpp.sh

# 待上传文件的绝对路径
filePath=$1

# unused,文件扩展名,应该只允许js/jsp/img/css等静态文件的上传,这里未做限制
fileExt=$2

# 定义输出颜色
purple='\033[0;35m'
# No Color
NC='\033[0m'

function log {
    echo -e "[${purple}${1}${NC}]==> ${2}"
}
log 绝对路径 $filePath

# 待上传文件必须位于此目录下
pathFilter="/src/main/webapp"

if [[ !("$filePath" =~ "$pathFilter") ]]; then
    log 错误 "绝对路径必须包含 ${pathFilter}";
    exit 1;
fi

# 项目路径
projectPath="${filePath//\/src\/main\/webapp[a-zA-Z\/\-.]*/}"
if [ ! -f ${projectPath}/scpp.properties ]; then
    log 资源文件 "${projectPath}/scpp.properties 不存在!"
    exit 1
fi
# 读取项目路径下的配置文件
. $projectPath/scpp.properties

log 项目路径 $projectPath
log 线上路径 $serverPath

# 将 *./src/main/webapp/robots.txt 转换为 robots.txt
tomcatPath="${filePath//[a-zA-Z\/\-.]*webapp\//}"

log 执行命令 "scp -r ${filePath} ${purple}${serverPath}/${tomcatPath}${NC}"
# 执行scp
scp -r $filePath $serverPath/$tomcatPath
