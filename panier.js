function displayArticle(displayStorage){
    const template = document.querySelector("template");
    const clone = document.importNode(template.content, true);
    clone.getElementById("produit_descript").textContent = displayStorage.name;
    clone.getElementById("price").textContent = displayStorage.price;
    //clone.getElementById("total_euro").textContent = displayStorage.price;
    document.querySelector(".grid_panier").appendChild(clone);
}

function main()
{
    var contentArray = JSON.parse(localStorage.getItem("panier"));
    let total = 0;
    for(article of contentArray){
        console.log(article.price);
        total = total + article.price;
        displayArticle(article);
    }
    console.log('prix total' + total);
}

main()

/*let getOursStorage = localStorage.getItem("panier");
    console.log(getOursStorage + 'connard');
    let ours = JSON.parse(getOursStorage);

    for(article of getOursStorage){
        displayArticle(article);
        }*/