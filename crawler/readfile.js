const { readFile } = require("fs/promises");

(async () => {
    let result = await readFile("stock.txt", "utf-8");
    if (result === "2330") {
        console.log("good"); // 如果 stock.txt 沒有換行就會印出 good
    } else {
        console.log("bad"); // 如果有換行就會印出 bad (換行: \n --> 看不到)
    }
})();