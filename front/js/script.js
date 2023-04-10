
// Get things from the backend
fetch('http://localhost:3000/api/products')
    .then(data => {
        return data.json();
    })
    .then(products => {
        insertProducts(products);
    });

/**
 * Inserts the product information into the HTML. 
 * 
 * @param {object[]} products Product descpription. Includes: Image, Title, Price, Description & Colours.
 */
function insertProducts(products) {
    const productHolder = document.getElementById('products');

    // Interate the things from the back end
    for (let i = 0; i < products.length; i++) {

        // Get current element in the array
        const product = products[i];

        productHolder.innerHTML += `
            <a href="./product.html?id=${product._id}">
                <article>
                    <img src=${product.imageUrl} alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>
        `;
    }
}