"use strict";

let URL = "/data.json";
// let affiche_table = document.getElementById("affiche_table");

// affiche_table.innerHTML = ""

fetch(URL)
  .then((response) => response.json())
  .then(function (data) {
    console.log("La requête GET a abouti avec la réponse JSON : ", data);
    for (let i in data.results) {
      console.log(data.results[i].title);
      console.log(data.results[i].release_date);
      console.log(data.results[i].poster_path);
      console.log(data.results[i].vote_average);
      let col = document.createElement("div");
      col.className = "col-6 col-md-4 col-lg-3";
      col.innerHTML = `
        <div class="movie-card">
          <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/${data.results[i].poster_path}" class="img-fluid" alt="${data.results[i].title}">
          <p class="release-date">${data.results[i].release_date}</p>
          <h5 class="mt-2">${data.results[i].title}</h5>
            <p class="rating">Avis: <i class="fa-regular fa-star"></i> ${data.results[i].vote_average} / 10</p>
        </div>
      `;
      document.querySelector(".movies-section .row").appendChild(col);
    }
  })
  .catch(function (error) {
    console.log("La requête GET a échoué : ", error);
  });
