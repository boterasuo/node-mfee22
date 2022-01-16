// converter.js

// TODO: 處理股票名稱
function parseStockName (stockNameData) {
    if (!stockNameData.suggestions || 
        stockNameData.suggestions[0] === "(無符合之代碼或名稱)") {
          throw new Error("查無此代表");
        }
      let stockData = stockNameData.suggestions[0];
      let stockDatas = stockData.split("\t");
      return stockDatas[1];
};

// TODO: 處理股票價格資料
function convertPrice (stockPriceData, stockNo) {
    let processedData = stockPriceData.data.map((d) => {
        let dateArr = d[0].split("/");
        dateArr[0] = Number(dateArr[0]) + 1911;
        d[0] = dateArr.join("-");
        d = d.map((value) => {
          return value.replace(/[,]+/g, "");
        });
        d.unshift(stockNo);
        return d;
      });
      return processedData;
};

module.exports = { parseStockName, convertPrice }