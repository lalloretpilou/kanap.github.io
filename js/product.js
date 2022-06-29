getProducts()
creationProducts()
let imageSRC;
let imageALT;

//analyse l'URL de la page afin d'extraire l'ID du produit
function getIdProduct() {
    var url = new URL(window.location.href);
    var productID = new URLSearchParams(url.search);
    var id = productID.get('id');

    return (id);
}
// Grâce a l'ID présent dans l'url, nous pouvons maintenant construire l'URL de requête à l'API afin de récolter les infos du produit
async function getProducts() {

    var url = new URL(window.location.href);
    var productID = new URLSearchParams(url.search);
    var id = productID.get('id');

    let urlProductDetails = 'http://localhost:3000/api/products/' + id
    let products = await fetch(urlProductDetails);
    return products.json();
}

// Création des elements de la page afin d'afficher les infos du produit
async function creationProducts() {
    let result = await getProducts()
        .then((product) => {
            let image = document.createElement("img");
            document.querySelector(".item__img").appendChild(image);
            image.src = product.imageUrl;
            image.alt = product.altTxt;
            imageSRC = product.imageUrl;
            imageALT = product.altTxt;

            let name = document.getElementById("title");
            name.innerText = product.name;

            let price = document.getElementById("price");
            price.innerText = product.price;
            productPrice = product.price;

            let description = document.getElementById("description");
            description.innerText = product.description;

            let inputSelectColor = document.getElementById("colors");

            for (let i = 0; i < product.colors.length; i++) {
                let colorOption = document.createElement("option");
                let colorName = product.colors[i];
                colorOption.setAttribute("value", colorName);
                colorOption.innerText = colorName;
                inputSelectColor.appendChild(colorOption);
            }
        })
        .catch(function (error) {
            return error;
        });
}

// Permet d'executer la fonction addCart quand on appui sur le button
let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addCart);

// Cette fonction permet de savoir si le produit que veut ajouter l'utilisateur est deja dans le panier
function checkDuplicateProduct(monPanier)
{
    const result = monPanier.filter(article => article.id == getIdProduct()
    && article.color == document.querySelector("#colors").value);

    if (result.length > 0) {
        return true;
    }
    else {
        return false;
    }
}
// Cette fonction permet de mettre à jour la quantité du produit si celui ci est deja dans le panier
function idExists(monPanier) {
        const result = monPanier.find(article => article.id == getIdProduct()
            && article.color == document.querySelector("#colors").value);
        if (result) {
            let newQuanty = parseInt(document.querySelector("#quantity").value) + parseInt(result.quantity);
            result.quantity = newQuanty;
            localStorage.setItem('panier', JSON.stringify(monPanier));
        }
}
// Cette fonction permet d'ajouter un produit dans le panier.
// J'ai créée une structure qui regroupe toutes les informatiosn du produits à ajouter.
function addCart() {

    let monPanier = JSON.parse(localStorage.getItem("panier"))

    let CurrentProduct = {
        id: getIdProduct(),
        color: document.querySelector("#colors").value,
        quantity: document.querySelector("#quantity").value,
        name: document.querySelector("#title").textContent,
        //price: document.querySelector("#price").textContent,
        image: imageSRC,
        imageAlt: imageALT,
    };
    if (checkProductInput()) {

        if (monPanier) {
            if (!checkDuplicateProduct(monPanier)) {
                let productCart = JSON.parse(localStorage.getItem("panier"));
                monPanier.push(CurrentProduct);
                localStorage.setItem("panier", JSON.stringify(monPanier));
            }
            else {
                idExists(monPanier);
            }
        }

        else {
            monPanier = [];
            monPanier.push(CurrentProduct);
            localStorage.setItem("panier", JSON.stringify(monPanier));
        }
    }
    else {

    }
}
function clearcart() {
    monPanier = [];
}
// Permet de savoir si la couleur et la quantité ont ete renseignés avant de l'ajouter dans le panier
function checkProductInput() {

    if (document.querySelector("#quantity").value != 0 &&
        document.querySelector("#colors").value != 0) {
        return true;
    }
    else {
        return false
    }
}