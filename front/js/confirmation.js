const urlParams = new URLSearchParams(location.search);
const orderId = urlParams.get('orderId')

document.getElementById('orderId').innerText = orderId