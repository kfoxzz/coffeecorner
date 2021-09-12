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
}
