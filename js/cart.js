

let monPanier = JSON.parse(localStorage.getItem("panier"));

let totalQuantity = 0;
let totalPrice = 0;

dispCart(monPanier)

function checkCart(monPanier) {

    if (monPanier.length === 0) {
        return false
    }
    else {
        dispCart(monPanier)
    }
}
// Cette fonction permet d'afficher le panier. 
// J'ai séparé le processus en plusieurs fonctions afin de faciliter à la fois le codage et la maintenance du code.
function dispCart(monPanier) {

    for (let i = 0; i < monPanier.length; i++) {

        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", monPanier[i].id);

        setImageProduct(productArticle, i)
        setHeaderProduct(productArticle, i)
        setQuantityProduct(productArticle, i)
        deleteProductButton(productArticle, i)

        totalQuantity += parseInt(monPanier[i].quantity);
        totalPrice += parseInt(monPanier[i].price) * monPanier[i].quantity;
        dispQuantity(totalQuantity)
        dispPrice(totalPrice)
    }
}
// Affichage  de l'image et de la description du produit.
function setImageProduct(product, i) {

    let currentProduct = document.createElement("div");
    product.appendChild(currentProduct);
    currentProduct.className = "cart__item__img";

    let currentProductImage = document.createElement("img");
    currentProduct.appendChild(currentProductImage);
    currentProductImage.src = monPanier[i].image;
    currentProductImage.alt = monPanier[i].imageAlt;
}
// Affichage des informations du produit. titre, couleur, prix.
function setHeaderProduct(product, i) {
    let currentProduct = document.createElement("div");
    product.appendChild(currentProduct);
    currentProduct.className = "cart__item__content";

    let currentProductHeaderInfoDiv = document.createElement("div");
    currentProduct.appendChild(currentProductHeaderInfoDiv);
    currentProductHeaderInfoDiv.className = "cart__item__content__titlePrice";

    let currentProductTitle = document.createElement("h2");
    currentProductHeaderInfoDiv.appendChild(currentProductTitle);
    currentProductTitle.innerHTML = monPanier[i].name;
    let currentProductColor = document.createElement("p");
    currentProductHeaderInfoDiv.appendChild(currentProductColor);
    currentProductColor.innerHTML = "Couleurs: " + monPanier[i].color;
    let currentProductPrice = document.createElement("p");
    currentProductHeaderInfoDiv.appendChild(currentProductPrice);
    currentProductPrice.innerHTML = monPanier[i].price + "€";
}
// Affichage de la quantité dans un champs de saisie afin de pouvoir la modifier.
// La quantité actuelle prend la place du placeHolder
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
    currentProductQuantityInput.placeholder = monPanier[i].quantity;

    currentProductQuantityInput.addEventListener("change", (changeEvent) => {
        console.log(monPanier[i].quantity)
        console.log("change");

        monPanier[i].quantity = currentProductQuantityInput.value;
        console.log(monPanier[i].quantity)
        localStorage.setItem('panier', JSON.stringify(monPanier));
        location.reload();
        checkCart(monPanier);
    });

}
// Affichage du bouton supprimer
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
    currentProductDeleteText.addEventListener("click", (deleteEvent) => {
        //deleteEvent.preventDefault;
        monPanier.splice(i, 1);
        localStorage.setItem('panier', JSON.stringify(monPanier));
        monPanier.reload
        //location.reload();
        dispCart(monPanier);
    });
}

// Les deux prochaines fonctions permettent d'afficher la quantité et le prix global.
// les deux variables sont initialisées en haut de la page.
function dispQuantity(totalQuantity) {
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQuantity;
}

function dispPrice(totalPrice) {
    let productTotalQuantity = document.getElementById('totalPrice');
    productTotalQuantity.innerHTML = totalPrice;
}

// Préparation des informations pour le passage de la commande.
// A savoir les données du formulaire et le tableau des ID des produits.
// Execution des 3 fonctions REGEX afin de vérifier les contenus des sasies.
// Execution de l'envoi POST à l'API.
function purchaseData(monPanier) {
    let makePurchaseBtn = document.getElementById("order");
    makePurchaseBtn.addEventListener("click", (makePurchase) => {
        makePurchase.preventDefault();

        const contact = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value
        }
        let products = [];
        for (let i = 0; i < monPanier.length; i++) {
            products.push(monPanier[i].id);
        }

        const commandBody = {
            contact,
            products
        };
        validateAddress();
        validateStr();
        validateEmail();
        if (validateEmail() && validateAddress() && validateStr()) {
            fetch('http://localhost:3000/api/products/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commandBody),
            })
                .then(response => response.json())
                .then(data => {
                    //localStorage.setItem('orderId', data.orderId);
                    document.location.href = 'confirmation.html?id=' + data.orderId;
                });
        }
    });
}
purchaseData(monPanier);

// Les fonctions si après sont les REGEX
// Chaque fonction vérifie le format de la saisie de l'utilisateur et renvoie la valeur du BOOL
// En cas d'erreur, un message s'affiche en dessous du présent champs.
function validateAddress() {
    var Address = document.getElementById('address').value;
    var AdressRGEX = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
    const orderId = document.getElementById('addressErrorMsg');


    if (AdressRGEX.test(Address)) {
        orderId.innerText = '';
    } else {
        orderId.innerText = 'Veuillez renseigner votre adresse postale correcte.';
    }
    return (AdressRGEX.test(Address));
}

function validateEmail() {
    var Email = document.getElementById('email').value;
    var emailRGEX = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

    if (emailRGEX.test(Email)) {
        emailErrorMsg.innerText = '';
    } else {
        emailErrorMsg.innerText = 'Veuillez renseigner votre email.';
    }

    return (emailRGEX.test(Email));
}

function validateStr() {
    var lastName = document.getElementById('lastName').value;
    var firstName = document.getElementById('firstName').value;
    var city = document.getElementById('city').value;
    var strRGEX = /^[a-zA-Z ,.'-]+$/;

    const lastNameErr = document.getElementById('lastNameErrorMsg');
    const firstNameErr = document.getElementById('firstNameErrorMsg');
    const cityErr = document.getElementById('cityErrorMsg');


    if (strRGEX.test(lastName) || strRGEX.test(firstName) || strRGEX.test(city)) {
        lastNameErr.innerText = '';
        firstNameErr.innerText = '';
        cityErr.innerText = '';
        return (true);
    } else {
        lastNameErr.innerText = "Votre saisie n'est pas correct.";
        firstNameErr.innerText = "Votre saisie n'est pas correct.";
        cityErr.innerText = "Votre saisie n'est pas correct.";

        return (false);
    }
}
