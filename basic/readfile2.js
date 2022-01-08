const { readFile } = require("fs");


let readFilePromise = new Promise((resolve, reject) => {
    readFile("test.tx", "utf-8", (err, data) => {
        if (err) {
            reject(err);
        }
        resolve(data);
    });
})

console.log(readFilePromise);
readFilePromise
.then((result) => {
    console.log(`這是 Promise 版本的 result:  ${result}`)
})
.catch((err) => {
    console.log("這是錯誤訊息: " + err);
});
