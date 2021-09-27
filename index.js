function getArticles()
/*crée une fonction permettant de récupérer les info de l'API, de les convertirs en format 'json' et d'afficher une
alerte error si le fetch ne fonctionne pas*/
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
    clone.getElementById("ours_price").textContent = Number(produit.price) / 100;
    clone.querySelector(".ours_picture").setAttribute("src", produit.imageUrl);
    clone.getElementById("ours_body").textContent = produit.description;
    clone.getElementById("ours_link").href += `?id=${produit._id}`;

    /*intègre le clone en récupérant "main" dans la page ainsi que son élément enfant "clone"*/
    document.getElementById("main").appendChild(clone);
}


   /* for(couleur of produit.colors)
    {
        document.getElementById(produit._id).innerHTML += `
        <option>${couleur}</option>`
    }
    }*/


    async function main()
{
    const articles = await getArticles()

    for (produit of articles) 
    {
        displayArticle(produit)
    }
}

main()