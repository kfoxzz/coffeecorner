let itemArray = [];
let keys = Object.keys(localStorage);
for (let key of keys) {
        const quantity = localStorage.getItem(key);
        itemArray.push({
                price: key,
                quantity: quantity
        });
}

window.onload = function() {
        for (i = 0; i < itemArray.length; i++) {
                const priceId = itemArray[i].price;
                if (document.getElementById(priceId)) {
                        const itemElem = document.getElementById(priceId);
                        itemElem.style.display = "inline";
                        itemElem.querySelector('.quantity').innerHTML = `x ${itemArray[i].quantity}`
                }
        }
}

const initiateCheckout = () => {
        const itemData = {
                data: itemArray
        }
        console.log(itemData);
        fetch('http://localhost:4000/create-checkout-session', {
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




