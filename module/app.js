let car = require("./car");

// 傳入變數
console.log(car.color);

// showName 預設值
// car.setName("AAAA");
car.showName();

// sayHello
car.yourName("小明", "王", 20);
car.sayHello();

// 模組來源:
// 1. 內建的: fs --> require("fs");
// 2. 第三方: mysql2, moment, axios, dotenv,... --> require("mysql2");
// 3. 自己開發的