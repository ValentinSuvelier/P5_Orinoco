function displayArticle(displayStorage){
    document.getElementById("produit_descript").textContent = displayStorage.name;
    document.getElementById("price").textContent = displayStorage.price;
    document.getElementById("total_euro").textContent = displayStorage.price;
}

async function main()
{
    let getOursStorage = localStorage.getItem('monOurs');
    let ours = JSON.parse(getOursStorage);
    displayArticle(ours);

    console.log(getOursStorage + "bonjour")
}

main()