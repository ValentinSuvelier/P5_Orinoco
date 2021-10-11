//Math.floor arrondie au nombre entier et Math.random prend un nombre entre 0.1 et 0.9
let nombreAleatoire = Math.floor(Math.random() * 999999999);
console.log('ID aléatoire : ' + nombreAleatoire)


async function main()
{
    var affichageProduit = JSON.parse(localStorage.getItem("panier"));
    let total = 0;
    for(article of affichageProduit){
        console.log(article.price);
        total = total + article.price;
    }
    console.log('prix total ' + total);
    document.querySelector(".total").textContent = total + '.00€' + ' (+ 10.99€ de frais de port) soit ' + (total + 10.99 + '€');
    document.querySelector(".commande_id").textContent = nombreAleatoire;
}

main()