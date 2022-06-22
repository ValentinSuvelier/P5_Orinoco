function displayArticle(displayStorage){
    const template = document.querySelector("template");
    const clone = document.importNode(template.content, true);
    clone.getElementById("produit_descript").textContent = displayStorage.name;
    clone.getElementById("price").textContent = displayStorage.price + '.00€';
    document.querySelector(".grid_panier").appendChild(clone);
}

//fonction de test des expressions régulière qui retourne un booléen
function checkRegex(regex, input){
    if(regex.test(input)){
        return true;
    }
    else{
        return false;
    }
}

// Fonction d'écoute du formulaire et méthode POST vers l'api
function listForm(){
    const letterFormat = /^[a-zA-ZéêèàëÉÈÊË\-]+$/;
    const adressFormat = /^[a-zA-ZéêèàëÉÈÊË0-9\s,.'-]{3,}$/;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
    let mail = document.querySelector(".email");
    let address = document.querySelector(".address");
    let city = document.querySelector(".ville");
    let firstname = document.querySelector(".prenom");
    let lastname = document.querySelector(".nom");
    let envoyerBtn = document.querySelector(".envoyer");

    envoyerBtn.addEventListener("click", function(e){
        e.preventDefault();
        if(checkRegex(letterFormat, firstname.value) 
            && checkRegex(letterFormat, lastname.value) 
            && checkRegex(adressFormat, address.value) 
            && checkRegex(adressFormat, city.value) 
            && checkRegex(mailFormat, mail.value)){
            //méthode POST
            let product = [];
            let storage = JSON.parse(localStorage.getItem("panier"));
            for(i of storage){
                product.push(i.id);
            }
            
            let order = {
                contact: {
                    firstName: firstname.value,
                    lastName: lastname.value,
                    address: address.value,
                    city: city.value,
                    email: mail.value,
                },
                products : product,
            }
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
            }

            // Envoie de la requête avec l'en-tête et envoie d'orderID vers la page de confirmation
            fetch("http://localhost:3000/api/teddies/order", options)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("orderID", data.orderId);
                window.location.href = "confirm.html";
            })
            .catch(error => console.error(error));
        }
        else{
            e.preventDefault();
            alert("Veuillez remplir correctement tous les champs svp");
        }
    });
}

function main()
{
    var contentArray = JSON.parse(localStorage.getItem("panier"));
    let total = 0;
    for(article of contentArray){
        console.log(article.name + ' ' + article.price + '€');
        total = total + article.price;
        displayArticle(article);
    }
    console.log('prix total ' + total + '€');
    listForm();
    document.getElementById("total_euro").textContent = 'Prix total de votre commande : ' + total + '.00€';

    //fonction de suppression de panier
    document.querySelector(".delete").addEventListener("click", function(){
        localStorage.clear();
        window.location.href = "index.html";
        alert("Suppression du panier effectuée avec succès ! Retour à l'accueil")
    });
}

main()