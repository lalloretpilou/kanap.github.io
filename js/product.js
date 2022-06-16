getProducts()
creationProducts()

function getIdProduct() {
    var url = new URL(window.location.href);
    var productID = new URLSearchParams(url.search);
    var id = productID.get('id');

    return (id);
}
async function getProducts() {

    var url = new URL(window.location.href);
    var productID = new URLSearchParams(url.search);
    var id = productID.get('id');

    let urlProductDetails = 'http://localhost:3000/api/products/' + id
    //console.log(urlProductDetails);
    let products = await fetch(urlProductDetails);
    return products.json();
}

async function creationProducts() {
    let result = await getProducts()
        .then((product) => {
            //console.log(product)

            let image = document.createElement("img");
            document.querySelector(".item__img").appendChild(image);
            image.src = product.imageUrl;
            image.alt = product.altTxt;

            let name = document.getElementById("title");
            name.innerHTML = product.name;

            let price = document.getElementById("price");
            price.innerHTML = product.price;

            let description = document.getElementById("description");
            description.innerHTML = product.description;

            let inputSelectColor = document.getElementById("colors")

            for (let i = 0; i < product.colors.length; i++) {
                let colorOption = document.createElement("option");
                let colorName = product.colors[i];
                colorOption.setAttribute("value", colorName);
                colorOption.innerHTML = colorName;
                inputSelectColor.appendChild(colorOption);
            }
        })
        .catch(function (error) {
            return error;
        });
}

let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addCart);

  function idExists(monPanier) {

    for (let i = 0; i < monPanier.length; i++)
    {
        console.log(monPanier[i].Color)
        if (getIdProduct() == monPanier[i].Id &&
        document.querySelector("#colors").value == monPanier[i].Color) {
            return true;
        }
        else {
            return false;
        }
    }
  }

function addCart() {

    let monPanier = JSON.parse(localStorage.getItem("panier"))

    let CurrentProduct = {
        Id: getIdProduct(),
        Color: document.querySelector("#colors").value,
        Quantity: document.querySelector("#quantity").value,
        Name: document.querySelector("#title").textContent,
        price: document.querySelector("#price").textContent
    };
    if (checkProductInput() && !idExists(monPanier)) {

        console.log(monPanier)
        if (monPanier) {
            let productCart = JSON.parse(localStorage.getItem("panier"));

            monPanier.push(CurrentProduct);
            localStorage.setItem("panier", JSON.stringify(monPanier));
        }

        else {
            monPanier = [];
            monPanier.push(CurrentProduct);
            localStorage.setItem("panier", JSON.stringify(monPanier));
            console.log(monPanier)
            alert("Votre article est dans votre panier !");
        }
    }
}

function checkProductInput() {

    if (document.querySelector("#quantity").value != 0 &&
        document.querySelector("#colors").value != 0) {
        return true;
    }
    else {
        alert("Merci de completer les champs avant d'ajouter au panier.");
        return false
    }
}