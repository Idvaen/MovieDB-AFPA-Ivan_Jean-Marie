"use strict";

// CREATION D'UNE FONCTION ALEATOIRE POUR L'AFFICHAGE DE L'IMAGE DE FOND DE LA PAGE D'ACCEUIL
// Appel de la fonction
afficherFilmsData();

//Partie index pour tous les films
function afficherFilmsData() {
  creerArriereplan();
  if (window.location.href.indexOf("index.html") !== -1) {
    fetch("data/data.json")
      .then((response) => response.json())
      .then(function (data) {
        console.log("La requête GET a abouti avec la réponse JSON : ", data);
        for (let i in data.results) { // on boucle le la liste des films

          let col = document.createElement("div"); // création de la balise DIV qui va recevoir l'affiche du film
          // col.className=""
          col.innerHTML = `
          <div class="card_carousel" data-movie-id="${data.results[i].id}">      
          <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/${data.results[i].poster_path
            }" class="img movie-img" alt="${data.results[i].title
            }" data-movie-id="${data.results[i].id}" >
          </div>
      `; // fin de l'insertion du texte dans la DIV

          document.querySelector(".carousel-track").appendChild(col); // recherche de la class carousel-track
          // et insertion de la DIV dans la page.


          // Add click listener to the image/card to navigate to the description page with the movie id
          // const img = col.querySelector(".movie-img");
          // if (img) {
          //   img.addEventListener("click", function (e) {
          //     // Prevent any default behaviour (if any)
          //     e.preventDefault();
          //     const movieId = this.dataset.movieId;
          //     // Small delay to allow CSS feedback or prevent accidental double-clicks
          //     setTimeout(() => {
          //       window.location.href = `description.html?id=${movieId}`;
          //     }, 500);

          //     // setTimeout(() => {
          //     //   window.location.href = `description.html`;
          //     // }, 500);
          //   });
          // }
        }
      })
      .catch(function (error) {
        console.log("La requête GET a échoué : ", error);
      });
  }
}

  // fonction principale
  function creerArriereplan() {
    let numero;
    let ajoutBkgrd = document.getElementById("imgBgrnd");
    numero = Math.floor(Math.random() * 3) + 1;
    ajoutBkgrd.setAttribute("style", `background-image: url(assets/images/background${numero}.png);`);
  }