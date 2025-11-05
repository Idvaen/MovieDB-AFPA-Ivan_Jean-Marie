"use strict";

let URL = "/data.json";
// let affiche_table = document.getElementById("affiche_table");

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
          <a href="description.html"><img src="https://media.themoviedb.org/t/p/w440_and_h660_face/${
            data.results[i].poster_path
          }" class="img-fluid pourfloat size_poster" alt="${
          data.results[i].title
        }"></a>
          <p class="affiche_et_acteur" style="background-color: white;"><strong>Genres:</strong> ${data.results[
            i
          ].genre_ids.join(", ")}
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
