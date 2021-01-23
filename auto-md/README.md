# auto-md

## 自动生成 杭电OJ 题目 md 文档 

1. 下载 [auto-md.exe ](https://github.com/klskeleton/hdoj-problem-archive/releases/tag/auto-md)

2. 放到任意文件夹下，将 auto-md.exe 所在的文件夹路径，添加到：`我的电脑 > 属性 > 高级系统设置 > 环境变量  > Path `


还不会加环境变量的请自行百度。


## 使用命令行

打开 cmd 

输入: `auto-md`

参数: 

- `--pid` : 题目的 pid, 默认: `1000`
- `--target` : 生成的目标文件名，默认 `README.md`
- `--code` :   你的源代码路径，如果添加此选项，则会在 md 文件最后 添加你的代码


#### 例如

`auto-md   --pid=1000  --code="1000.cpp"  --target="1000题目.md"`

结果就是生成了一个 ` 1000题目.md` 的文件，里面自带 1000号题目的信息，源码为 1000.cpp