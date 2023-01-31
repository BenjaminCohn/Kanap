// Recuperation de l'id transmis dans le lien pour l'afficher

function getOrderId() {
    let actualUrl = document.location.href;
    actualUrl = new URL(actualUrl);
    let id = actualUrl.searchParams.get("id");

    //J'affiche l'id de commande dans le text

    document.getElementById("orderId").textContent = id;
}
getOrderId();