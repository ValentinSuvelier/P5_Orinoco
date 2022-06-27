function getProduitId()
// récupère l'id du produit en l'assignant
{
    let id = new URL(location.href).searchParams.get("id");
    return id;
}

function getArticles()
// crée une fonction permettant de récupérer les info de l'API, de les convertirs en format 'json' et d'afficher une alerte error si le fetch ne fonctionne pas
{
    produitId = getProduitId();
    console.log("ID : " + produitId);
    urlProduit = "http://localhost:3000/api/teddies/"+produitId;
    return fetch(urlProduit)
    .then(function(httpBodyResponse){
        return httpBodyResponse.json()
    })
    .catch(function(error){
        alert(error)
    })
}

function displayArticle(produit)   /* place les bonnes données de l'API aux endroits voulu */
{
    const template = document.getElementById("templateProduit");
    const clone = document.importNode(template.content, true);
    //récupère les éléments de l'API pour les caractéristique ciblées
    clone.getElementById("ours_title").textContent = produit.name;
    clone.getElementById("ours_price").textContent = produit.price / 100 + '.00€';
    clone.querySelector(".ours_picture").setAttribute("src", produit.imageUrl);
    clone.getElementById("ours_body").textContent = produit.description;
    clone.getElementById("ours_link").href += `?id=${produit._id}`;
    //intègre le clone en récupérant "main" dans la page ainsi que son élément enfant "clone"
    document.getElementById("main").appendChild(clone);

    //on manipule le DOM en incorporant de l'HTML à l'endroit voulu
    document.querySelector(".colorsAdd").innerHTML += `
    <select class="choosecolor" name="peluche" id="${produit._id}">
        <option value=""> -- Choisir un coloris -- </option>
    </select>`;

    // affiche les couleurs disponible de l'id du produit ciblé
    for(couleur of produit.colors)
    {
        document.getElementById(produit._id).innerHTML += `
        <option>${couleur}</option>`;
    }
}

function pushArticle(article){
    let oursStorage = {
        name: article.name,
        colors: article.colors,
        price: article.price / 100,
        description: article.description,
        id: article._id
    };
    console.log('vérif info API : ' + oursStorage.name + ' ' + oursStorage.price);

    let articleArray = [];

    document.querySelector(".add").addEventListener("click", function(){
        if(localStorage.getItem("panier")){
            //si un panier est déjà existant on le récupère en ajoutant notre oursStorage
            let array = JSON.parse(localStorage.getItem("panier"));
            array.push(oursStorage);
            localStorage.setItem("panier", JSON.stringify(array));
        }
        else{
            //sinon on envoi un tableau contenant notre oursStorage
            articleArray.push(oursStorage)
            localStorage.setItem("panier", JSON.stringify(articleArray));
        }
    })
}

async function main()
{
    const produit = await getArticles() // attend la résolution de la promesse
    displayArticle(produit);
    pushArticle(produit);

    // si le local storage ne contient pas de panier enregistré, le message d'alerte s'envoie et bloque l'accès a la page panier
     document.querySelector(".panier-link").addEventListener("click",(e)=>{
        if(!localStorage.getItem("panier")){
            e.preventDefault();
            alert("Vous n'avez aucun article dans le panier");
        }
    })
}
main()