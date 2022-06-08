function displayArticle(displayStorage){
    const template = document.querySelector("template");
    const clone = document.importNode(template.content, true);
    clone.getElementById("produit_descript").textContent = displayStorage.name;
    clone.getElementById("price").textContent = displayStorage.price + '.00€';
    document.querySelector(".grid_panier").appendChild(clone);
}

function checkRegex(regex, input){
    if(regex.test(input)){
        return true;
    }
    else{
        return false;
    }
}

function listForm(){
    let envoyerBtn = document.querySelector(".envoyer");
    const codePostalFormat = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/;
    const letterFormat = /^[a-zA-ZéêèàëÉÈÊË\-]+$/;
    const adressFormat = /^[a-zA-ZéêèàëÉÈÊË0-9\s,.'-]{3,}$/;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
    let mail = document.querySelector(".email");
    let address = document.querySelector(".address");
    let city = document.querySelector(".ville");
    let firstname = document.querySelector(".prenom");
    let lastname = document.querySelector(".nom");

    envoyerBtn.addEventListener("click", function(e){
        e.preventDefault();
        if(checkRegex(letterFormat, firstname.value) 
        && checkRegex(letterFormat, lastname.value) 
        && checkRegex(adressFormat, address.value) 
        && checkRegex(adressFormat, city.value) 
        && checkRegex(mailFormat, mail.value)){
            console.log("ok");

            //méthode POST
            let product = [];
            let storage = JSON.parse(localStorage.getItem("panier"));
            console.log(storage);
            for(i of storage){
                product.push(i.id);
            }
            console.log(product + "produit");
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
            console.log(order);
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
            }
            fetch("http://localhost:3000/api/teddies/order", options)
            .then(response => response.json())
            .then(data => {
                //localStorage.clear();
                localStorage.setItem("orderID", data.orderId);
                window.location.href = "confirm.html";
               console.log(data);
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
        console.log(article.price);
        total = total + article.price;
        displayArticle(article);
    }
    listForm();
    document.getElementById("total_euro").textContent = 'Prix total de votre commande : ' + total + '.00€' + ' (+ 10.99€ de frais de port) soit ' + (total + 10.99 + '€');
}

main()