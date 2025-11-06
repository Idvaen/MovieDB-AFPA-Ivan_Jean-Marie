'use strict';

let rechercheInput = document.getElementById("searchInput");
rechercheInput.addEventListener("input", rechercherFilms);

//Search function
function rechercherFilms() {
    //Function de recherche des films avec API
    const url = `https://api.themoviedb.org/3/search/movie?query=${rechercheInput.value}&include_adult=true&language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDRjYWFlODY4NTYzYzhhMzVlZTczNTA2MDgzZTZmNyIsIm5iZiI6MTc2MjMzMDE5MS41MTAwMDAyLCJzdWIiOiI2OTBiMDY0ZjE5NTdmMzAxMTQ3OGEzMzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bhvr384uOWfaw2EFgNgEYsJZ07oYs6QjBf01HoFvnJU'
        }
    };

    const input = document.getElementById("searchInput").value.toLowerCase();
    const films = document.querySelectorAll(".movie-card");
    films.forEach(film => {
        const title = film.querySelector("h2").textContent.toLowerCase();
        if (title.includes(input)) {
            film.style.display = "block";
            // Call API pour chercher des films
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    // Process the API response
                    console.log("API Response:", data);
                    // Afficher les résultats de la recherche
                    afficherResultatsRecherche(data.results);

                })
                .catch(error => {
                    console.error("Error fetching movie details:", error);
                });
        } else {
            film.style.display = "none";
        }
    });
}

function afficherResultatsRecherche(films) {
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (films.length === 0) {
        resultsContainer.innerHTML = "<p>Aucun résultat trouvé.</p>";
        return;
    }

    films.forEach(film => {
        const filmElement = document.createElement("div");
        filmElement.classList.add("col-6");
        filmElement.innerHTML = `
        <div class="movie-info movie-description col-12 row">
            <h2 class="titre_de_listes">${film.title}</h2>
            <img class="img-fluid pourfloat size_poster movie-img" src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title}" />
            <p>${film.release_date}</p>
        </div>
        `;
        resultsContainer.appendChild(filmElement);
    });
}
