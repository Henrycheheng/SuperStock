var a = '1';
var a1 = 1;
var a2 = false;
var a3 = undefined;
var a4 = null;
// 数组的声明方式
var arr = [];
var arr1 = [1];
// 元组
/*
  元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为string和number类型的元组。
*/
var x;
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
// console.log(x[0].substring(1)); // OK
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log('c', c);
