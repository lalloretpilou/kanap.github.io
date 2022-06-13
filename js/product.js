getProducts()
creationProducts()

function getIdProduct(){
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


function addCart () {

    let productCart = JSON.parse(localStorage.getItem("cart"));

    let CurrentProduct = {
        Id : getIdProduct(),
        Color : document.querySelector("#colors").value,
        Quantity : document.querySelector("#quantity").value,
        Name: document.querySelector("#title").textContent,
        price: document.querySelector("#price").textContent
    };

    if (document.querySelector("#quantity").value == 0 || 
    document.querySelector("#colors").value == 0) {
    alert("Merci de mettre une quantité");
    }
    else {
    productCart.push(CurrentProduct);

    let objCart = JSON.stringify(productCart);
    localStorage.setItem("cart", objCart);

    console.log(productCart)
    alert("Votre article est dans votre panier !");

    }
}