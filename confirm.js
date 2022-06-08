async function main()
{
    var affichageProduit = JSON.parse(localStorage.getItem("panier"));
    let total = 0;
    for(article of affichageProduit){
        console.log(article.price);
        total = total + article.price;
    }
    console.log('prix total ' + total);
    document.querySelector('.commande_id').textContent = localStorage.getItem('orderID');
    document.querySelector(".name").textContent = localStorage.getItem("panier");
    document.querySelector(".total").textContent = total + '.00€' + ' (+ 10.99€ de frais de port) soit ' + (total + 10.99 + '€');
}

main()