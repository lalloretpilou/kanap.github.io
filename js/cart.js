let productInTheCart = JSON.parse(localStorage.getItem("cart"));


if (productInTheCart.length != 0) {
for (let i=0; i < productInTheCart.length; i++) {
}
}
else {
    alert("Votre panier est vide");
}
