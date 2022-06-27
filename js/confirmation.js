const id = new URL(window.location.href).searchParams.get("id");

dispOrderId()

// Cette fonction affiche l'order ID et efface la panier de l'utilisateur

function dispOrderId() {
    const orderId = document.getElementById('orderId');
    orderId.innerText = id;
    localStorage.clear();
}