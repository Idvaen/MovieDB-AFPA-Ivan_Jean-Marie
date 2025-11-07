'use strict';

let rechercheInput = document.getElementById("searchInput");
rechercheInput.addEventListener("input", rechercherFilms);

//Search function
function rechercherFilms() {
    //Function de recherche des films avec API
    if (!rechercheInput.value) {
        console.log("Aucun terme de recherche.");
        document.getElementById("searchResults").innerHTML = '<div class="carousel-track"></div>';
        afficherFilmsData();
        return;
    }

    document.getElementById("searchResults").innerHTML = "";

    console.log("Recherche en cours...");
    const url = `https://api.themoviedb.org/3/search/movie?query=${rechercheInput.value}&include_adult=false&language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDRjYWFlODY4NTYzYzhhMzVlZTczNTA2MDgzZTZmNyIsIm5iZiI6MTc2MjMzMDE5MS41MTAwMDAyLCJzdWIiOiI2OTBiMDY0ZjE5NTdmMzAxMTQ3OGEzMzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bhvr384uOWfaw2EFgNgEYsJZ07oYs6QjBf01HoFvnJU'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            // Process the API response
            for (let i in data.results) {
                console.log("Film trouvé:", data.results[i].title);
                // Afficher les résultats de la recherche
                const resultsContainer = document.getElementById("searchResults");
                resultsContainer.innerHTML += `
                    <div class="col-6">
                        <div class="movie-info movie-description col-12 row">
                            <h2 class="titre_de_listes">${data.results[i].title}</h2>
                            <img class="img-fluid pourfloat size_poster movie-img" src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" alt="${data.results[i].title}" />
                            <p>${data.results[i].release_date}</p>
                        </div>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
        });
}