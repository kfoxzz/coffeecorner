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

