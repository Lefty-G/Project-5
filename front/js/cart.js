
// Get things from backend
fetch('http://localhost:3000/api/products')
  .then(data => {
    return data.json();
  })
  .then(products => {
    productCache = products
    insertProducts(products);
  });

let cart = getLatestCart() || [];


let productCache;
const totalQuantityElement = document.getElementById('totalQuantity');
const totalPriceElement = document.getElementById('totalPrice');


// Insert items into cart from local storage
function insertProducts(products) {
  const productHolder = document.getElementById('cart__items');

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
    updateTotals(cartItem.quantity, product.price);

    const deleteButton = elementContainer.querySelector('.deleteItem');
    const quantityButton = elementContainer.querySelector('.itemQuantity');

    deleteButton.addEventListener('click', deleteItem);
    quantityButton.addEventListener('change', changeQuantity);


  }
}


function updateTotals(quantity, price) {
  let totalQuantity = parseInt(totalQuantityElement.innerText) || 0
  let totalPrice = parseInt(totalPriceElement.innerText) || 0
  totalQuantity += quantity;
  totalQuantityElement.innerText = totalQuantity;
  totalPrice += price * quantity;
  totalPriceElement.innerText = totalPrice;
}

function productIdentifier(articleElement) {
  const color = articleElement.dataset.color;
  const id = articleElement.dataset.id;
  return { id, color };
}

function getLatestCart() {
  return JSON.parse(localStorage.getItem('cart'));
}



// Remove item 
function deleteItem($event) {
  const clickedElement = $event.target;
  const articleElement = clickedElement.closest('.cart__item');
  const { id, color } = productIdentifier(articleElement);
  const latestCart = getLatestCart();
  const newCart = latestCart.filter(cartItem => cartItem.id !== id || cartItem.color !== color);
  const cartItemRemove = latestCart.find(cartItem => cartItem.id === id && cartItem.color === color);
  const findProduct = productCache.find(product => product._id === cartItemRemove.id)

  console.log(findProduct)
  console.log(cartItemRemove)
  console.log(newCart)

  localStorage.setItem('cart', JSON.stringify(newCart));
  articleElement.remove();


  updateTotals(-cartItemRemove.quantity, findProduct.price);


}

// Change the quanity on the cart page
function changeQuantity($event) {
  const changedElement = $event.target;
  const articleElement = changedElement.closest('.cart__item');
  const { id, color } = productIdentifier(articleElement);
  const latestCart = getLatestCart();
  const cartItemToChange = latestCart.find(cartItem => cartItem.id === id || cartItem.color === color);
  const findProduct = productCache.find(product => product._id === cartItemToChange.id)
  const cartItemQuantity = parseInt(cartItemToChange.quantity) || 0;
  const newElement = parseInt(changedElement.value) || 0;

  updateTotals(newElement - cartItemQuantity, findProduct.price);

  cartItemToChange.quantity = parseInt(changedElement.value);
  console.log(cartItemToChange)

  localStorage.setItem('cart', JSON.stringify(latestCart));
  console.log(latestCart)

}


// Validate email

const emailInput = document.getElementById('email');
emailInput.addEventListener('change', validateEmail);

function validateEmail($event) {
  const emailInput = $event.target.value;
  let validRegex = /\S+@\S+\.\S+/;
  let result = validRegex.test(emailInput);
  let emailErrorMessage = 'Please ensure email is in the correct format'
  let emailError = document.getElementById('emailErrorMsg');
  emailError.innerHTML = "";

  if (!result) {
    
    emailError.innerHTML = `
    <p id="emailErrorMsg">${emailErrorMessage}</p>
    `
  }
}

//Validate text box (Names & city)

const firstNameInput = document.getElementById('firstName');
firstNameInput.addEventListener('change', validateFirstName);

const lastNameInput = document.getElementById('lastName');
lastNameInput.addEventListener('change', validateLastName);

const cityInput = document.getElementById('city');
cityInput.addEventListener('change', validateCity);

let validTextRegex = /^[a-zA-Z]+$/;
let textErrorMessage = 'Please enter valid text. Do not include numbers'

function validateFirstName($event) {
  const firstNameInput = $event.target.value;
  let result = validTextRegex.test(firstNameInput);
  let firstNameError = document.getElementById('firstNameErrorMsg');
  firstNameError.innerHTML = "";

  if (!result) {

    firstNameError.innerHTML = `
    <p id="firstNameErrorMsg">${textErrorMessage}</p>
    `
  }

}

function validateLastName($event) {
  const lastNameInput = $event.target.value;
  let result = validTextRegex.test(lastNameInput);
  let lastNameError = document.getElementById('lastNameErrorMsg');
  lastNameError.innerHTML = "";

  if (!result) {

    lastNameError.innerHTML = `
    <p id="lastNameErrorMsg">${textErrorMessage}</p>
    `
  }
}


function validateCity($event) {
  const cityInput = $event.target.value;
  let result = validTextRegex.test(cityInput);
  let cityError = document.getElementById('cityErrorMsg');
  cityError.innerHTML = "";
  
  if (!result) {

    cityError.innerHTML = `
    <p id="cityErrorMsg">${textErrorMessage}</p>
    `
  }

}


// Validate Address

const addressInput = document.getElementById('address');
addressInput.addEventListener('change', validateAddress);

function validateAddress($event) {
  const addressInput = $event.target.value;
  let validRegex = /[^<>%$!"£&*]/;
  let result = validRegex.test(addressInput);
  let addressErrorMessage = 'Your address can not include special characters'
  let addressError = document.getElementById('addressErrorMsg');
  addressError.innerHTML = "";

  if (!result) {

    addressError.innerHTML = `
    <p id="addressErrorMsg">${addressErrorMessage}</p>
    `
  }

}

function validateIt($event) {
  let theValue;
  if (validateAddress($event)) { theValue = 
    $event.target.value; }
  else { theValue = document.getElementById('address').value }
    
  if (validateCity($event)) {theValue = 
    $event.target.value; }
  else { theValue = document.getElementById('city').value }

  if (validateFirstName($event)) {theValue = 
    $event.target.value; }
  else { theValue = document.getElementById('firstName').value }

  if (validateLastName($event)) {theValue = 
    $event.target.value; }
  else { theValue = document.getElementById('lastName').value }

  if (validateEmail($event)) {theValue = 
    $event.target.value; }
  else { theValue = document.getElementById('email').value }

}

const submitButton = document.getElementById('order');
submitButton.addEventListener('click', submitOrder);

function submitOrder($event) {
  $event.preventDefault()
  const latestCart = getLatestCart();
  const products = latestCart.map(cartItem => cartItem.id);

  if(!latestCart?.length){

    alert('Cart is empty')

  }
  
 if (validateCity && validateAddress && validateEmail && validateFirstName && validateLastName && validateIt) {

  fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      'Content-type': 'application/JSON'
    },
    body: JSON.stringify(
      {
        "contact": {
          "firstName": "Gerry",
          "lastName": "wrigh",
          "address": "1123213a",
          "city": "asdawe",
          "email": "asdasdasd"
        },
        products 
      }
    )
  })

  .then(res => res.json())
  .then(data => console.log(data))
// window.location.assign(
//   "../css/confirmation.css"
// );
 }
}


// TODO add a final validation for the contact info when pressing the "order" button. 