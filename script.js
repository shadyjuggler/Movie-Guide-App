const form = document.querySelector("form"),
      input = document.querySelector("input"),
      title = document.querySelector(".title"),
      score = document.querySelector(".score"),
      rated = document.querySelector(".rated"),
      img = document.querySelector(".content-general img"),
      release = document.querySelector(".release"),
      runtime = document.querySelector(".runtime"),
      genres = document.querySelectorAll(".genres-item"),
      plot = document.querySelector(".plot-content"),
      cast = document.querySelector(".cast-content"),
      loadingSvg = document.querySelector(".search-wrapper .icon");
      key = "36b9f0e7";

form.addEventListener("submit", e => {
    e.preventDefault();

    const movieName = input.value;

    loadingSvg.classList.remove("hide");

    getData(movieName, key)
        .then((movieInfo) => {

            setMovieOnPage(movieInfo)

            document.querySelector(".content-wrapper").classList.remove("hide");
            document.querySelector(".error").classList.add("hide");

        })
        .catch(() =>{

            document.querySelector(".content-wrapper").classList.add("hide");
            document.querySelector(".error").classList.remove("hide");

        })

    form.reset();
})


async function getData (movie, key) {
    
    const movieInfo = await fetch(`http://www.omdbapi.com/?t=${movie}&apikey=${key}`)
        .then(data => data.json());

    return movieInfo
}

function setMovieOnPage ({Title, Year, Rated, Actors, Genre, Plot, Poster, Runtime, imdbRating}) {

    loadingSvg.classList.add("hide");

    title.textContent = Title;
    score.textContent = imdbRating;
    rated.textContent = Rated;
    release.textContent = Year;
    runtime.textContent = Runtime;
    plot.textContent = Plot;
    cast.textContent = Actors;

    let arr = Genre.split(", ");
    createGenreWrappers (arr);

    img.src = `${Poster}`;
    img.style.width = "200px";

}

function createGenreWrappers (arr) {

    document.querySelector(".genres").innerHTML = "";

    arr.forEach((item, i) => {
        const genre = document.createElement("div");
        genre.classList.add("genres-item");
        genre.textContent = item;
        document.querySelector(".genres").append(genre)
    })
}


getData("world war z", key)
        .then((movieInfo) => {
            
            setMovieOnPage(movieInfo)
            
        });