/**
 * Récuperer tous les articles du site en fonction des id dans le panier pour pouvoir les afficher par la suite
 * @param { String } url
 * @return { Promise }
 **/
function ajax(url, quantity, color) {
    fetch(url)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (articles) {
        // console.log(articles);
        createPanierArticle(
          articles._id,
          articles.imageUrl,
          articles.altTxt,
          articles.name,
          color,
          articles.price,
          quantity
        );
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  /**
   * Récuperer les produit du panier
   **/

  function lecturePanier() {
    // Récupration du localStorage (panier)
    let basket = JSON.parse(localStorage.getItem("kanapBasket"));
  
    // pour ne pas récupérer plusieurs fois l'id de l'article séléctionner plusieurs fois
    let idBasket = [];
    for (let article of basket) {
      if (!idBasket.includes(article.id)) {
        idBasket.push(article);
      }
    }

    //Le tableau contient les id en seul exemplaire de chaque produits
    for (let article of idBasket) {
      var url = "http://localhost:3000/api/products/" + article.id;
      ajax(url, article.quantity, article.colors);
    }
  }
  lecturePanier();