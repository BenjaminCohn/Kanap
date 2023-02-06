// Récupèrer l'id transmis dans le liens pour effectuer une requête avec celui ci en paramètre
var actualUrl = document.location.href;
    actualUrl = new URL(actualUrl);
var id = actualUrl.searchParams.get("id");

const url = "http://localhost:3000/api/products/" + id; 

/**
 *Récuperer l'article associé à l'id transmis pour afficher ensuite les détails
 * @param {String} url
 * @return {Promise}
 **/

 function ajax (url){
    fetch(url)
    .then(function(res){
        if (res.ok) {
            return res.json();
        }
    })
 .then(function (article){
    createArticlePage(
        article.imageUrl,
        article.altTxt,
        article.name,
        article.price,
        article.description,
        article.colors
    );
    gestionPanier(id, article.name);
 })

 .catch(function (err){
    console.log(err);
 });
}
ajax (url);

/**
 * Remplissage de la page article avec les infos récupérer via l'id/class renseigné
 * @param { String } imageUrl
 * @param { String } imageAlt
 * @param { String } name
 * @param { String } price
 * @param { String } description
 * @param { String } colors
 **/
function createArticlePage(
    imageUrl,
    imageAlt,
    name,
    price,
    description,
    colors
  ) {

// modification du titre de la page
    document.title = name;

// ajout de l'image de l'article
let item__img = document.getElementsByClassName("item__img");
  let pictureItem = document.createElement("img");
  pictureItem.src = imageUrl;
  pictureItem.alt = imageAlt;
  item__img[0].append(pictureItem);


// ajout du titre du produit

document.getElementById("title").textContent = name;

// ajout du prix du produit
document.getElementById("price").textContent = price;

// ajout de la description du produit
document.getElementById("description").textContent = description;

for (let color of colors) {
    let optionColor = document.createElement("option");
    optionColor.value = color;
    optionColor.textContent = colors;
    colorSelector.append("optionColor");
}
}

// modal d'avertissement pour utilisateur à l'ajout au panier et peux ainsi le rediriger vers la pages panier

const popPanier = (name) => {
    if (
      window.confirm(
        `Vous avez réservé ${document.getElementById("quantity").value} ${name} ${
          document.getElementById("colors").value
        } Pour consulter votre panier, cliquez sur OK`
      )
    ) {
      window.location.href = "cart.html";
    }
  };
 
  /**
 * ajout ou update du panier (id et nom de l'article)
 * @param { String } id
 * @param { String } name
 **/

  function gestionPanier(id, name) {
    // Ajout de l'article demandé dans le panier
    document.getElementById("addToCart").addEventListener("click", (event) => {
      // Verrifier que la quantité et la couleur sont renseignées
      if (
        document.getElementById("quantity").value > 0 &&
        document.getElementById("quantity").value <= 100 &&
        document.getElementById("colors").value != ""
      ) {
      // récupération du local storage actuel

      let basket = JSON.parse(localStorage.getItem("Kanapstorage"));

      //Crée un objet Json avec les informations de l'article ciblé
      let article = {
        id: id,
        quantity: document.getElementById("quantity").value,
        colors: document.getElementById("colors").value,
      };
// Si le panier récupéré (localStorage) contient un ou plusieurs articles
if (basket) {
    console.log("Panier contenant du contenu, je verrifie");

    // On cherche ici parmis les articles du panier récupérer si celui qu'on souhaite ajouter y figure déjà
    const articlePresent = basket.find(
      (el) => el.id === article.id && el.colors === article.colors
    );

    if (articlePresent) {
      console.log(
        "Produit trouvé, donc je n'ajoute pas, j'ajuste la quantité"
      );
      articlePresent.quantity =
        parseInt(article.quantity) + parseInt(articlePresent.quantity);
      localStorage.setItem("kanapBasket", JSON.stringify(basket));
      popupPanier(name);
    } else {
      console.log("Produit non trouvé, donc j'ajoute");
      basket.push(article);
      localStorage.setItem("kanapBasket", JSON.stringify(basket));
      popupPanier(name);
    }
  } else {
    console.log("Panier vide, donc j'ajoute");
    basket = [];
    basket.push(article);
    localStorage.setItem("kanapBasket", JSON.stringify(basket));
    popupPanier(name);
  }

  console.log(basket);
  console.log(localStorage);
} else {
  alert("Vous devez renseigner le nombre d'articles et la couleur.");
}
});
}

// localStorage.clear();
// 
  

