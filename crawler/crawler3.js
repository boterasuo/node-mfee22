// 記得安裝後, 先 require
const axios = require('axios');
const { readFile } = require("fs/promises");


  (async() => {
      try {
        let stockNo = await readFile("stock.txt", "utf-8");
        let date = new Date, year = date.getFullYear(), month = date.getMonth()+1, day = date.getDate();
        if (month < 10) {
          month = `0${month}`
        }
        let today = `${year}${month}${day}`;
        // console.log(today); 
        let queryDate = today // TODO: 自動用今天的日期
  
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
  

