
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

/**
 * Insert items into cart from local storage
 * 
 * @param {Object[]} products List of product information.
 */
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

/**
 * Update the totals of the items in the cart when changed.
 * 
 * @param {number} quantity quantity of cart item.
 * @param {number} price price of cart item.
 */
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

/**
 * Remove an item from the cart.
 * 
 * @param {object[]} $event Removes an item from the cart on 'click'
 */
function deleteItem($event) {
  const clickedElement = $event.target;
  const articleElement = clickedElement.closest('.cart__item');
  const { id, color } = productIdentifier(articleElement);
  const latestCart = getLatestCart();
  const newCart = latestCart.filter(cartItem => cartItem.id !== id || cartItem.color !== color);
  const cartItemRemove = latestCart.find(cartItem => cartItem.id === id && cartItem.color === color);
  const findProduct = productCache.find(product => product._id === cartItemRemove.id)

  localStorage.setItem('cart', JSON.stringify(newCart));
  articleElement.remove();

  updateTotals(-cartItemRemove.quantity, findProduct.price);
}

/**
 * Change the quanity on the cart page
 * 
 * @param {any[]} $event Change the quantity of a cart item when input has 'changed'
 */
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

const emailInput = document.getElementById('email');
emailInput.addEventListener('change', validateEmail);

/**
 * Validate the email input for the contact us secion.
 * 
 * @param {any} $event Validates the email addresss and ensures it is in the correct format when entered.
 * @returns 
 */
function validateEmail($event) {
  let emailInput;
  if ($event) {
    emailInput =
      $event.target.value;
  }
  else {
    emailInput = document.getElementById('email').value;
  }
  let validRegex = /\S+@\S+\.\S+/;
  let result = validRegex.test(emailInput);
  let emailErrorMessage = 'Please ensure email is in the correct format'
  let emailError = document.getElementById('emailErrorMsg');
  emailError.innerText = "";

  if (!result) {

    emailError.innerText = emailErrorMessage;
  }

  return result;
}



const firstNameInput = document.getElementById('firstName');
firstNameInput.addEventListener('change', validateFirstName);

const lastNameInput = document.getElementById('lastName');
lastNameInput.addEventListener('change', validateLastName);

const cityInput = document.getElementById('city');
cityInput.addEventListener('change', validateCity);

let validTextRegex = /^[a-zA-Z\s]+$/;
let textErrorMessage = 'Please enter valid text. Do not include numbers'

/**
 * Validates the First Name input for the contact us section.
 * 
 * @param {any} $event Validates the first name and ensures it is in the correct format when entered.
 * @returns 
 */
function validateFirstName($event) {
  let firstNameInput;
  if ($event) {
    firstNameInput =
      $event.target.value;
  }
  else {
    firstNameInput = document.getElementById('firstName').value;
  }
  let result = validTextRegex.test(firstNameInput);
  let firstNameError = document.getElementById('firstNameErrorMsg');
  firstNameError.innerText = "";

  if (!result) {

    firstNameError.innerText = textErrorMessage;
  }
  return result;
}
/**
 * Validates the Last Name input for the contact us section.
 * 
 * @param {any} $event Validates the last name and ensures it is in the correct format when entered.
 * @returns 
 */
function validateLastName($event) {
  let lastNameInput;
  if ($event) {
    lastNameInput =
      $event.target.value;
  }
  else {
    lastNameInput = document.getElementById('lastName').value;
  }
  let result = validTextRegex.test(lastNameInput);
  let lastNameError = document.getElementById('lastNameErrorMsg');
  lastNameError.innerText = "";

  if (!result) {

    lastNameError.innerText = textErrorMessage;
  }
  return result;
}

/**
 * Validates the City input for the contact us section.
 * 
 * @param {any} $event Validates the city and ensures it is in the correct format when entered.
 * @returns 
 */
function validateCity($event) {
  let cityInput;
  if ($event) {
    cityInput = $event.target.value;
  }
  else {
    cityInput = document.getElementById('city').value;
  }
  let result = validTextRegex.test(cityInput);
  let cityError = document.getElementById('cityErrorMsg');
  cityError.innerText = "";

  if (!result) {
    cityError.innerText = textErrorMessage;
  }
  return result;
}


const addressInput = document.getElementById('address');
addressInput.addEventListener('change', validateAddress);

/**
 * Validates the Address input for the contact us section.
 * 
 * @param {any} $event Validates the address and ensures it is in the correct format when entered.
 * @returns 
 */
function validateAddress($event) {
  let addressInput;
  if ($event) {
    addressInput =
      $event.target.value;
  }
  else {
    addressInput = document.getElementById('address').value;
  }
  let validRegex = /[^<>%$!"£&*]/;
  let result = validRegex.test(addressInput);
  let addressErrorMessage = 'Your address can not include special characters'
  let addressError = document.getElementById('addressErrorMsg');
  addressError.innerText = "";

  if (!result) {

    addressError.innerText = addressErrorMessage;
  }
  return result;
}

const submitButton = document.getElementById('order');
submitButton.addEventListener('click', submitOrder);

/**
 * Submits the order of the cart.
 * 
 * @param {object[]} $event When pressed the items of the cart are submitted so that the order may be fullfilled. 
 */
function submitOrder($event) {
  $event.preventDefault()
  const latestCart = getLatestCart();
  const products = latestCart.map(cartItem => cartItem.id);

  if (!latestCart?.length) {

    alert('Cart is empty')

  } else if (validateCity() && validateAddress() && validateEmail() && validateFirstName() && validateLastName()) {

    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: {
        'Content-type': 'application/JSON'
      },
      body: JSON.stringify(
        {
          "contact": {
            "firstName": firstNameInput,
            "lastName": lastNameInput,
            "address": addressInput,
            "city": cityInput,
            "email": emailInput
          },
          products
        }
      )
    })

      .then(res => res.json())
      .then(data => {
        console.log(data);
        localStorage.removeItem('cart');
        location.assign(
          `./confirmation.html?orderId=${data.orderId}`);
      })
  } else {
    alert('Please ensure that your details are correct!')
  }


}

