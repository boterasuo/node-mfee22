// 覺得 Promise 不夠好看, 希望看起來更像同步的程式語言 
// --> await / async 誕生
// 是 Promise 的語法糖 (讓 Promise 比較好寫)
// 所以還是要有 Promise
// 看到 lib 說自己是 Promise base, 那有十之八九可以用
// await 和 async 也是用來接結果的


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
  
  // await 必須放在 async 函式裡
  // await 是一種暫停鍵, 會暫停第28行而不執行29行, 暫停到外包公司有結果為止, 且會被回傳、放到 result1 這個變數裡
  // 明明是非同步語言, 為何要 await 讓效率降低? 所以要 async
  // async 是一個暫停的範圍, 一個資料夾可以先被擱置去做其他工作的概念(因為JS的non-blocking特性)
async function main(){
    let result1 = await doWork("刷牙", 2000);
    let dt1 = new Date();
    console.log(`${result1} at ${dt1.toISOString()}`);

    let result2 = await doWork("吃早餐", 3000);
    let dt2 = new Date();
    console.log(`${result2} at ${dt2.toISOString()}`);

    let result3 = await doWork("寫功課", 2000);
    let dt3 = new Date();
    console.log(`${result3} at ${dt3.toISOString()}`);
}

main();
// IFEE 立即執行
// (async () => {
    // 實作 await 的功能
// })();


   