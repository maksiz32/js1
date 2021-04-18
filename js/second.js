// ЗАДАНИЕ К УРОКУ 2

//#1
// Почему код дает именно такие результаты?
let a = 1, b = 1, c, d;
c = ++a; alert(`++a = ${c}`);           // 2: Операция префиксного инкримента выполняется раньше операции присваивания (a = 2)
d = b++; alert(`b++ = ${d}`);           // 1: Операция постфиксного инкримента выполняется позже операции присваивания (b = 2)
c = (2+ ++a); alert(`2+ ++a = ${c}`);      // 5: В начале выполнится префиксный унарный оператор, потом сложение (здесь а = 3)
d = (2+ b++); alert(`2+ b++ = ${d}`);      // 4: ??? Не разобрался почему
alert(`a = ${a}`);                    // 3
alert(`b = ${b}`);                    // 3

//#2
// Чему будет равен x? 
let a1 = 2;
let x = 1 + (a1 *= 2); // 5: 1+2*2
alert(`#2. a = ${x}`);

//#3
/*
Объявить две целочисленные переменные — a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
если a и b положительные, вывести их разность;
если а и b отрицательные, вывести их произведение;
если а и b разных знаков, вывести их сумму;
Ноль можно считать положительным числом.
*/
function getRand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let a2 = getRand(-50, 50), b2 = getRand(-50, 50);
// let a2 = -2, b2 = 5;

if (a2>=0 && b2>=0) {
    alert(`Разность чисел ${a2} и ${b2} равна ${a2-b2}`);
} else if (a2<0 && b2<0) {
    alert(`Произведение чисел ${a2} и ${b2} равно ${a2*b2}`);
} else {
    alert(`Сумма чисел ${a2} и ${b2} равна ${a2+b2}`);
}

//#4
/*
Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
*/
let swit = getRand(0, 15);
let output = "";
switch (swit) {
    case 0:
    output += '0 ';
    case 1:
    output += '1 ';
    case 2:
    output += '2 ';
    case 3:
    output += '3 ';
    case 4:
    output += '4 ';
    case 5:
    output += '5 ';
    case 6:
    output += '6 ';
    case 7:
    output += '7 ';
    case 8:
    output += '8 ';
    case 9:
    output += '9 ';
    case 10:
    output += '10 ';
    case 11:
    output += '11 ';
    case 12:
    output += '12 ';
    case 13:
    output += '13 ';
    case 14:
    output += '14 ';
    case 15:
    output += '15';
}
alert(output);

//#5
/*
Реализовать четыре основные арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
*/
function sum(a5, b5) {
    return a5 + b5;
}
function minus(a5, b5) {
    return a5 - b5;
}
function mult(a5, b5) {
    return a5 * b5;
}
function del(a5, b5) {
    return (b5 !== 0) ? a5 / b5 : 'ВНИМАНИЕ! Деление на ноль';
}

let a5 = parseInt(prompt('Введите а:', 5));
let b5 = parseInt(prompt('Ведите b:', 7));
alert(`Сумма a и b равна ${sum(a5, b5)}`);
alert(`Разность a и b равна ${minus(a5, b5)}`);
alert(`Произведение a и b равно ${mult(a5, b5)}`);
alert(`Частное a и b равно ${del(a5, b5)}`);

//#6
/*
Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 — значения аргументов, operation — строка с названием операции. В зависимости от переданного значения выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (применить switch).
*/
function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case 'сложить':
            return sum(arg1, arg2);

        case 'вычесть':
            return minus(arg1, arg2);

        case 'умножить':
            return mult(arg1, arg2);

        case 'разделить':
            return del(arg1, arg2);

        default:
            return 'Данная функция неопределена';
    }
}
alert(mathOperation(4, 5, 'вычесть'));

/*
* Сравнить null и 0. Объяснить результат.
*/
//null - тип данных null (в typeof будет object -  исторически сложившаяся ошибка, внесенная в спецификацию языка для обеспечения обратной совместимости версий)
// 0 - тип данных number. 
// При сравнении всегда будет false

/*
* С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val — заданное число, pow –— степень.
*/
function power(val, pow) {
    if (pow < 0) {
        return power(1/val, -(pow));
    }
    else if (pow > 0) {
        return val * power(val, pow - 1);
    }
    else {
        return 1;
    }
}
alert(power(2,0));