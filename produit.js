function getProduitId()
{
    let id = new URL(location.href).searchParams.get("id");
    return id;
}
function getArticles()
/*crée une fonction permettant de récupérer les info de l'API, de les convertirs en format 'json' et d'afficher une
alerte error si le fetch ne fonctionne pas*/
{
    produitId = getProduitId();
    urlProduit = "http://localhost:3000/api/teddies/"+produitId;
    return fetch(urlProduit)
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
    //récupère les éléments de l'API pour les caractéristique ciblées
    clone.getElementById("ours_title").textContent = produit.name;
    clone.getElementById("ours_price").textContent = produit.price / 100 + ".00€";
    clone.querySelector(".ours_picture").setAttribute("src", produit.imageUrl);
    clone.getElementById("ours_body").textContent = produit.description;
    clone.getElementById("ours_link").href += `?id=${produit._id}`;
    //intègre le clone en récupérant "main" dans la page ainsi que son élément enfant "clone"
    document.getElementById("main").appendChild(clone);

    document.querySelector(".colorsAdd").innerHTML += `
    <select class="choosecolor" name="peluche" id="${produit._id}">
        <option value=""> -- Choisir un coloris -- </option>
    </select>`;

    for(couleur of produit.colors)
    {
        document.getElementById(produit._id).innerHTML += `
        <option>${couleur}</option>`;
    }
}

function postProduct(article){
    let oursStorage = {
        name: article.name,
        price: article.price / 100 + ".00€",
        description: article.description
      };
      localStorage.setItem('monOurs', JSON.stringify(oursStorage));
      //localStorage.setItem(article._id, JSON.stringify(oursStorage));
      btn.addEventListener("click", teddy);
}


    async function main()
{
        const produit = await getArticles()
        displayArticle(produit);
        let teddy = postProduct(produit);
        
        const btn = document.querySelector(".add");
}

main()
