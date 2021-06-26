// https://my-json-server.typicode.com/AkzhigitovOlzhas/json-server-Boom-Pizza-part1
// https://my-json-server.typicode.com/AkzhigitovOlzhas/json-server-Boom-Pizza-part2

let categoryPizza = document.getElementById('category_pizza');
let categorySnacks = document.getElementById('category_snacks');
let categorySalads = document.getElementById('category_salads');
let categoryDesserts = document.getElementById('category_desserts');
let categoryBeverages = document.getElementById('category_beverages');

async function loadCategory() {
    await loadPizza().then(arr => {
        loader(arr, 'pizza');
    });

    await loadSnacks().then(arr => {
        loader(arr, 'snacks')
    });

    await loadSalads().then(arr => {
        loader(arr, 'salads')
    });

    await loadDesserts().then(arr => {
        loader(arr, 'desserts')
    });

    await loadBeverages().then(arr => {
        loader(arr, 'beverages')
    });
}

var Toast = function (element, config) {
    var
        _this = this,
        _element = element,
        _config = {
            autohide: true,
            delay: 5000
        };
    for (var prop in config) {
        _config[prop] = config[prop];
    }
    Object.defineProperty(this, 'element', {
        get: function () {
            return _element;
        }
    });
    Object.defineProperty(this, 'config', {
        get: function () {
            return _config;
        }
    });
    _element.addEventListener('click', function (e) {
        if (e.target.classList.contains('toast__close')) {
            _this.hide();
        }
    });
}

Toast.prototype = {
    show: function () {
        var _this = this;
        this.element.classList.add('toast_show');
        if (this.config.autohide) {
            setTimeout(function () {
                _this.hide();
            }, this.config.delay)
        }
    },
    hide: function () {
        var event = new CustomEvent('hidden.toast', {
            detail: {
                toast: this.element
            }
        });
        this.element.classList.remove('toast_show');
        document.dispatchEvent(event);
    }
};

Toast.create = function (text, color) {
    var
        fragment = document.createDocumentFragment(),
        toast = document.createElement('div'),
        toastClose = document.createElement('button');
    toast.classList.add('toast');
    toast.style.backgroundColor = 'rgba(' + parseInt(color.substr(1, 2), 16) + ',' + parseInt(color.substr(3, 2), 16) + ',' + parseInt(color.substr(5, 2), 16) + ',0.5)';
    toast.textContent = text;
    toastClose.classList.add('toast__close');
    toastClose.setAttribute('type', 'button');
    toastClose.textContent = '×';
    toast.appendChild(toastClose);
    fragment.appendChild(toast);
    return fragment;
};

Toast.add = function (params) {
    var config = {
        header: 'Название заголовка',
        text: 'Текст сообщения...',
        color: '#ffffff',
        autohide: true,
        delay: 5000
    };
    if (params !== undefined) {
        for (var item in params) {
            config[item] = params[item];
        }
    }
    if (!document.querySelector('.toasts')) {
        var container = document.createElement('div');
        container.classList.add('toasts');
        container.style.cssText = 'position: fixed; top: 15px; right: 15px; width: 250px;';
        document.body.appendChild(container);
    }
    document.querySelector('.toasts').appendChild(Toast.create(config.text, config.color));
    var toasts = document.querySelectorAll('.toast');
    var toast = new Toast(toasts[toasts.length - 1], {
        autohide: config.autohide,
        delay: config.delay
    });
    toast.show();
    return toast;
}

document.addEventListener('hidden.toast', function (e) {
    var element = e.detail.toast;
    if (element) {
        element.parentNode.removeChild(element);
    }
});


loadCategory().then(basket);

function basket() {
    let basketBtns = document.querySelectorAll('.product-card__basket-btn');
    basketBtns.forEach(el => el.addEventListener('click', (element) => {

        let card = element.path[2];
        let name = card.querySelector('.product-card__name').textContent;
        let img = card.querySelector('.product-card__img').src;
        let weight;
        let cost = card.querySelector('.product-card__price').textContent;
        let quantity = card.querySelector('.product-card__counter').value;
        if (element.path[3].id != "category_beverages") {
            let weight = card.querySelector('.product-card__weight').textContent;
        }
        let arr = (localStorage.getItem("basket") == null) ? [] : JSON.parse(localStorage.getItem("basket"));

        let product = {
            name,
            img,
            weight,
            cost,
            quantity,
        };

        if (element.path[3].id == "category_beverages") {
            delete weight;
        }

        if (arr != null) {
            let flag = true;
            for (const i of arr) {
                if (name == i.name) {
                    i.quantity = +i.quantity + +product.quantity;
                    flag = false;
                }
            }
            (flag) ? arr.push(product): null;
        }
        console.log(arr);
        localStorage.setItem('basket', JSON.stringify(arr));
        Toast.add({
            text: 'Товар успешно добавлен в корзину!',
            color: '#28a745',
            autohide: true,
            delay: 1500
        });
    }));
}

async function loadPizza() {
    let products = await fetch('https://my-json-server.typicode.com/AkzhigitovOlzhas/json-server-Boom-Pizza-part1/pizza');
    return await products.json();
}

async function loadSnacks() {
    let products = await fetch('https://my-json-server.typicode.com/AkzhigitovOlzhas/json-server-Boom-Pizza-part1/snacks');
    return await products.json();
}

async function loadSalads() {
    let products = await fetch('https://my-json-server.typicode.com/AkzhigitovOlzhas/json-server-Boom-Pizza-part2/salads');
    return await products.json();

}

async function loadDesserts() {
    let products = await fetch('https://my-json-server.typicode.com/AkzhigitovOlzhas/json-server-Boom-Pizza-part2/desserts');
    return await products.json();
}

async function loadBeverages() {
    let products = await fetch('https://my-json-server.typicode.com/AkzhigitovOlzhas/json-server-Boom-Pizza-part2/beverages');
    return await products.json();
}

function loader(arr, type) {
    let categoryProduct;
    if (type == 'pizza') {
        categoryProduct = categoryPizza;
    } else if (type == 'snacks') {
        categoryProduct = categorySnacks;
    } else if (type == 'salads') {
        categoryProduct = categorySalads;
    } else if (type == 'desserts') {
        categoryProduct = categoryDesserts;
    } else if (type == 'beverages') {
        categoryProduct = categoryBeverages;
    }

    for (const prod of arr) {
        let card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = createCard(type, prod);
        categoryProduct.append(card);
    }
}


function createCard(type, product) {
    let productCard;
    if (type == 'pizza') {
        productCard = `
        <div class="product-card__img-box">
            <div class="product-card__more-info">
                ${product.description}
            </div>
            <img class="product-card__img" src="${product.img}" alt="">
        </div>
        <p class="product-card__name">${product.name}</p>
 
            <p class="product-card__value">${product.values[0].value}</p> 
        <div class="product-card__order-box">
            <div class="product-card__box-info">
                <p class="product-card__weight">${product.values[0].weight} гр.</p>
                <p class="product-card__price">${product.values[0].cost}</p>
            </div>
            <div class="product-card__count-box">
                <div class="product-card__count-btn pizza__minus-btn" onclick="minus(this)"></div>
                <input type="number" class="product-card__counter" min="1" value="1">
                <div class="product-card__count-btn pizza__plus-btn" onclick="plus(this)"></div>
            </div>
            <div class="product-card__basket-btn fa fa-shopping-cart"></div>
        </div> 
        `;
    } else if (type == 'snacks' || type == 'salads' || type == 'desserts') {
        productCard = `  
        <img class="product-card__img" src="${product.img}" alt="">
        <p class="product-card__name">${product.name}</p>

        <div class="product-card__order-box">
            <div class="product-card__box-info">
                <p class="product-card__weight">${product.weight} гр.</p>
                <p class="product-card__price">${product.cost}</p>
            </div>
            <div class="product-card__count-box">
                <div class="product-card__count-btn pizza__minus-btn" onclick="minus(this)"></div>
                <input type="number" class="product-card__counter" min="1" value="1">
                <div class="product-card__count-btn pizza__plus-btn" onclick="plus(this)"></div>
            </div>
            <div class="product-card__basket-btn fa fa-shopping-cart"></div>
        </div> 
        `;
    } else if (type == 'beverages') {
        productCard = `  
        <img class="product-card__img" src="${product.img}" alt="">
        <p class="product-card__name">${product.name}</p>

        <div class="product-card__order-box">
            <div class="product-card__box-info"> 
                <p class="product-card__price">${product.cost}</p>
            </div>
            <div class="product-card__count-box">
                <div class="product-card__count-btn pizza__minus-btn" onclick="minus(this)"></div>
                <input type="number" class="product-card__counter" min="1" value="1">
                <div class="product-card__count-btn pizza__plus-btn" onclick="plus(this)"></div>
            </div>
            <div class="product-card__basket-btn fa fa-shopping-cart"></div>
        </div> 
        `;
    }

    return productCard;
}