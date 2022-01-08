// Promise 物件代表一個即將完成、或失敗的非同步操作，以及它所產生的值。

// 1. Promise 是一個物件
// new Promise() 是一個建構式, 它需要一個參數 executor
// executor 也是一個函式, 有固定的長相: function() 也有兩個參數 resolve & reject
// resolve 代表的是成功時要呼叫的
// reject是失敗時要呼叫的

// Promise 物件會有狀態的移轉
// 剛建立時會是pending的狀態

let doWork = function (job, timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`完成工作 ${job}`);
      // 如果發生錯誤
      // reject(err)
      // 會把這一個 promise 物件的狀態變成 rejected
    }, timer);
  });    
};

// 刷牙 --> 吃早餐 --> 寫功課
let dt = new Date();
console.log(`Start ${dt.toISOString()}`);
// let work1Promise = doWork("刷牙", 2000);
// work1Promise.then((result) => {
//   let dt = new Date();
//   console.log(`${result} at ${dt.toISOString()}`);
// });

doWork("刷牙", 2000)
  .then((result) => {
    let dt = new Date();
    console.log(`${result} at ${dt.toISOString()}`);

    return doWork("吃早餐", 3000);
  })
  .then((result) => {
    let dt = new Date();
    console.log(`${result} at  ${dt.toISOString()}`);

    return doWork("寫功課", 2000);
  })
  .then((result) => {
    let dt = new Date();
    console.log(`${result} at  ${dt.toISOString()}`);
  })
  .catch((err) => {
    // 處理錯誤
    console.error(err);
  });

 


