
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


// Insert items into cart from local storage
function insertProducts(products) {
  const productHolder = document.getElementById('cart__items');
  const totalQuantityElement = document.getElementById('totalQuantity');
  let totalQuantity = 0;
  const totalPriceElement = document.getElementById('totalPrice');
  let totalPrice = 0;

  for (let cartItem of cart) {

    const product = products.find(product => product._id === cartItem.id);

    let elementContainer = document.createElement('article');

    elementContainer.dataset.id = cartItem.id
    elementContainer.dataset.color = cartItem.color
    elementContainer.classList.add('cart__item')

    elementContainer.innerHTML = `
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
            `;

    productHolder.appendChild(elementContainer)

    totalQuantity += cartItem.quantity;
    totalQuantityElement.innerText = totalQuantity;

    totalPrice += product.price * cartItem.quantity;
    totalPriceElement.innerText = totalPrice;

    const deleteButton = elementContainer.querySelector('.deleteItem');
    const quantityButton = parseInt(elementContainer.querySelector('.itemQuantity').value);


    deleteButton.addEventListener('click', deleteItem);
    quantityButton.addEventListener('change', changeQuantity);
  }


// Remove item 
  function deleteItem($event) {
    const clickedElement = $event.target;
    const articleElement = clickedElement.closest('.cart__item');
    const color = articleElement.dataset.color;
    const id = articleElement.dataset.id;
    const found = cart.filter(cartItem => cartItem.id != id || cartItem.color != color);
    localStorage.setItem('cart', JSON.stringify(found));
    articleElement.remove();

  }

// Change quantity
  function changeQuantity($event) {
    const clickedElement = $event.target.value;
    const articleElement = clickedElement('.cart__item');
    
    
    console.log(quantity)
    // const change = 
  }


  // const removedQuantity = parseInt(articleContainer.querySelector('.itemQuantity').value);
  // let changeArticleEvent = $event.target.closest() inside function
  // changeEvent for quantity
  // closet to find element that has the data fields, that element has an ID $event.target.closest('article')
}

