// 記得安裝後, 先 require
const axios = require('axios');
const { readFile } = require("fs/promises");
const moment = require("moment");


  (async() => {
    // try catch 只要用一層就好了
      try {
        let stockNo = await readFile("stock.txt", "utf-8");
        let queryDate = moment().format("YYYYMMDD"); // 今天的日期
  
        let response = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
          // 這裡可以放一些設定
          // params: 放 query string 的參數
          params: {
            response: "json",
            date: queryDate,
            stockNo,
          }
        })
        console.log(response.data);
  
      } catch (err) {
        console.error(err);
  
      }




  })();
  

