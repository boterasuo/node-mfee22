const { readFile } = require("fs");


let readfile = 
readFile("test.txt", "utf-8", (data) => {
    return new Promise((resolve, reject) => {
          resolve(console.log(data));
          // insert to mysql
    }) 
});

console.log(readfile);

