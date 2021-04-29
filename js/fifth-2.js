function init() {
    //Вызов функции
}
window.onload = init;

/*
1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию. Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
*/
(function() {
    const fig = function (i, j) {
        switch (true) {
                case ((i === 1) && ((j == 1) || (j === 8))):
                    return '&#9814;';
                case ((i === 1) && ((j == 2) || (j === 7))):
                    return '&#9816;';
                case ((i === 1) && ((j == 3) || (j === 6))):
                    return '&#9815;';
                case (i === 2):
                    return '&#9817;';
                case (i === 1 && j === 4):
                    return '&#9813;';
                case (i === 1 && j === 5):
                    return '&#9812;';
                default:
                    return '';
            }
    };
    const arrChes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const box = document.getElementById('tableBox');
    str = '<table class="mytable" id="myTable">';
    for (i = 0; i < 9; i++) {
        str += `<tr>`;
        for (j = 0; j < 9; j++) {        

            black = '';
            if (j === 0 && i !== 0) {
                str += `<td>${i}</td>`;
            } else if (i === 0 && j !== 0) {
                str += `<th>${arrChes[j - 1]}</th>`;
            } else if (i !== 0 && j !== 0) {
                ((i % 2 !== 0 && j % 2 !== 0) || (i % 2 === 0 && j % 2 === 0)) ? black = 'blackarea' : true;
                str += `<td class="tblCell ${black}">${fig(i, j)}</td>`;
            } else {
                str += `<td></td>`;
            }
        }
        str += `</tr>`;
    }
    str += `</table>`;
    box.innerHTML = str;
    box.classList.add('tablebox');    
})();
/*
2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
Пустая корзина должна выводить строку «Корзина пуста»;
Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
*/
class Product {
    constructor(inv, name, price, count = 0) {
        this.inv = inv,
        this.name = name,
        this.price = price,
        this.count = count
    }
}
const a = new Product (1234, 'Mars', 200, 3);
const b = new Product (1235, 'Snikers', 400, 4);
const c = new Product (1236, 'Bounty', 800, 5);
const Products = [a,b,c];

function getProdByInv(num) {
    for (let item of Products) {
        if (item.inv === parseInt(num)) {
            return item;
        }
    }
    return null;
}

const basket = {
    countBasket: function() {
        let cnt = 0;
        for (unit of Object.keys(this)) {
            console.log(Object.keys(basket[unit]));
            if (unit.count) {
                cnt += unit.count;
            }
        }
        return cnt;
    },
    sumCreateBasket: function() {
        let sum = 0;
        for (price of Object.keys(this)) {
            if (price.price) {
                sum += price.price;
            }
        }
        return sum;
    },
    addInBasket: function(num) {
        num = parseInt(num);
        for (item of Object.keys(this)) {
            if (item.inv === num) {
                item.count++;
            } else {
                let curProd = getProdByInv(num);
                let tmp = new Product(curProd.inv, curProd.name, curProd.price, 1);
                let n = this.countBasket();
                console.log(this.countBasket());
                basket[n] = tmp;
            }
        }
    }
};
// const sumBasket = function(arr) {
//     return arr.reduce((a,x) => a += parseInt(x.price), 0);
// }
// str = (sumBasket(basket) > 0) ? `В корзине: ${basket.length} товара на сумму ${sumBasket(basket)} рублей` : `Корзина пуста`;
const basketBox = document.getElementById('basket');
str = (basket.sumBasket > 0) ? `В корзине: ${basket.countBasket} товара на сумму ${basket.sumBasket} рублей` : `Корзина пуста`;
basketBox.innerHTML = str;

/*
3.* Сделать так, чтобы товары в каталоге выводились при помощи JS:
Создать массив товаров (сущность Product);
При загрузке страницы на базе данного массива генерировать вывод из него. HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.
*/
    const divProducts = document.createElement('div');
    divProducts.classList.add('products');
    basketBox.after(divProducts);

for (let item of Products) {
    const div = document.createElement('div');
    div.classList.add('products-items');
    // div.setAttribute('id', item.inv);

    const span1 = document.createElement('span');
    span1.innerText = item.name;
    span1.classList.add('products-items__title');

    const span2 = document.createElement('span');
    span2.innerHTML = `Цена: <trg-p>${item.price}</trg-p> рублей`;
    span2.classList.add('products-items__cost');

    const span3 = document.createElement('span');
    span3.innerHTML = `Остаток: <trg-c>${item.count}</trg-c> шт`;
    span3.classList.add('products-items__count');

    const span4 = document.createElement('span');
    span4.innerText = `Купить`;
    span4.classList.add('products-items__btn');
    span4.setAttribute('id', item.inv);

    divProducts.appendChild(div);
    div.appendChild(span1);
    div.appendChild(span2);
    div.appendChild(span3);
    div.appendChild(span4);
}

const spEv = document.getElementsByClassName('products-items__btn');
for (let el of spEv) {
    el.addEventListener('click', function(el) {
        const id = el.target.id;
        basket.addInBasket(id);
        console.log(basket);
    })
}
