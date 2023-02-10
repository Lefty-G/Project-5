const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const productId = urlParams.get('id')

console.log(productId);

fetch(`http://localhost:3000/api/products/${productId}`)
    .then(data => {
        return data.json();
    })
    .then(product => {
        insertProduct(product);
    });


function insertProduct(product) {
    insertProductImage(product);
    insertProductTitlePrice(product);
    insertProductDescription(product);
    insertProductColors(product);
}

//TitlePrice
function insertProductTitlePrice(product) {
    const productTitlePrice = document.getElementById('content-titlePrice');
    console.log(productTitlePrice);

    productTitlePrice.innerHTML = `
        <h1 id="title">${product.name}</h1>
        <p>Prix : <span id="price">${product.price}</span>€</p>
    `

}

//Image
function insertProductImage(product) {
    const productImage = document.getElementById('images');
    console.log(productImage);


    productImage.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.altTxt}">
    `;
}

//Description
function insertProductDescription(product) {
    const productDescription = document.getElementById('content-description')
    console.log(productDescription);

    productDescription.innerHTML = `
        <p id="description">${product.description}</p>
    `;

}

//Colours
function insertProductColors(product) {
    const insertColors = document.getElementById('colors');

    for (let color of product.colors) {
        console.log(color);

        // const color = product.colors[i];

        insertColors.innerHTML += `
            <option>${product.colors}</option>
        `;
    }
}