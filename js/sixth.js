/*
1 Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы;
Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.
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
const basket = [];

function getProdByInv(num) {
    for (let item of Products) {
        if (item.inv === parseInt(num)) {
            return item;
        }
    }
    return null;
}
function pushInBasket(id) {
    let flag = false;
    let prod = getProdByInv(id);
    for (item of basket) {
        if (item.inv === prod.inv) {
            item.count++;
            flag = true;
        }
    }
    if (!flag) {
        prodObj = new Product (prod.inv, prod.name, prod.price, 1);
        basket.push(prodObj);
        flag = true;
    }
    return flag;
}

const sumBasket = function(arr) {
    // let sum = 0;
    // for (let item in arr) {
    //     sum += (arr[item]['price'] * arr[item]['count']);
    // }
    // return sum;
    return arr.reduce((a,x) => a += parseInt(x.price * x.count), 0);
}
const lengthBasket = function(arr) {
    return arr.reduce((a,x) => a += parseInt(x.count), 0);
}
function realBasket() {
    return (sumBasket(basket) > 0) ? `В корзине: ${lengthBasket(basket)} товара на сумму ${sumBasket(basket)} рублей` : `Корзина пуста`;
}
// str = (basket.sumBasket > 0) ? `В корзине: ${basket.countBasket} товара на сумму ${basket.sumBasket} рублей` : `Корзина пуста`;

const basketBox = document.getElementById('basket');
let str = realBasket();
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
        if (pushInBasket(id)) {
            let str = realBasket();
            basketBox.innerHTML = str;
        }
    })
}


/*
2 * У товара может быть несколько изображений. Нужно менять картинку при нажатии на картинку
*/
