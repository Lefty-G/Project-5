
// Get things from backend
fetch('http://localhost:3000/api/products')
  .then(data => {
    return data.json();
  })
  .then(products => {
    insertProducts(products);
  });

let cart = {};
if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
}

function insertProducts(products) {
  const productHolder = document.getElementById('cart__items');
  const totalQuantityElement = document.getElementById('totalQuantity');
  let totalQuantity = 0;
  const totalPriceElement = document.getElementById('totalPrice');
  let totalPrice = 0;

  for (let cartItem of cart) {

    const product = products.find(product => product._id === cartItem.id);

    productHolder.innerHTML += `
            <article class="cart__item" data-id="${cartItem.id}" data-color="${cartItem.color}">
            <div class="cart__item__img">
              <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${cartItem.color}</p>
                <p>€${product.price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Quantity : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItem.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Delete</p>
                </div>
              </div>
            </div>
          </article>
            `;

    totalQuantity += cartItem.quantity;
    totalQuantityElement.innerText = totalQuantity;

    totalPrice += product.price * cartItem.quantity;
    totalPriceElement.innerText = totalPrice;
  }

// let changeArticleEvent = $event.target.closest() inside function

// clickEvent for delete
// changeEvent for quantity
// closet to find element that has the data fields, that element has an ID $event.target.closest('article')
}

