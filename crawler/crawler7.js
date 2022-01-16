// const axios = require('axios');
const { readFile } = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql2");
require("dotenv").config();
const twse = require("./utils/twse");
const converter = require("./utils/converter");
const twseSaver = require("./utils/twseSaver");


(async () => {

    let connection = mysql.createConnection({
      host: process.env.DB_HOST, // 127.0.0.1
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
      try {
        let stockNo = await readFile("stock.txt", "utf-8");
        // 使用 utils 中的 queryStockName 函式去查詢股票名稱, 順便確認股票代碼是否存在
        let stockNameData = await twse.queryStockName(stockNo);
        // console.log(stockNameData);

        // 使用 converter 中的 parseStockName 函式解析股票名稱
        let stockName = converter.parseStockName(stockNameData);
        
        // 儲存股票代碼與名稱進資料庫
        // Use prepared statements to protect from SQL Injection attacks
        let saveNameResult = await twseSaver.saveStockName(connection, stockNo, stockName);
        // console.log(saveNameResult);

        let queryDate = moment().format("YYYYMMDD"); // 今天的日期
  
        // 使用 utils 中的 queryStockPrice 函式去取得股票價格資料
        let stockPriceData = await twse.queryStockPrice(queryDate, stockNo);
        console.log(stockPriceData);
        
        // 使用 converter 中的 convertPrice 函式處理取得的價格資料
        let processedData = converter.convertPrice(stockPriceData, stockNo);
        // console.log(processedData);

        // 把整理好的資料 用 twseSaver 中的 saveStockPrice 函式存入資料庫
        let savePriceResult = await twseSaver.saveStockPrice(connection, processedData);
        console.log(savePriceResult);

      } catch (err) {
        console.error(err);  
      }
      connection.end();

  })();
  

