"use strict";

// =========== DEFINTION DES CONSTANTES POUR LA CONNEXION A L'API ===========

const url = 'https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1'; // URL pour l'accès aux films populaires
const options = {            // options de connexion
    method: 'GET',           // on utilisera la methode GET
    headers: {               // entête et clé de l'API
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDRjYWFlODY4NTYzYzhhMzVlZTczNTA2MDgzZTZmNyIsIm5iZiI6MTc2MjMzMDE5MS41MTAwMDAyLCJzdWIiOiI2OTBiMDY0ZjE5NTdmMzAxMTQ3OGEzMzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bhvr384uOWfaw2EFgNgEYsJZ07oYs6QjBf01HoFvnJU'
    }
};

//   LECTURE DES FILMS POPULAIRES A PARTIR DES PARAMETRES URL
fetch(url, options)
    .then(res => res.json())
    .then(films => { // création du jeu de données dans films

        for (let i = 0; i < films.results.length; i++) { // Le jeu de données étant un tableau, on boucle pour lire et afficher la liste des films 
            let col = document.createElement("div");                 // situé dans la page populaire.html
            col.className = "col-12";           // code Html à insérer dans la page populaire
            col.innerHTML = `                                       
                <div class="movie-description" data-movie-id="${films.results[i].id}"><br> 
                <h2 class="titre_de_listes">${films.results[i].title}</h2>      
                    <img class="img-fluid pourfloat size_poster movie-img" src="https://media.themoviedb.org/t/p/w440_and_h660_face/${films.results[i].poster_path
                }" alt="${films.results[i].title}" data-movie-id="${films.results[i].id}"/>
                    <p class="affiche_et_acteur" style="background-color: white;"> <strong>Genres:</strong> <span class="genres-placeholder"></span> <br>
                    <strong>Synopsis:</strong> ${films.results[i].overview}
                    <br><strong>Date de sortie:</strong> ${new Date(
                    films.results[i].release_date
                ).toLocaleDateString("fr")}
                    <br><strong>Note:</strong> ${parseFloat(films.results[i].vote_average).toFixed(1)} / 10</p>
                </div><br>`;

            // Selection de la colonne
            document.querySelector(".description-section .row").appendChild(col);
            const img = col.querySelector(".movie-img");
            if (img) {
                img.addEventListener("click", function (e) {
                    // Prevent any default behaviour (if any)
                    e.preventDefault();
                    const movieId = this.dataset.movieId;
                    // Small delay to allow CSS feedback or prevent accidental double-clicks
                    setTimeout(() => {
                        window.location.href = `description_TP4.html?id=${movieId}`;
                    }, 500);

                    // setTimeout(() => {
                    //   window.location.href = `description.html`;
                    // }, 500);
                });
            }

            //Synchronisation des genres
            GetGenres(films.results[i].genre_ids).then(genres => {
                const genresPlaceholder = col.querySelector('.genres-placeholder');
                if (genresPlaceholder) {
                    genresPlaceholder.textContent = genres;
                }
            });
        }

    })
    .catch(function (error) {
        console.error("La requête GET a échoué : ", error);
    });


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