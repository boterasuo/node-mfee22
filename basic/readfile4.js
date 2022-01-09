const { readFile } = require("fs/promises");

// async function main(){
//     let result = await readFile("test.tx", "utf-8"); 
//     console.log(`這是內建的 promise 版本 ${result}`);
    
// }

// main();

(async () => {
    try {
        let result = await readFile("test.txt", "utf-8"); 
        console.log(`這是內建的 promise 版本 ${result}`);
    } catch (err) {
        console.error(err);
    }   
})()




