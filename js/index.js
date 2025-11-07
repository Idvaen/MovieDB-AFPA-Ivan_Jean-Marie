"use strict";

// CREATION D'UNE FONCTION ALEATOIRE POUR L'AFFICHAGE DE L'IMAGE DE FOND DE LA PAGE D'ACCEUIL
// Appel de la fonction
creerArriereplan();
afficherFilmsData();

//Partie index pour tous les films
function afficherFilmsData() {
  if (window.location.href.indexOf("index.html") !== -1) {
    fetch("data/data.json")
      .then((response) => response.json())
      .then(function (data) {
        console.log("La requête GET a abouti avec la réponse JSON : ", data);
        for (let i in data.results) {
          // console.log(data.results[i].title);
          // console.log(data.results[i].release_date);
          // console.log(data.results[i].poster_path);
          // console.log(data.results[i].vote_average);
          let col = document.createElement("div");
          col.className = "col-6 col-md-4 col-lg-3";
          col.innerHTML = `
        <div class="movie-card" data-movie-id="${data.results[i].id}">
          <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/${data.results[i].poster_path
            }" class="img-fluid movie-img" alt="${data.results[i].title
            }" data-movie-id="${data.results[i].id}">
        <h2 class="mt-2">${data.results[i].title}</h2>
          <p class="release-date">${new Date(
              data.results[i].release_date
            ).toLocaleDateString("fr")}</p>
            <p class="rating">Avis: <i class="fa-regular fa-star"></i> ${data.results[i].vote_average
            } / 10</p>
        </div>
      `;
          document.querySelector(".movies-section .row").appendChild(col);
          // Add click listener to the image/card to navigate to the description page with the movie id
          const img = col.querySelector(".movie-img");
          if (img) {
            img.addEventListener("click", function (e) {
              // Prevent any default behaviour (if any)
              e.preventDefault();
              const movieId = this.dataset.movieId;
              // Small delay to allow CSS feedback or prevent accidental double-clicks
              setTimeout(() => {
                window.location.href = `description.html?id=${movieId}`;
              }, 500);

              // setTimeout(() => {
              //   window.location.href = `description.html`;
              // }, 500);
            });
          }
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