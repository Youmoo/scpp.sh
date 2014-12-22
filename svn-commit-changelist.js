#!/usr/local/bin/node
//提交scpp下的所有文件到线上服务器
require('shelljs/global');
console.log("工作目录: " + __dirname);

//允许哪些类型文件上传
var allowedFileType = /\.(js|jsp|html|png|gif|jpg|txt)$/;
//允许上传哪个路径下的文件
var allowedPaths = /\/src\/main\/webapp/;
//本地web目录到线上目录的映射
var moduleServerPaths = {
    "app/web1": "user_name@server_ip:/data/project/qn1-web-webapp/code/",
    "app/web2": "user_name@server_ip:/data/project/qn1-webapp/code/"
};
//获取修改列表
var changeList = exec("svn status", {silent: true});
if (changeList.code != 0) {
    console.error("执行 svn status 出错.退出..");
    return;
}
if (!/--- Changelist 'scpp'/.test(changeList.output)) {
    console.error("scpp列表为空,退出..");
    return;
}
//过滤出scpp下的修改列表
changeList = changeList.output.replace(/(.|\n)+--- Changelist 'scpp':\n/, '').replace(/---(.|\n)*/, '');

console.log("\nchangle list 过滤前: ");
console.log(changeList);
var pathMapping = {};
changeList = changeList.split(/\s+/).filter(function (v, i) {
    if (i % 2 == 0) {
        return false;
    }
    if (!allowedFileType.test(v)) {
        return false;
    }
    if (!allowedPaths.test(v)) {
        return false;
    }
    return Object.keys(moduleServerPaths).some(function (path) {
        if (v.indexOf(path) == 0) {//符合路径规则
            pathMapping[v] = moduleServerPaths[path];
            return true;
        }
    });
});
console.log("\nchangle list 过滤后: ");
console.log(changeList);

var scpList = changeList.map(function (file) {
    return ["scp -r", file, pathMapping[file] + file.replace(/.*\/src\/main\/webapp\//, "")].join(" ")
});
console.log("\nscp 命令预览:");
console.log(scpList);

true && scpList.forEach(function (command) {
    console.log("\n执行 ==> ", command, exec(command).code == 0 ? "成功" : "失败");
});
