
main()
//functions
function getArticles()
{
    return fetch("http://localhost:3000/api/teddies")
    .then(function(httpBodyResponse){
        return httpBodyResponse.json()
    })
    .then(function(articles){
        return articles
    })
    .catch(function(error){
        alert(error)
    })
}

function displayArticle(produit)
{
    //permet de placer du contenu sans passer par le fichier HTML
    document.getElementById("main").innerHTML += 
    `
    <a class="ours" href="produit.html">
        <div id="produit" class="bearcard">
            <h2 id="ours_title" class="ours_title">Model : ${produit.name}</h2>
            <p id="ours_price" class="ours_price">Prix : ${produit.price / 100}.00€</p>
                <img id="ours_picture" src="${produit.imageUrl}">
            <p id="ours_body" class="ours_body">${produit.description}</p>
            <select class="choosecolor" name="peluche" id="${produit._id}">
                <option value=""> -- Choisir un coloris -- </option>
            </select>
        </div>
    </a>
    `;
    for(couleur of produit.colors)
    {
        document.getElementById(produit._id).innerHTML += `
        <option>${couleur}</option>`
    }
    }


    async function main()
{
    const articles = await getArticles()

    for (produit of articles) 
    {
        displayArticle(produit)
    }
}
