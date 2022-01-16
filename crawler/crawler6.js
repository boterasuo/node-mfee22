// 記得安裝後, 先 require
const axios = require('axios');
const { readFile } = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql2");
require("dotenv").config();


  (async() => {

    let connection = mysql.createConnection({
      host: process.env.DB_HOST, // 127.0.0.1
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
      try {
        let stockNo = await readFile("stock.txt", "utf-8");
        // 再打一個 API 去查詢股票名稱, 順便確認股票代碼是否存在
        let queryStockName = await axios.get(
          "https://www.twse.com.tw/zh/api/codeQuery?",
          {
            params: {
              query: stockNo,
            },
          }
        );
        // queryStockName.data.suggestions
        if (!queryStockName.data.suggestions || 
          queryStockName.data.suggestions[0] === "(無符合之代碼或名稱)") {
            throw new Error("查無此代表");
          }
        let stockData = queryStockName.data.suggestions[0];
        let stockDatas = stockData.split("\t");
        let stockName = stockDatas[1];
        
        // TODO: 儲存股票代碼與名稱進資料庫
        // Use prepared statements to protect from SQL Injection attacks
        let saveNameResult = await connection.execute("INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)", 
        [stockNo, stockName]);
        console.log(saveNameResult);

        let queryDate = moment().format("YYYYMMDD"); // 今天的日期
  
        let response = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
          // 這裡可以放一些設定
          // params: 放 query string 的參數
          params: {
            response: "json",
            date: queryDate,
            stockNo,
          },
        });
        // 開始處理資料
        let processedData = response.data.data.map((d) => {
          let dateArr = d[0].split("/");
          dateArr[0] = Number(dateArr[0]) + 1911;
          d[0] = dateArr.join("-");
          d = d.map((value) => {
            return value.replace(/[,]+/g, "");
          });
          d.unshift(stockNo);
          return d;
        });
        // console.log(processedData);

        // 把整理好的資料存入資料庫
        // [注意] mysql2 寫 bulk insert 時無法用 execute
        // connection.execute --> 處理 bulk insert 的 prepare statement 會有問題
        // connection.query
        // execute 回傳的是 promise; query 回傳的不是 promise, 不能被 await
        let savePriceResult = await connection
        .promise()
        .query(
          "INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ? ", 
          [processedData]
        );
        console.log(savePriceResult);

      } catch (err) {
        console.error(err);  
      }
      connection.end();

  })();
  

