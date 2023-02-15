//_________________Modification de la balise title du navigateur cart --> Page Panier (plus compréhensible par l'utilisateur)_____________________
document . title  =  "Page Panier" ;

//______Déclaration de la variable "productRegisterInLocalStorage" dans laquelle on met les clés et les valeurs qui sont dans le local Storage______
//----------------JSON.parse c'est pour convertir les données au format JSON qui sont dans le localStorage en objet javascript---------- ----------
let  productRegisterInLocalStorage  =  JSON . parse ( localStorage . getItem ( "produit" ) ) ;
    //console.log(productRegisterInLocalStorage);
//--------------------Sélection de la balise de la page product.html dans laquel on va insérer les produits et leurs infos-------- -----------------
const  produitsPositionHtml  =  document . getElementById ( "cart__items" ) ;