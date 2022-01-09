// 記得安裝後, 先 require
const axios = require('axios');


  (async() => {
    try {
      let response = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20220109&stockNo=2330&_=1641716372516");
      console.log(response.data);

    } catch (err) {
      console.error(err);

    }

  })();
  

