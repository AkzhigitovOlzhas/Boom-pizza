let basketProducts = document.querySelector('.basket__products');

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
        header: '',
        text: '',
        color: '',
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

async function createBasketCard() {
    let products = JSON.parse(localStorage.getItem('basket'));
    if (localStorage.getItem('basket') != null && products.length > 0) {
        basketProducts.innerHTML = '';
        for (const product of products) {
            let card = document.createElement('div');
            card.classList.add('basket__product');
            card.innerHTML = `
            <div class="basket__wrapper">
            <div class="basket__left">
                <img src="${product.img}" alt="" class="basket__img">
                <div class="basket__info-product">
                    <p class="basket__name-product">${product.name}</p> 
                </div>
            </div>
    
            <div class="basket__right">
                <div class="basket__box">
                    <p class="basket__cost">${product.cost} руб.</p>
                    <p class="basket__weight"> ${(product.weight==null) ? "":'Вес:+product.weight'}</p>
                </div>
                <input type="number" min="1" class="basket__counter" value="${product.quantity}">
            </div>
            </div>
            <div class="basket__delete-btn"></div>
            `;
            basketProducts.append(card);
        }
    }
}


createBasketCard()
    .then(() => {
        let removeBtns = document.querySelectorAll('.basket__delete-btn');
        removeBtns.forEach(element => {
            element.addEventListener('click', element => {
                let products = JSON.parse(localStorage.getItem('basket'));
                let arr = [];
                let prodName = element.path[1].querySelector('.basket__name-product');
                for (const i of products) {
                    if (i.name != prodName.innerHTML) {
                        arr.push(i);
                    }
                }
                element.path[1].remove();
                localStorage.setItem('basket', JSON.stringify(arr));

                if (arr.length == 0) {
                    let text = document.createElement('div')
                    text.classList.add('basket__none');
                    text.innerHTML = 'Пустая корзина горе в семье :(';
                    basketProducts.append(text);
                    document.querySelector('.basket__total').remove();
                }
                Toast.add({
                    text: `Товар '${prodName.innerHTML}' успешно удален из корзины.`,
                    color: '#28a745',
                    autohide: true,
                    delay: 5000
                });
                document.querySelector('.basket__total').remove();
                localStorage.setItem('total', Number(calcTotal()));
            });
        });

    })
    .then(() => {
        let products = JSON.parse(localStorage.getItem('basket'));
        if (localStorage.getItem('basket') != null && products.length > 0) {
            localStorage.setItem('total', Number(calcTotal()));
        }
    })
    .then(() => {
        let inputFields = document.querySelectorAll('.basket__counter');
        inputFields.forEach(el => {
            el.addEventListener('change', (el) => {
                let productCard = el.path[3];
                let products = JSON.parse(localStorage.getItem('basket'));

                let productName = productCard.querySelector('.basket__name-product');
                let productCount = productCard.querySelector('.basket__counter');
                let newBasket = products.map(p => {
                    if (productName.innerHTML == p.name) {
                        p.quantity = productCount.value;
                    }
                    return p;
                });
                Toast.add({
                    text: `Количество товара '${productName.innerHTML}' , было изменено на ${productCount.value}`,
                    color: '#28a745',
                    autohide: true,
                    delay: 5000
                });
                localStorage.setItem('basket', JSON.stringify(newBasket));
                document.querySelector('.basket__total').remove();
                localStorage.setItem('total', Number(calcTotal()));
            });
        });
    });

function calcTotal() {
    let products = document.querySelectorAll('.basket__product');

    let total = 0;
    for (const product of products) {
        let cost = Number(product.querySelector('.basket__cost').innerHTML.split(' ')[0]);
        let count = Number(product.querySelector('.basket__counter').value);
        total += cost * count;
    }

    let wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'basket__total');
    let totalInfo = `
        <div class="basket__total-text">Итого: ${JSON.parse(localStorage.getItem('basket')).length} шт. на сумму ${total} руб.</div>
        <a href="../pages/payment.html" class="basket__total-btn">Оформить заказ</a>
    `;
    wrapper.innerHTML = totalInfo;
    basketProducts.append(wrapper);
    return total;
}