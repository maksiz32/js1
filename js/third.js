// ЗАДАНИЕ К УРОКУ 3

//#1
/*
С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
*/
let str1 = "";
let num = 2;
while (num <= 100) {
let j = 2;
let flag = 0;
    while (j < num) {
        if (num % j === 0) {
            flag++;
        }
        j++;
    }
        if (flag<2) {
            str1 += (num + " ");
        }
    num++;
}
console.log(str1);

/*
//#2
С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров. 
//#3
Товары в корзине хранятся в массиве. Задачи:
#a Организовать такой массив для хранения товаров в корзине;
#b Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
*/
const basket = [
    item1 = {
        nameP: 'item1',
        price: 1000
    },
    item2 = {
        nameP: 'item1',
        price: 5000
    },
    item3 = {
        nameP: 'item1',
        price: 200
    }
];

function countBasketPrice(bask) {
    let all_price = 0;
    for (let item in bask) {
        all_price += parseInt(bask[item]['price']);
    }
    return all_price;
}
console.log(countBasketPrice(basket));

/*
//#4
* Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла. Выглядеть это должно так:
for(...){// здесь пусто}
*/
for (let i = 0; i <= 9; alert (i++)) {}

//#5
/*
* Нарисовать пирамиду с 20 рядами с помощью console.log, как показано на рисунке:
x
xx
xxx
xxxx
xxxxx
*/
let str = '';
for (let j = 0; j < 20; j++) {
    console.log(str += 'x');
}