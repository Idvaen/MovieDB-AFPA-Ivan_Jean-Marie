"use strict";

// // Si nous sommes sur la page de description unique, exécutez automatiquement le rendu
if (window.location.href.indexOf("description.html") !== -1) {
  document.addEventListener("DOMContentLoaded", descriptionMovieTP1);
}

function descriptionMovieTP1() {

  let URL_TP1 = 'data/data.json';

  console.log("descriptionMovieTP1() called");
  // Lire l'ID du film à partir des paramètres URL_TP1
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  if (!movieId) {
    console.error("No movie id provided in URL_TP1");
    return;
  }

  // Fetch list (data.json) and find the movie by id
  fetch(URL_TP1)
    .then((response) => response.json())
    .then(function (data) {
      console.log("Fetched data for descriptionMovieTP1:", data);
      const movie = data.results.find((m) => String(m.id) === String(movieId));
      if (!movie) {
        console.error("Movie not found for id", movieId);
        return;
      }

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
      col.className = "col-12";
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
              <p class="synopsis"><strong>Synopsis:</strong> ${movie.overview}</p>
              <h2>${movie.title}</h2><br>
              <p><strong>Genres:</strong> <span class="genres-placeholder">Chargement...</span></p>
              <p><strong>Synopsis:</strong> ${movie.overview}</p>
              <p><strong>Date de sortie:</strong> ${new Date(
          movie.release_date
        ).toLocaleDateString("fr")}</p>
              <p><strong>Note:</strong>${parseFloat(movie.vote_average).toFixed(1)} / 10</p>
              </div>
              </div>
          </div>
        </div>
      `;
      container.appendChild(col);

      // Synchronisation des genres
      GetGenres(movie.genre_ids).then(genres => {
        const genresPlaceholder = col.querySelector('.genres-placeholder');
        if (genresPlaceholder) {
          genresPlaceholder.textContent = genres;
        }
      });
    })
    .catch(function (error) {
      console.error("La requête GET a échoué : ", error);
    });
}

/**
 * Récupère les noms des genres à partir des IDs de genres fournis.
 * @param {Array<number>} movieGenreIds 
 */
async function GetGenres(movieGenreIds) {
  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDRjYWFlODY4NTYzYzhhMzVlZTczNTA2MDgzZTZmNyIsIm5iZiI6MTc2MjMzMDE5MS41MTAwMDAyLCJzdWIiOiI2OTBiMDY0ZjE5NTdmMzAxMTQ3OGEzMzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bhvr384uOWfaw2EFgNgEYsJZ07oYs6QjBf01HoFvnJU'
    }
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    let genreNames = [];
    for (let i in data.genres) {
      for (let j in movieGenreIds) {
        if (movieGenreIds[j] === data.genres[i].id) {
          genreNames.push(data.genres[i].name);
        }
      }
    }
    return genreNames.join(", ");
  } catch (error) {
    console.error("Erreur lors de la récupération des genres :", error);
    return "Genre non disponible";
  }
}