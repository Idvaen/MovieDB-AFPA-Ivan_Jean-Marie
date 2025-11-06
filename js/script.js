"use strict";

let URL = "data/data.json";


// CREATION D'UNE FONCTION ALEATOIRE POUR L'AFFICHAGE DE L'IMAGE DE FOND DE LA PAGE D'ACCEUIL
// Appel de la fonction
creerArriereplan();

// fonction principale
function creerArriereplan() {
    let numero;
    let ajoutBkgrd = document.getElementById("imgBgrnd");
    numero = Math.floor(Math.random() * 3) + 1;
    ajoutBkgrd.setAttribute("style",`background-image: url(assets/images/background${numero}.png);`);
}