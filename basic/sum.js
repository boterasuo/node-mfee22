let result = 0;
function sum(n){
    for (let i = 1; i <= n; i ++){
        result += i
    }
    return result;
};

console.log(sum(5));
console.log(sum(6));