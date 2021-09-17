let itemArray = [];
let keys = Object.keys(localStorage);

for (let key of keys) {
        const quantity = localStorage.getItem(key);
        itemArray.push({
                price: key,
                quantity: quantity
        });
}

const updateCart = () => {
        for (i = 0; i < itemArray.length; i++) {
                const priceId = itemArray[i].price;
                if (document.getElementById(priceId)) {
                        const itemElem = document.getElementById(priceId);
                        itemElem.style.display = "inline";
                        itemElem.querySelector('.quantity').innerHTML = `x ${itemArray[i].quantity}`
                }
        }
        if (itemArray.length === 0) {
                document.getElementById("cartItems").innerHTML = "Your cart is empty";
        }
}

window.onload = updateCart();

const removeFromCart = (priceId) => {
        const itemElem = document.getElementById(priceId);
        itemElem.style.display = "none";
        localStorage.removeItem(priceId);
        for (i = 0; i < itemArray.length; i++) {
                const itemPrice = itemArray[i].price;
                if (itemPrice === priceId) {
                        itemArray.splice(i, 1);
                }
        }
        if (itemArray.length === 0) {
                document.getElementById("cartItems").innerHTML = "Your cart is empty";
        }
}

const addToCart = (quantitySelected, priceId) => {
        const quantity = document.getElementById(quantitySelected).value;
        if (quantity === "Quantity") {
                alert('Select a quantity to add to cart.');
        } else {
                if (window.localStorage.getItem(priceId)) {
                        const newQuantity = parseInt(quantity) + parseInt(window.localStorage.getItem(priceId))
                        window.localStorage.setItem(priceId, newQuantity);
                } else {
                        window.localStorage.setItem(priceId, quantity);
                }
        }
        location.reload();
}

const initiateCheckout = () => {
        const itemData = {
                data: itemArray
        }
        fetch('https://www.coffee-corner-server.onrender.com/create-checkout-session', {
                method: 'POST',
                headers: new Headers({
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                }),
                body: JSON.stringify(itemData),
        })
        .then(response => response.json())
        .then(data => window.location = data.url);
}