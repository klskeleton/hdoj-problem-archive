

/**
 * 为本项目自动构建 md 文档
 * npm run build
 */

const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const iconv = require('iconv-lite')
let src = path.resolve(__dirname,'../src')
 
console.log(src);

let list = fs.readdirSync(src)
list.forEach(name=>{
    let cmd = `auto-md  --pid=${name}  --target="README.md"`
    if(parseInt(name)){
        console.log('[exec]: ',cmd);
        console.log(path.resolve(src,name));
        
        let output = child_process.spawnSync(cmd,{
            cwd:path.resolve(src,name),
            shell:true,

        } )
        console.log(iconv.decode(output.stdout.toString(),'utf-8'));
        console.log(iconv.decode(output.stderr.toString(),'utf-8'));
        
    }
    
})