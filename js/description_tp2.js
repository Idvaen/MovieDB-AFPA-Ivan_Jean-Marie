"use strict";

let URL = "data/data.json";
// let affiche_table = document.getElementById("affiche_table");

// Fetch list (details.json) for movie Matrix
fetch("data/details.json")
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
          <a href="description.html"><img src="https://media.themoviedb.org/t/p/w440_and_h660_face/${
            data.poster_path
          }" class="img-fluid pourfloat" alt="${data.title}"></a>
          <p class="affiche_et_acteur"><strong>Genres:</strong> ${data.genres
            .map((genre) => genre.name)
            .join(", ")}<br>
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
fetch("data/credits.json")
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

        ${
          data.cast[i].profile_path === null
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


