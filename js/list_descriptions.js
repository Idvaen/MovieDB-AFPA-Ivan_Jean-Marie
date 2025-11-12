"use strict";

//Partie description pour chaque film
if (window.location.href.indexOf("liste_descriptions.html") !== -1) {
  fetch("data/data.json")
    .then((response) => response.json())
    .then(function (data) {
      console.log("La requête GET a abouti avec la réponse JSON : ", data);
      for (let i in data.results) {
        let col = document.createElement("div");
        col.className = "col-12";
        // Create initial HTML without genres
        col.innerHTML = `
        <div class="movie-description" data-movie-id="${data.results[i].id}"><br>
          <h2 class="titre_de_listes">Description de ${data.results[i].title}</h2>
          <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/${data.results[i].poster_path
          }" class="img-fluid pourfloat size_poster movie-img clickable" alt="${data.results[i].title}" data-movie-id="${data.results[i].id}">
          <p class="affiche_et_acteur" style="background-color: white;"><strong>Genres:</strong> <span class="genres-placeholder">Chargement...</span>
          <br> <strong>Synopsis:</strong> ${data.results[i].overview}
          <br><strong>Date de sortie:</strong> ${new Date(
            data.results[i].release_date
          ).toLocaleDateString("fr")}
          <br><strong>Note:</strong> ${parseFloat(data.results[i].vote_average).toFixed(1)} / 10</p>
        </div>
        `;
  
        //Synchronisation 
        GetGenres(data.results[i].genre_ids).then(genres => {
          const genresPlaceholder = col.querySelector('.genres-placeholder');
          if (genresPlaceholder) {
            genresPlaceholder.textContent = genres;
          }
        });

        document.querySelector(".description-section .row").appendChild(col);
        // Ajout d'un écouteur d'événements pour l'image
        const img = col.querySelector(".movie-img");
        if (img) {
          img.addEventListener("click", function (e) {
            // Evite tout comportement par défaut (le cas échéant)
            e.preventDefault();
            // Récupère l'ID du film à partir de l'attribut de données
            const movieId = this.dataset.movieId;
            // Petite pause pour permettre un retour visuel CSS ou éviter les doubles clics accidentels
            setTimeout(() => {
              window.location.href = `description.html?id=${movieId}`;
            }, 500);

            //Pour TP-2 MATRIX
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
    // Exécution de la requête
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des genres");
    }
    // Traitement de la réponse de l'API
    const data = await response.json();
    // Vérification de la présence des genres
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
