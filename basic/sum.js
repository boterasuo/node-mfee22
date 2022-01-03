// 方法一、for迴圈:
let result = 0;
function sum(n){
    for (let i = 1; i <= n; i ++){
        result += i
    }
    return result;
};

console.log("for迴圈sum(5) ==> " + sum(5));
// console.log(sum(6));
// console.log(sum(7));

// 方法二、梯形公式解:
function sumFormula(n){
    let resultFormula = ((1 + n) * n) / 2;
    return resultFormula;
}

console.log("梯形公式sum(5) ==> " + sumFormula(5));

// 方法三、recursive遞迴解:
function sumRecursive(n){
    if (n < 1){
        return 0;
    } return n + sumRecursive(n - 1);
}

console.log("recursive遞迴sum(5) ==> " + sumRecursive(5));

// 方法四、reducer解:
function sumReducer(n){
    let arr = [];
    let reducer = (previousValue, currentValue) => previousValue + currentValue;
    for (let i = 0; i <= n; i++){
        arr.push(i);
    }
    let resultReducer = arr.reduce(reducer, 0);
    return resultReducer;
};

console.log("reducer sum(5) ==> " + sumReducer(5));

// 壓力測試一:
console.time("for");
for (let i = 1; i <= 10000; i++){
    sum(10000);
};
console.timeEnd("for");

// 壓力測試二:
console.time("trapezoid");
for (let i = 1; i <= 10000; i++){
    sumFormula(10000);
};
console.timeEnd("trapezoid");

// 壓力測試三:
console.time("recursive");
for (let i = 1; i <= 10000; i++){
    sumRecursive(10000);
};
console.timeEnd("recursive");

// 壓力測試四:
console.time("reducer");
for (let i = 1; i <= 10000; i++){
    sumReducer(10000);
};
console.timeEnd("reducer");