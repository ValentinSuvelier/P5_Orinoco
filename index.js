function getArticles()
/*crée une fonction permettant de récupérer les info de l'API,
puis converti le body de la réponse http en format 'json' */
{
    return fetch("http://localhost:3000/api/teddies")
    .then(function(httpBodyResponse){
        return httpBodyResponse.json()
    })
    .catch(function(error){
        alert(error)
    })
}

function displayArticle(produit)
{
    const template = document.getElementById("templateProduit");
    const clone = document.importNode(template.content, true);
    /*récupère les éléments de l'API pour les caractéristique ciblées*/
    clone.getElementById("ours_title").textContent = produit.name;
    clone.getElementById("ours_price").textContent = Number(produit.price) / 100 + '.00€';
    clone.querySelector(".ours_picture").setAttribute("src", produit.imageUrl);
    clone.getElementById("ours_body").textContent = produit.description;
    clone.getElementById("ours_link").href += `?id=${produit._id}`;
    /*intègre le clone en récupérant "main" dans la page ainsi que son élément enfant "clone"*/
    document.getElementById("main").appendChild(clone);
    
    console.log("retour API OK" + " " + produit.name)
}

async function main()
{
    const articles = await getArticles()
    // boucle affichant chaque produits de l'API
    for (produit of articles) 
    {
        displayArticle(produit)
    }

    // si le local storage ne contient pas de panier enregistré, le message d'alerte s'envoie et bloque la page panier
    document.querySelector(".panier-link").addEventListener("click",(e)=>{
        if(!localStorage.getItem("panier")){
            e.preventDefault();
            alert("Vous n'avez aucun article dans le panier");
        }
    })
}

main()