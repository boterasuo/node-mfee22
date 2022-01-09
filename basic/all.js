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

let p1 = doWork("刷牙", 2000)
let p2 = doWork("吃早餐", 3000)
let p3 = doWork("寫功課", 2000)

// 當三個全部都做完的時候, 就會回來
Promise.all([p1, p2, p3]).then((values) => {
    console.log(values);
});

// 印出陣列: [ '完成工作 刷牙', '完成工作 吃早餐', '完成工作 寫功課' ]