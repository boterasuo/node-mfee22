// 記得安裝後, 先 require
const axios = require('axios');
const { readFile } = require("fs/promises");
const moment = require("moment");


  (async() => {
    // try catch 只要用一層就好了
      try {
        let stockNo = await readFile("stock.txt", "utf-8");
        // 再打一個 API 去查詢股票名稱
        let queryStockName = await axios.get(
          "https://www.twse.com.tw/zh/api/codeQuery?",
          {
            params: {
              query: stockNo,
            },
          }
        );
        console.log(queryStockName.data);
        // queryStockName.data.suggestions
        if (!queryStockName.data.suggestions || 
          queryStockName.data.suggestions[0] === "(無符合之代碼或名稱)") {
            throw new Error("查無此代表");
          }
        let stockData = queryStockName.data.suggestions[0];
        let stockDatas = stockData.split("\t");
        let stockName = stockDatas[1];
        console.log(stockName);
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
  

