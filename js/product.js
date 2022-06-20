getProducts()
creationProducts()
let imageSRC;
let imageALT;

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
    let products = await fetch(urlProductDetails);
    return products.json();
}

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
            name.innerHTML = product.name;

            let price = document.getElementById("price");
            price.innerHTML = product.price;

            let description = document.getElementById("description");
            description.innerHTML = product.description;

            let inputSelectColor = document.getElementById("colors");

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

    const result = monPanier.filter(article => article.id == getIdProduct() 
    && article.color == document.querySelector("#colors").value);

    if (result.length > 0) {
        alert("L'article est déjà dans le panier.");  
    }
    return result;
  }

function addCart() {

    let monPanier = JSON.parse(localStorage.getItem("panier"))

    let CurrentProduct = {
        id: getIdProduct(),
        color: document.querySelector("#colors").value,
        quantity: document.querySelector("#quantity").value,
        name: document.querySelector("#title").textContent,
        price: document.querySelector("#price").textContent,
        image: imageSRC,
        imageAlt: imageALT

    };
    if (checkProductInput() && idExists(monPanier).length == 0) {

        //console.log(monPanier)
        if (monPanier) {
                let productCart = JSON.parse(localStorage.getItem("panier"));

                monPanier.push(CurrentProduct);
                localStorage.setItem("panier", JSON.stringify(monPanier)); 
                alert("L'article a bien été ajouté dans le panier.");  
        }

        else {
            monPanier = [];
            monPanier.push(CurrentProduct);
            localStorage.setItem("panier", JSON.stringify(monPanier));
            alert("Votre article est dans votre panier !");
        }
    }
}
function clearKart ()
{
    monPanier = [];
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