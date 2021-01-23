
const fs = require('fs');

const path = require('path');
const api = require('./api');
const iconv = require('iconv-lite')
const automd = require('./auto-md');



//获取题目的 pid
let pid = 1000
//源码，如果未指定的话，则使用
let sourceCode = ''
let target = ''
process.argv.forEach((val, index) => {
    //读取题目pid
    if (val.match(/--pid=(.*)/)) {
        pid = val.match(/--pid=(.*)/)[1]
    }
    if (val.match(/--target=(.*)/)) {
        target = val.match(/--target=(.*)/)[1]
    }
    //读取源码
    if (val.match(/--code=(.*)/)) {
        let code_path = val.match(/--code=(.*)/)[1]

        if (path.isAbsolute(code_path)) {
            if (fs.existsSync(code_path)) {
                sourceCode = iconv.decode(fs.readFileSync(code_path),'gbk')
            } else {
                console.log("文件不存在！");
            }
        } else {
            let absolute_path = path.resolve(process.cwd(), code_path)
            if (fs.existsSync(absolute_path)) {
                sourceCode = iconv.decode(fs.readFileSync(absolute_path),'gbk')
            } else {
                console.log("文件不存在！");
            }
        }
    }
});

try {
    pid = parseInt(pid)
} catch (error) {
    console.log("pid 参数错误！");
}
//发送请求
const url = 'http://acm.hdu.edu.cn/showproblem.php?pid=' + pid
api(url).then((data) => {
    automd({
        url,pid,data,sourceCode,target
    })
}).catch((err) => {
    console.log(err)
});



