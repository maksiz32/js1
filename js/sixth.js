/*
1 Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы;
Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.
*/
class Product {
    static getNextInv() {
        return parseInt(Product.nextInv++);
    }
    constructor(name, price, count = 0) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.images = [];
        this.inv = Product.getNextInv();
    }
    addImmage(paths) {
        if (!paths.isArray) {
            this.images.push(paths);
        } else {
            for (path of paths) {
                this.images.push(path);
            }
        }
    }
    getNextImg(path) {
        let index = (this.images.indexOf(path) >= this.images.length - 1) ? 0 : this.images.indexOf(path) + 1;
        return this.images[index];
    }
}

Product.nextInv = 1234;

const a = new Product ('Mars', 200, 3);
const b = new Product ('Snikers', 400, 4);
const c = new Product ('Bounty', 800, 5);
a.addImmage('601d68aa11bf4.jpg');
a.addImmage('601d68ac8c97e.jpg');
a.addImmage('601d68af06517.jpg');

b.addImmage('601d6a67be1ae.jpg');
b.addImmage('6021a8040f304.jpg');
b.addImmage('6021a806382e0.jpg');

c.addImmage('6021a807a84ae.jpg');
c.addImmage('6021a808a938e.jpg');

const products = [a,b,c];

//Новый кастомный метод для массива
Array.prototype.getProdByInv = function(num) {
    for (let item of this) {
        if (item.inv === parseInt(num)) {
            return item;
        }
    }
    return null;
}

const basket = {
    products: [],

    pushInBasket: function(id) {
        let flag = false;
        let prod = products.getProdByInv(id);
        for (item of this.products) {
            if (item.inv === prod.inv) {
                item.count++;
                flag = true;
            }
        }
        if (!flag) {
            prodObj = prod;
            prodObj.count = 1;
            this.products.push(prodObj);
            flag = true;
        }
        return flag;
    },

    sumBasket: function() {
        return this.products.reduce((a,x) => a += parseInt(x.price * x.count), 0);
    },

    lengthBasket: function() {
        return this.products.reduce((a,x) => a += parseInt(x.count), 0);
    },

    realBasket: function() {
        return (basket.sumBasket() > 0) ? `В корзине: ${basket.lengthBasket()} товара на сумму ${basket.sumBasket()} рублей` : `Корзина пуста`;
    }
};

const basketBox = document.getElementById('basket');
let str = basket.realBasket();
basketBox.innerHTML = str;

const divProducts = document.createElement('div');
divProducts.classList.add('products');
basketBox.after(divProducts);

for (let item of products) {
    const div = document.createElement('div');
    div.classList.add('products-items');
    div.setAttribute('id', item.inv);

    const img = document.createElement('img');
    img.setAttribute('src', `img/tmb/${item.images[0]}`);
    img.setAttribute('alt', `${item.images[0]}`);
    img.classList.add('products-items__pic');

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
    div.appendChild(img);
    div.appendChild(span1);
    div.appendChild(span2);
    div.appendChild(span3);
    div.appendChild(span4);
}

const spEv = document.getElementsByClassName('products-items__btn');
for (let el of spEv) {
    el.addEventListener('click', function(el) {
        const id = el.target.id;
        if (basket.pushInBasket(id)) {
            let str = basket.realBasket();
            basketBox.innerHTML = str;
        }
    })
}

const imgEv = document.getElementsByClassName('products-items__pic');
for (let el of imgEv) {
    el.addEventListener('click', function(el) {
        const newPath = products.getProdByInv(el.target.parentNode.id).getNextImg(el.target.alt);
        el.target.setAttribute('alt', newPath);
        el.target.setAttribute('src', `img/tmb/${newPath}`)
    })
}

/*
2 * У товара может быть несколько изображений. Нужно менять картинку при нажатии на картинку
*/
