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

    spliceFromBasket: function(id) {
        let prod = products.getProdByInv(id);
        for (item of this.products) {
            if (item.inv === prod.inv && item.count > 1) {
                item.count--;
            } else if (item.inv === prod.inv && item.count === 1) {
                this.products.splice(this.products.indexOf(prod), 1);
            }
        }
    },

    sumBasket: function() {
        return this.products.reduce((a,x) => a += parseInt(x.price * x.count), 0);
    },

    lengthBasket: function() {
        return this.products.reduce((a,x) => a += parseInt(x.count), 0);
    },

    realBasket: function() {
        return (basket.sumBasket() > 0) ? `В корзине:<p> ${basket.lengthBasket()} товара на сумму ${basket.sumBasket()} рублей</p>` : `Корзина пуста`;
    },

    getStructureBasket: function() {
        const prods = this.products;
        const basketMain = document.createElement('div');
        basketMain.classList.add('basket-main');
        basketMain.setAttribute('id', 'basket-main');
        basketBox.appendChild(basketMain);
        if (prods.length > 0){
            const prodB = document.createElement('div');
            prodB.classList.add('basket-sections');
            prodB.setAttribute('id', 'basket-sections');
            prodB.innerHTML = '<h3>Состав корзины</h3>';
            prods.forEach((items) => {
                const prodBask = document.createElement('div');
                prodBask.classList.add('basket-prod');
                prodBask.setAttribute('id', 'basket-prod');
                const strSum = `<span>${items.count * items.price} рублей</span>`;
                const strMinus = `<span onclick="basket.delProdInBasket(${items.inv})" class="basket-prod-operation basket-prod-operation__minus"> -</span>`;
                const strCount = `<span class="basket-prod-operation"> ${items.count} шт </span>`;
                const strPlus = `<span onclick="basket.addProdInBasket(${items.inv})" class="basket-prod-operation basket-prod-operation__plus">+ </span>`;
                prodBask.innerHTML = `${items.name}: ${strSum}  ${strMinus}${strCount}${strPlus}`;
                prodB.appendChild(prodBask);
            })
            basketMain.prepend(prodB);
            const nextN = document.createElement('span');
            nextN.setAttribute('id', 'nextN');
            nextN.setAttribute('onclick', 'basket.nextSection(1)');
            nextN.innerText = 'Далее...';
            prodB.append(nextN);
        }
    },

    nextSection: function(num) {
        switch(num) {
            case 1:
                const basketSection = document.getElementById('basket-sections');
                const basketMain = document.getElementById('basket-main');
                basketSection.classList.add('hide');
                const addr = document.createElement('div');
                addr.classList.add('basket-sections');
                addr.setAttribute('id', 'basket-addr');
                const title = document.createElement('h3');
                title.innerText = 'Адрес доставки';
                inputLabel = document.createElement('label');
                inputLabel.setAttribute('for', 'address');
                inputAddr = document.createElement('input');
                inputAddr.setAttribute('placeholder', 'Введите адрес');
                inputAddr.setAttribute('name', 'address');
                inputAddr.setAttribute('id', 'address');
                inputAddr.setAttribute('type', 'text');

                basketMain.appendChild(addr);
                addr.appendChild(title);
                addr.appendChild(inputLabel);
                addr.appendChild(inputAddr);
                
                const nextN = document.createElement('span');
                nextN.setAttribute('id', 'nextN');
                nextN.setAttribute('onclick', 'basket.nextSection(2)');
                nextN.innerText = 'Далее...';
                addr.append(nextN);
                break;
            case 2:
                const addrIn = document.getElementById('address');
                if (addrIn.value.length > 0) {
                    addrIn.parentElement.classList.add('hide');
                    
                const addr = document.createElement('div');
                addr.classList.add('basket-sections');
                addr.setAttribute('id', 'basket-addr');
                const title = document.createElement('h3');
                title.innerText = 'Комментарий';
                inputLabel = document.createElement('label');
                inputLabel.setAttribute('for', 'comment');
                inputAddr = document.createElement('input');
                inputAddr.setAttribute('placeholder', 'Оставьте комментарий');
                inputAddr.setAttribute('name', 'comment');
                inputAddr.setAttribute('id', 'comment');
                inputAddr.setAttribute('type', 'text');

                const basketMain = document.getElementById('basket-main');
                basketMain.appendChild(addr);
                addr.appendChild(title);
                addr.appendChild(inputLabel);
                addr.appendChild(inputAddr);
                
                const nextN = document.createElement('span');
                nextN.setAttribute('id', 'nextN');
                nextN.setAttribute('onclick', 'basket.nextSection(3)');
                nextN.innerText = 'Далее...';
                addr.append(nextN);
                break;
                } else {
                    addrIn.classList.add('red-border');
                    break;
                }
        }
    },

    addProdInBasket: function(id) {
        if (basket.pushInBasket(id)) {
            let str = basket.realBasket();
            basketBox.innerHTML = str;
            basket.getStructureBasket();
        }
    },

    delProdInBasket: function(id) {
        this.spliceFromBasket(id);
        let str = basket.realBasket();
        basketBox.innerHTML = str;
        basket.getStructureBasket();
    }
};

const basketBox = document.getElementById('basket');
let str = basket.realBasket();
basketBox.innerHTML = str;



const divProducts = document.createElement('div');
divProducts.classList.add('products');
basketBox.after(divProducts);

products.forEach(item => {
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
});

const spEv = document.getElementsByClassName('products-items__btn');
for (let el of spEv) {
    el.addEventListener('click', function(el) {
        basket.addProdInBasket(el.target.id);
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
1.	Реализовать страницу корзины:
a.	Добавить возможность не только смотреть состав корзины, но и редактировать его, обновляя общую стоимость или выводя сообщение «Корзина пуста».
2.	На странице корзины:
a.	Сделать отдельные блоки «Состав корзины», «Адрес доставки», «Комментарий»;
b.	Сделать эти поля сворачиваемыми;
c.	Заполнять поля по очереди, то есть давать посмотреть состав корзины, внизу которого есть кнопка «Далее». Если нажать ее, сворачивается «Состав корзины» и открывается «Адрес доставки» и так далее.
3.	* Убрать границы поля: пересекая их, змейка должна появляться с противоположной стороны.
*/
