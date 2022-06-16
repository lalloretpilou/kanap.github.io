let monPanier = JSON.parse(localStorage.getItem("panier"));
//console.log(monPanier);
let totalQuantity = 0;
let totalPrice = 0;

checkCart(monPanier)
console.log(monPanier)

function checkCart(monPanier) {
    if (monPanier.length === 0) {
        return false
    }
    else {
        dispCart(monPanier)
    }
}

function dispCart(monPanier) {
    for (let i = 0; i < monPanier.length; i++) {

        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", monPanier[i].id);

        setHeaderProduct(productArticle, i)
        setQuantityProduct(productArticle, i)
        deleteProductButton(productArticle, i)
        
        totalQuantity += parseInt(monPanier[i].Quantity);
        totalPrice += parseInt(monPanier[i].price);
        dispQuantity(totalQuantity)
        dispPrice(totalPrice)
    }
}

function setImageProduct(product, i) { }
function setHeaderProduct(product, i) {
    let currentProduct = document.createElement("div");
    product.appendChild(currentProduct);
    currentProduct.className = "cart__item__content";

    let currentProductHeaderInfoDiv = document.createElement("div");
    currentProduct.appendChild(currentProductHeaderInfoDiv);
    currentProductHeaderInfoDiv.className = "cart__item__content__titlePrice";

    let currentProductTitle = document.createElement("h2");
    currentProductHeaderInfoDiv.appendChild(currentProductTitle);
    currentProductTitle.innerHTML = monPanier[i].Name;
    let currentProductColor = document.createElement("p");
    currentProductHeaderInfoDiv.appendChild(currentProductColor);
    currentProductColor.innerHTML = "Couleurs: " + monPanier[i].Color;
    let currentProductPrice = document.createElement("p");
    currentProductHeaderInfoDiv.appendChild(currentProductPrice);
    currentProductPrice.innerHTML = monPanier[i].price + "€";
}

function setQuantityProduct(product, i) {
    let currentProduct = document.createElement("div");
    product.appendChild(currentProduct);
    currentProduct.className = "cart__item__content__settings";

    let currentProductQuantityDiv = document.createElement("div");
    currentProduct.appendChild(currentProductQuantityDiv);
    currentProductQuantityDiv.className = "cart__item__content__settings__quantity";

    let currentProductQuantity = document.createElement("p");
    currentProductQuantityDiv.appendChild(currentProductQuantity);
    currentProductQuantity.innerHTML = "Qté :";
    let currentProductQuantityInput = document.createElement("input");
    currentProductQuantityDiv.appendChild(currentProductQuantityInput);
    currentProductQuantityInput.placeholder = monPanier[i].Quantity;
}
function deleteProductButton(product, i) {
    let currentProduct = document.createElement("div");
    product.appendChild(currentProduct);
    currentProduct.className = "cart__item__content__settings";

    let deleteCurrentProduct = document.createElement("div");
    currentProduct.appendChild(deleteCurrentProduct);
    deleteCurrentProduct.className = "cart__item__content__settings__delete";

    let currentProductDeleteText = document.createElement("p");
    deleteCurrentProduct.appendChild(currentProductDeleteText);
    currentProductDeleteText.innerHTML = "Supprimer";
}

function dispQuantity(totalQuantity)
{
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQuantity;
}

function dispPrice(totalQuantity)
{
    let productTotalQuantity = document.getElementById('totalPrice');
    productTotalQuantity.innerHTML = totalQuantity;
}
