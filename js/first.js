// ЗАДАНИЕ К УРОКУ 1
//#1
function isInteger(req) {
    return (req ^ 0) === req;
}

function c2f(temp) {
    resp = (9/5) * temp + 32;
    //if (!Number.isInteger(resp)) { НЕ ПОДДЕРЖИВАЕТСЯ В IE
    if (!isInteger(resp)) {
        resp = resp.toFixed(2);
    }
    return resp;
}

let tempC = parseInt(prompt('Введите градусы по Цельсию:', 36.6));
alert(`Температура по Фарингейту: ${c2f(tempC)}`);

//#2
let name, admin;
name = 'Василий';
alert(`В переменной name: ${name}`);
admin = name;
alert('В переменной admin: '+admin);

//#3
let strTest = 1000 + "108";
let type = typeof(strTest);
alert('Выражение 1000 + "108" создаст в переменной следующее: '+strTest+',\n'+
'потому что происходит неявное преобразование типов в тип - '+type);