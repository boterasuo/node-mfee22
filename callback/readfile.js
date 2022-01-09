const { readFile } = require("fs");

// 非同步函式 (丟給外包)
readFile("test.txt", "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data);
    // insert to mysql
})