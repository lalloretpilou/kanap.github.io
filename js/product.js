getProducts()
creationProducts()

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


            let color = document.createElement("option")

            

        })
        .catch(function (error) {
            return error;
        });
}