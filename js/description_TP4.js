"use strict";

// // If we are on the single description page, auto-run the renderer
if (window.location.href.indexOf("description_TP4.html") !== -1) {
  document.addEventListener("DOMContentLoaded", descriptionMovieTP4);
}

function descriptionMovieTP4() {
  console.log("descriptionMovieTP4() called");
  // Read movie id from URL_TP1 params
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  if (!movieId) {
    console.error("No movie id provided in URL_TP1");
    return;
  }

  const URL = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const URL_CREDITS = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDRjYWFlODY4NTYzYzhhMzVlZTczNTA2MDgzZTZmNyIsIm5iZiI6MTc2MjMzMDE5MS41MTAwMDAyLCJzdWIiOiI2OTBiMDY0ZjE5NTdmMzAxMTQ3OGEzMzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bhvr384uOWfaw2EFgNgEYsJZ07oYs6QjBf01HoFvnJU'
    }
  };

  // Fetch list (data.json) and find the movie by id
  fetch(URL, options)
    .then((response) => response.json())
    .then(function (data) {
      console.log("Fetched data for descriptionMovieTP4:", data);
      let movie = data.id == String(movieId);
      if (!movie) {
        console.error("Movie not found for id", movieId);
        return;
      }
      movie = data;

      console.log("Rendering description for movie:", movie);

      // Prefer an element with id 'description-movie' if present, otherwise use .description-section .row
      let container = document.getElementById("description-movie");
      if (!container) {
        container = document.querySelector(".description-section .row");
      }
      if (!container) {
        console.error("No container found to render movie description");
        return;
      }

      // Clear and render
      //   container.innerHTML = "";
      const col = document.createElement("div");
      document.getElementById("backdrop_path").setAttribute("style", `background-image: url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path});`);
      col.className = "col-12 backdrop_img";
      col.innerHTML = `
        <div class="movie-description">
          <div class="row">
            <div class="col-md-4">
              <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path
        }" alt="${movie.title}" class="img-fluid" />
            </div>
            <div class="col-md-8">
              <h2 class="titre_de_listes">${movie.title}</h2>
              <div class="fd_paragraphe">
              <p class="synopsis"><strong>Genres:</strong> ${movie.genres.map(genre => genre.name).join(", ")}</p>
              <p class="synopsis"><strong>Synopsis:</strong> ${movie.overview}</p>
              <p class="synopsis"><strong>Date de sortie:</strong> ${new Date(
          movie.release_date
        ).toLocaleDateString("fr")}</p>
              <p class="synopsis"><strong>Note:</strong> ${movie.vote_average} / 10</p>
              </div>
              </div>
          </div>
        </div>
      `;
      container.appendChild(col);
    })
    .catch(function (error) {
      console.error("La requête GET a échoué : ", error);
    });

  // Fetch list for movie credits
  fetch(URL_CREDITS, options)
    .then((response) => response.json())
    .then(function (data) {
      console.log("Credits data fetched: ", data.cast);
      for (let i in data.cast) {
        let col = document.createElement("div");
        col.className = "text-center";
        // "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
        col.innerHTML = `
        <div class="cast-member">

        ${data.cast[i].profile_path === null
            ? `<img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg" class="vignette" alt="${data.cast[i].name}">`
            : `<img src="https://media.themoviedb.org/t/p/w138_and_h175_face/${data.cast[i].profile_path}" class="vignette" alt="${data.cast[i].name}">`
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
}


