"use strict";

let URL = "/data.json";
// let affiche_table = document.getElementById("affiche_table");

function descriptionMovie() {
  console.log("descriptionMovie() called");
  // Read movie id from URL params
  // const urlParams = new URLSearchParams(window.location.search);
  // const movieId = urlParams.get("id");
  // if (!movieId) {
  //   console.error("No movie id provided in URL");
  //   return;
  // }

  // // Fetch list (data.json) and find the movie by id
  // fetch(URL)
  //   .then((response) => response.json())
  //   .then(function (data) {
  //     const movie = data.results.find((m) => String(m.id) === String(movieId));
  //     if (!movie) {
  //       console.error("Movie not found for id", movieId);
  //       return;
  //     }

  //     console.log("Rendering description for movie:", movie);

  //     // Prefer an element with id 'description-movie' if present, otherwise use .description-section .row
  //     let container = document.getElementById("description-movie");
  //     if (!container) {
  //       container = document.querySelector(".description-section .row");
  //     }
  //     if (!container) {
  //       console.error("No container found to render movie description");
  //       return;
  //     }

  //     // Clear and render
  //     container.innerHTML = "";
  //     const col = document.createElement("div");
  //     col.className = "col-12";
  //     col.innerHTML = `
  //       <div class="movie-description">
  //         <div class="row">
  //           <div class="col-md-4">
  //             <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/${
  //               movie.poster_path
  //             }" alt="${movie.title}" class="img-fluid" />
  //           </div>
  //           <div class="col-md-8">
  //             <h2>${movie.title}</h2>
  //             <p><strong>Synopsis:</strong> ${movie.overview}</p>
  //             <p><strong>Date de sortie:</strong> ${new Date(
  //               movie.release_date
  //             ).toLocaleDateString("fr")}</p>
  //             <p><strong>Note:</strong> ${movie.vote_average} / 10</p>
  //           </div>
  //         </div>
  //       </div>
  //     `;
  //     container.appendChild(col);
  //   })
  //   .catch(function (error) {
  //     console.error("La requête GET a échoué : ", error);
  //   });
}