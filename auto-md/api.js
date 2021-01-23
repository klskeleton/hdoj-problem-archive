/**
 * 发送请求，获取页面html,并匹配获取题目数据
 */

const axios = require('axios');

const regexp = {
    title: /<h1 .*>(.*)<\/h1>/,
    TimeLimit: /Time Limit: (.*?) \(Java\/Others\)/,
    MemoryLimit: /Memory Limit: (.*?) \(Java\/Others\)/,
    ProblemDescription: /Problem Description (.*?) Input/,
    Input: /Input (.*?) Output/,
    Output: /Output (.*?) Sample Input/,
    SampleInput: /Sample Input ((.|\n|\r)*?) Sample Output/,
    SampleOutput: /Sample Output ((.|\n|\r)*?) Author/,
    Author: /Author (.*?) Recommend/,
    // Recommend: /Recommend<\/div>.*?<div class=panel_content>(.*?)<\/div>/,

}

module.exports = (url)=> {
    return new Promise((resolve, reject) => {
        axios.get(url).then((result) => {
            let html = result.data
            console.log(html.replace(/<.*?>|&nbsp;/g," "));
            //去除标签
            let removeTagHtml = html.replace(/<.*?>|&nbsp;/g," ");
            let data = {
                title: html.match(regexp.title)[1].trim(),
                TimeLimit: removeTagHtml.match(regexp.TimeLimit)[1].trim(),
                MemoryLimit: removeTagHtml.match(regexp.MemoryLimit)[1].trim(),
                ProblemDescription: removeTagHtml.match(regexp.ProblemDescription)[1].trim(),
                Input: removeTagHtml.match(regexp.Input)[1].trim(),
                Output: removeTagHtml.match(regexp.Output)[1].trim(),
                SampleInput: removeTagHtml.match(regexp.SampleInput)[1].trim(),
                SampleOutput: removeTagHtml.match(regexp.SampleOutput)[1].trim(),
                Author: removeTagHtml.match(regexp.Author)[1].trim(),
            }
            console.log(data);
            resolve(data)
        
        }).catch((err) => {
            console.log("请求发送错误：", err.message)
        });
    });
}

