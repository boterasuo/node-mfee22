// 記得安裝後, 先 require
const axios = require('axios');


  (async() => {
    try {
      let stockNo = 2330;
      let queryDate = "20220115"

      // let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${queryDate}&stockNo=${stockNo}`);

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
  

