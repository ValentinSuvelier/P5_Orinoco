async function main()
{
    var affichageProduit = JSON.parse(localStorage.getItem("panier"));
    let total = 0;
    for(article of affichageProduit){
        console.log(article.name + ' ' + article.price + '€');
        total = total + article.price;
    }
    console.log("ID de la commande : " + localStorage.getItem("orderID"));
    console.log('prix total ' + total + '€');

    document.querySelector('.commande_id').textContent = localStorage.getItem('orderID');
    document.querySelector('.total').textContent = total + '.00€';
    /* on vide le localStorage pour recommencer le processus d'achat par la suite */
    localStorage.clear();
}

main()