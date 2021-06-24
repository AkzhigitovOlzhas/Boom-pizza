// https://my-json-server.typicode.com/AkzhigitovOlzhas/json-server-Boom-Pizza-part1
// https://my-json-server.typicode.com/AkzhigitovOlzhas/json-server-Boom-Pizza-part2

let categoryPizza = document.getElementById('category_pizza');
let categorySnacks = document.getElementById('category_snacks');
let categorySalads = document.getElementById('category_salads');
let categoryDesserts = document.getElementById('category_desserts');
let categoryBeverages = document.getElementById('category_beverages');

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

loadPizza().then(arr => {
    loader(arr, 'pizza');
});

loadSnacks().then(arr => {
    loader(arr, 'snacks')
});

loadSalads().then(arr => {
    loader(arr, 'salads')
});

loadDesserts().then(arr => {
    loader(arr, 'desserts')
});

loadBeverages().then(arr => {
    loader(arr, 'beverages')
});


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

        <select name="" id="" class="product-card__select">
            <option>${product.values[0].value}</option>
            <option>${product.values[1].value}</option>
            <option>${product.values[2].value}</option>
        </select>
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