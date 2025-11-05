"use strict";
// CREATION D'UNE FONCTION ALEATOIRE POUR L'AFFICHAGE DE L'IMAGE DE FOND DE LA PAGE D'ACCEUIL


// Appel de la fonction
creerArriereplan();



// fonction principale
function creerArriereplan() {
    let numero;
    let ajoutBkgrd = document.getElementById("imgBgrnd");
    numero = Math.floor(Math.random() * 3) + 1;
    ajoutBkgrd.setAttribute("style",`background-image: url(/assets/images/background${numero}.png);`);

    // ajoutBkgrd.innerHTML = ` <section id="imgBgrnd" class="search-section" style="background-image: url(/assets/images/background${numero}.png);">
    //         <div class="container">
    //             <div class="search-container">
    //                 <div class="input-group">
    //                     <input type="text" class="form-control" placeholder="Chercher un film...">
    //                     <button class="recherche" type="button">
    //                         <img id="loupe" src="/assets/images/loupe.png" alt="">
    //                         <!-- <i class="fa-solid fa-magnifying-glass"></i> -->
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     </section>`;
}
