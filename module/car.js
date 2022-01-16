// exports = module.exports = {};
// exports 本身是一個物件

// 練習 default & 傳入變數
let name = "default";
exports.color = "red";

// 練習 setName & showName
exports.setName = function (newName) {
    name = newName;
};
exports.showName = function () {
    console.log(name);
}

// 練習: sayHello
exports.yourName = function (firstName, lastName, yourAge) {
    name = `${firstName} ${lastName}`;
    age = yourAge;
}
exports.sayHello = function () {
    console.log(`Hello, ${name}. Your age is ${age}.`);
}

// return module.exports;