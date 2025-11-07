"use strict";

//Partie description pour chaque film
if (window.location.href.indexOf("descriptions.html") !== -1) {
  fetch("data/data.json")
    .then((response) => response.json())
    .then(function (data) {
      console.log("La requête GET a abouti avec la réponse JSON : ", data);
      for (let i in data.results) {
        // console.log(data.results[i].title);
        // console.log(data.results[i].release_date);
        // console.log(data.results[i].poster_path);
        // console.log(data.results[i].vote_average);
        // console.log(data.results[i].overview);
        let col = document.createElement("div");
        col.className = "col-12";
        col.innerHTML = `
        <div class="movie-description" data-movie-id="${data.results[i].id}"><br>
          <h2 class="titre_de_listes">Description de ${data.results[i].title}</h2>
          <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/${data.results[i].poster_path
          }" class="img-fluid pourfloat size_poster movie-img" alt="${data.results[i].title}" data-movie-id="${data.results[i].id}">
          <p class="affiche_et_acteur" style="background-color: white;"><strong>Genres:</strong> ${data.results[i].genre_ids.join(", ")}
          <br> <strong>Synopsis:</strong> ${data.results[i].overview}
          <br><strong>Date de sortie:</strong> ${new Date(
            data.results[i].release_date
          ).toLocaleDateString("fr")}
          <br><strong>Note:</strong> ${parseFloat(data.results[i].vote_average).toFixed(1)} / 10</p>
        </div>
        `;
        document.querySelector(".description-section .row").appendChild(col);
        // If you want these description items to open the single description page when clicked,
        // navigate with the movie id in the query string (same pattern as above).
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
