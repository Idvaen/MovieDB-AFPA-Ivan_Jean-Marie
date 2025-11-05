"use strict";

let URL = "/data.json";
// let affiche_table = document.getElementById("affiche_table");

//Partie index pour tous les films
if (window.location.href.indexOf("index.html") !== -1) {
  fetch(URL)
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
          <p class="release-date">${new Date(
            data.results[i].release_date
          ).toLocaleDateString("fr")}</p>
          <h5 class="mt-2">${data.results[i].title}</h5>
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
            // const movieId = this.dataset.movieId;
            // Small delay to allow CSS feedback or prevent accidental double-clicks
            // setTimeout(() => {
            //   window.location.href = `description.html?id=${movieId}`;
            // }, 500);

            setTimeout(() => {
              window.location.href = `description.html`;
            }, 500);
          });
        }
      }
    })
    .catch(function (error) {
      console.log("La requête GET a échoué : ", error);
    });
}

//Partie description pour chaque film
if (window.location.href.indexOf("descriptions.html") !== -1) {
  fetch(URL)
    .then((response) => response.json())
    .then(function (data) {
      console.log("La requête GET a abouti avec la réponse JSON : ", data);
      for (let i in data.results) {
        // console.log(data.results[i].title);
        // console.log(data.results[i].release_date);
        // console.log(data.results[i].poster_path);
        // console.log(data.results[i].vote_average);
        // console.log(data.results[i].overview);
        console.log(data.results[i].genre_ids.join(", "));
        let col = document.createElement("div");
        col.className = "col-12";
        col.innerHTML = `
        <div class="movie-description">
          <h3>Description de ${data.results[i].title}</h3>
          <a href="description.html"><img src="https://media.themoviedb.org/t/p/w440_and_h660_face/${data.results[i].poster_path
          }" class="img-fluid pourfloat size_poster" alt="${data.results[i].title}"></a>
          <p class="affiche_et_acteur" style="background-color: white;"><strong>Genres:</strong> ${data.results[i].genre_ids.join(", ")}
          <br> <strong>Synopsis:</strong> ${data.results[i].overview}
          <br><strong>Date de sortie:</strong> ${new Date(
            data.results[i].release_date
          ).toLocaleDateString("fr")}
          <br><strong>Note:</strong> ${data.results[i].vote_average} / 10</p>
        </div>
      `;
        document.querySelector(".description-section .row").appendChild(col);
        // If you want these description items to open the single description page when clicked,
        // navigate with the movie id in the query string (same pattern as above).
        // col.addEventListener("click", function (e) {
        //   // Use dataset index if you add it; for now just prevent default and no-op
        //   e.preventDefault();
        // });
      }
    })
    .catch(function (error) {
      console.log("La requête GET a échoué : ", error);
    });
}

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

// Fetch list (details.json) for movie Matrix
fetch("/details.json")
  .then((response) => response.json())
  .then(function (data) {
    console.log("Details data fetched: ", data);
    // console.log(data[i]);
    // console.log(data.title);
    // console.log(data.release_date);
    // console.log(data.poster_path);
    // console.log(data.vote_average);
    // console.log(data.overview);
    // console.log(data.genres.map((genre) => genre.name).join(", "));
    let col = document.createElement("div");
    col.className = "col-12";
    col.innerHTML = `
        <div class="movie-description">
          <h1>Description de ${data.title}</h1>
          <a href="description.html"><img src="https://media.themoviedb.org/t/p/w440_and_h660_face/${data.poster_path
      }" class="img-fluid pourfloat" alt="${data.title}"></a>
          <p class="affiche_et_acteur"><strong>Genres:</strong> ${data.genres.map((genre) => genre.name).join(", ")}<br>
          <strong>Synopsis:</strong> ${data.overview}
          <br><strong>Date de sortie:</strong> ${new Date(
        data.release_date
      ).toLocaleDateString("fr")}
          <br><strong>Note:</strong> ${data.vote_average} / 10</p>
        </div>
      `;
    document.querySelector(".description-section-page .row").appendChild(col);
  })
  .catch(function (error) {
    console.error("La requête GET a échoué : ", error);
  });

// Fetch list (credits.json) for movie Matrix
fetch("/credits.json")
  .then((response) => response.json())
  .then(function (data) {
    console.log("Credits data fetched: ", data.cast);
    for (let i in data.cast) {
      // console.log(data.cast[i].profile_path);
      // console.log(data.cast[i].name);
      // console.log(data.cast[i].character);
      let col = document.createElement("div");
      col.className = "col-3 text-center";
      // "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
      col.innerHTML = `
        <div class="cast-member col-12 col-md-6 col-lg-4 card mx-auto">

        ${data.cast[i].profile_path === null
          ? `<img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg" class="vignette card-img-top img-fluid mb-2" alt="${data.cast[i].name}">`
          : `<img src="https://media.themoviedb.org/t/p/w138_and_h175_face/${data.cast[i].profile_path}" class="vignette img-fluid card-img-top mb-2" alt="${data.cast[i].name}">`
        }
          <h2>${data.cast[i].name}</h2>
          
          <p class="text-muted text-center">comme ${data.cast[i].character}</p>
        </div>`;
      // console.log(data.cast[i].character);
      document.querySelector(".cast-section .row").appendChild(col);
    }
  })
  .catch(function (error) {
    console.error("La requête GET a échoué : ", error);
  });

// If we are on the single description page, auto-run the renderer
if (window.location.href.indexOf("description.html") !== -1) {
  document.addEventListener("DOMContentLoaded", descriptionMovie);
}
