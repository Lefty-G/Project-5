

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const productId = urlParams.get('id')


fetch(`http://localhost:3000/api/products/${productId}`)
    .then(data => {
        return data.json();
    })
    .then(product => {
        insertProduct(product);
    });

/**
 * 
 * @param {*} product 
 */
function insertProduct(product) {
    insertProductImage(product);
    insertProductTitlePrice(product);
    insertProductDescription(product);
    insertProductColors(product);
}

//TitlePrice
function insertProductTitlePrice(product) {
    const productTitlePrice = document.getElementById('content-titlePrice');

    productTitlePrice.innerHTML = `
        <h1 id="title">${product.name}</h1>
        <p>Prix : <span id="price">${product.price}</span>€</p>
    `

}

//Image
function insertProductImage(product) {
    const productImage = document.getElementById('images');


    productImage.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.altTxt}">
    `;
}

//Description
function insertProductDescription(product) {
    const productDescription = document.getElementById('content-description');

    productDescription.innerHTML = `
        <p id="description">${product.description}</p>
    `;

}

//Colours
/**
 * 
 * @param {*} product 
 */
function insertProductColors(product) {
    const insertColors = document.getElementById('colors');

    for (let color of product.colors) {

        insertColors.innerHTML += `
            <option value="${color}">${color}</option>
        `;
    }
}


//Add to cart

const addToCart = document.getElementById('addToCart');


addToCart.addEventListener('click', ($event) => {
    const quantity = parseInt(document.getElementById('quantity').value);
    const color = document.getElementById('colors').value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const found = cart.find(cartItem => cartItem.color === color && cartItem.id === productId);
    
    if (found) {
        found.quantity += quantity
    } else {
        cart.push({
            id: productId,
            quantity,
            color
        })
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    console.log(cart);

    alert('Item added to cart');
})

