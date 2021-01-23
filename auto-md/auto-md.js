const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//如果未指定名字，默认 README.md
function checkFile(file_name) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(file_name || 'README.md')) {
            rl.question('此目录下已有README.md文件，是否替换里面的内容 (Y/N)：', (answer) => {
                // TODO：将答案记录在数据库中。
                if (answer === 'Y' || answer === 'y') resolve(file_name || 'README.md')
                else process.exit(0)
                rl.close();
            });
        } else {
            resolve(file_name || 'README.md')
        }
    });
}

//创建 md 文件
module.exports = async (opt) => {
    let pid = opt.pid
    let url  = opt.url
    let data= opt.data
    let sourceCode= opt.sourceCode
    let target = opt.target&&opt.target!==''?opt.target : undefined;
    let file_name = await checkFile(target)
    let md = `
# ${data.title}
> 页面数据来自(this page from)： [${url}](${url})

- Time Limit: ${data.TimeLimit}  (Java/Others)
- Memory Limit:   ${data.MemoryLimit}  (Java/Others)

## Problem Description
<div style="background-color:#f8f8f8">
${data.ProblemDescription}
</div>

## Input
<div style="background-color:#f8f8f8">
${data.Input}
</div>

## Output
<div style="background-color:#f8f8f8">
${data.Output}
</div>

## Sample Input
\`\`\`
${data.SampleInput}
\`\`\`

## Sample Output
\`\`\`
${data.SampleOutput}
\`\`\`

## Author
<pre style="background-color:#f8f8f8">
${data.Author}
</pre>

[Statistic](http://acm.hdu.edu.cn/statistic.php?pid=${pid}) **|** [Submit](http://acm.hdu.edu.cn/submit.php?pid=${pid}) **|** [Discuss](http://acm.hdu.edu.cn/discuss/problem/list.php?problemid=${pid}) **|** [Note](http://acm.hdu.edu.cn/note/note.php?pid=${pid})

${sourceCode !== '' ? `
## Source Code
\`\`\`cpp
${sourceCode}
\`\`\`
` : ''}
`;
    fs.writeFile(file_name, md, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("创建成功！");
        }
        process.exit(0)
    })

}