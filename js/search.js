'use strict';
//Function de recherche des films avec API

// Récupération de l'élément de recherche
let rechercheInput = document.getElementById("searchInput");
rechercheInput.addEventListener("input", rechercherFilms);

//Recherche des films
function rechercherFilms() {
    if (window.location.href.indexOf("index.html") !== -1) {
        if (!rechercheInput.value) {
            console.log("Aucun terme de recherche.");
            document.getElementById("searchResults").innerHTML = '<div class="carousel-track"></div>';
            afficherFilmsData();
            return;
        }
    }
    if (document.getElementById("searchResultsNew")) {
        document.getElementById("searchResultsNew").innerHTML = "";
    }

    if (document.getElementById("searchResults")) {
        document.getElementById("searchResults").innerHTML = "";
    }

    // API de recherche de films
    console.log("Recherche en cours...");
    const url = `https://api.themoviedb.org/3/search/movie?query=${rechercheInput.value}&include_adult=false&language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDRjYWFlODY4NTYzYzhhMzVlZTczNTA2MDgzZTZmNyIsIm5iZiI6MTc2MjMzMDE5MS41MTAwMDAyLCJzdWIiOiI2OTBiMDY0ZjE5NTdmMzAxMTQ3OGEzMzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bhvr384uOWfaw2EFgNgEYsJZ07oYs6QjBf01HoFvnJU'
        }
    };

    // Exécution de la requête
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            // Traitement de la réponse de l'API
            for (let i in data.results) {
                // console.log("Film trouvé:", data.results[i].title);
                // Afficher les résultats de la recherche
                if (window.location.href.indexOf("index.html") !== -1) {
                    // Affichage des résultats sur la page d'accueil
                    const resultsContainer = document.getElementById("searchResults");
                    resultsContainer.innerHTML += `
                    <div class="col-6">
                        <div class="movie-info movie-description col-12 row" data-movie-id="${data.results[i].id}">
                            <h2 class="titre_de_listes">${data.results[i].title}</h2>
                            <img class="img-fluid pourfloat size_poster movie-img" 
                            src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" 
                            alt="${data.results[i].title}" data-movie-id="${data.results[i].id}"/>
                            <p>${data.results[i].release_date}</p>
                        </div>
                `;

                    // Ajout de l'événement click sur l'image
                    const img = resultsContainer.querySelector(".movie-img");
                    if (img) {
                        img.addEventListener("click", function (e) {
                            // Empêcher tout comportement par défaut (le cas échéant)
                            e.preventDefault();
                            const movieId = this.dataset.movieId;
                            // Rediriger vers la page de description après un délai
                            setTimeout(() => {
                                window.location.href = `description_TP4.html?id=${movieId}`;
                            }, 500);
                        });
                    }
                }

                // Page de recherche
                if (window.location.href.indexOf("search.html") !== -1) {
                    console.log("Recherche sur la page de recherche");
                    const col = document.createElement("div");
                    col.classList.add("col-4");
                    col.innerHTML += `
                    <div class="col-6">
                            <div class="movie-info movie-description col-12 row" data-movie-id="${data.results[i].id}">
                                <h2 style="font-size: 1.5rem;">${data.results[i].title} <span>(${data.results[i].release_date.slice(0, 4)})</span></h2>
                                <img class="img-fluid size_poster movie-img" 
                                src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" 
                                alt="${data.results[i].title}" data-movie-id="${data.results[i].id}"/>
                                <p><strong>Genres:</strong> <span class="genres-placeholder"></span></p>
                            </div>
                        </div>
                    `;

                    // Ajout de la colonne aux résultats de recherche
                    document.querySelector("#searchResultsNew").appendChild(col);

                    // Récupération des genres
                    GetGenres(data.results[i].genre_ids).then(genres => {
                        const genresPlaceholder = col.querySelector('.genres-placeholder');
                        if (genresPlaceholder) {
                            genresPlaceholder.textContent = genres;
                        }
                    });

                    // Ajout de l'événement click sur l'image
                    const img_new = col.querySelector(".movie-img");
                    if (img_new) {
                        img_new.addEventListener("click", function (e) {
                            e.preventDefault();
                            const movieId = this.dataset.movieId;
                            setTimeout(() => {
                                window.location.href = `description_TP4.html?id=${movieId}`;
                            }, 500);
                        });
                    }
                }
            }
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
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