// Récupèrer l'id transmis dans le liens pour effectuer une requête avec celui ci en paramètre
var actualUrl = document.location.href;
actualUrl = new URL(actualUrl);
var id = actualUrl.searchParams.get("id");