import { getMovieReviewData } from "./data.js";

function init() {
    const movieReviewData = getMovieReviewData();

    paintStatistics(movieReviewData);
    paintMovieData(movieReviewData);
}

function paintStatistics(movieReviewData) {
    const flatReviewData = movieReviewData.flat();

    const totalMovies = movieReviewData.length;
    


    const totalReviews = flatReviewData.length;

    const totalRating = flatReviewData.reduce((acc, item) => {
        return acc + item.rating;
    }, 0);
    const avgRating = (totalRating / totalReviews).toFixed(2);

    const totalMoviesElement = document.getElementById("tMoviesId");
    addStat(totalMoviesElement, totalMovies);

    const avgRatingElement = document.getElementById("tAvgRatingId");
    addStat(avgRatingElement, avgRating);

    const totalReviewsElement = document.getElementById("tReviewsId");
    addStat(totalReviewsElement, totalReviews);
}

function addStat(elem, value) {
    const spanEL = document.createElement("span");
    spanEL.innerHTML = value;
    elem.appendChild(spanEL);
}

function paintMovieData(movieReviewData) {
    const flatReviewData = movieReviewData.flat();
    const movieListEL = document.querySelector("#movieListId UL");
    movieListEL.classList.add("reviews");

    flatReviewData.map((movie) => {
        const liElem = document.createElement("li");
        liElem.classList.add("reviews-card");

        const titleElem = document.createElement("p");
        titleElem.innerText = movie.title;
        titleElem.style.fontSize = "23px"; // Set font size directly
        titleElem.style.marginBottom = "10px"; // Set margin bottom directly
        titleElem.style.fontWeight = "700"; // Set font weight directly
        titleElem.innerText = `${movie.title} - ${movie.rating}`;
        liElem.appendChild(titleElem);

        const reviewElem = document.createElement("p");
        reviewElem.innerText = movie.content;
        reviewElem.style.fontSize = "19px"; // Set font size directly
        reviewElem.style.margin = "7px 30px"; // Set margin bottom directly
        reviewElem.style.fontWeight = "500"; // Set font weight directly
        reviewElem.innerText = movie.content;
        liElem.appendChild(reviewElem);

        const byElem = document.createElement("p");
        byElem.innerText = movie.by;
        byElem.style.fontSize = "16px"; // Set font size directly
        byElem.style.margin = "7px 30px"; // Set margin bottom directly
        byElem.style.fontWeight = "600"; // Set font weight directly
        byElem.innerText = `By ${movie.by} on ${new Intl.DateTimeFormat(
            "EN-BD"
        ).format(movie.on)}`;
        liElem.appendChild(byElem);

        movieListEL.appendChild(liElem);
    });
}
init();
