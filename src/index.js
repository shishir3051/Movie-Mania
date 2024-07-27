import { getMovieReviewData } from "./data.js";

let sortDesc = false;
function init() {
    const movieReviewData = getMovieReviewData();

    registerHandlers(movieReviewData);

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

    const sorted = flatReviewData.toSorted((a, b) => b.on - a.on);
    const movieListEL = document.querySelector("#movieListId UL");
    movieListEL.classList.add("reviews");

    addMovieReviewData(movieListEL, sorted);
}

function registerHandlers(movieReviewData) {
    const sortBtn = document.getElementById("srtBtnId");
    const grpBtn = document.getElementById("grpBtnId");

    sortBtn.addEventListener("click", () => sortByReview(movieReviewData));
    grpBtn.addEventListener("click", () => groupReviewByTitle(movieReviewData));
}

function sortByReview(movieReviewData) {
    sortDesc = !sortDesc;
    const flatReviewData = movieReviewData.flat();
    const movieListEL = document.querySelector("#movieListId UL");

    let sortReviewData = sortDesc
        ? flatReviewData.toSorted((a, b) => b.rating - a.rating)
        : flatReviewData.toSorted((a, b) => a.rating - b.rating);

    removeAllChildNodes(movieListEL);
    addMovieReviewData(movieListEL, sortReviewData);
}
function groupReviewByTitle(movieReviewData) {
    const flatReviewData = movieReviewData.flat();
    const groupedReviews = Object.groupBy(flatReviewData, ({ title }) => title);

    const titleKeys = Reflect.ownKeys(groupedReviews);

    const movieListEL = document.querySelector("#movieListId UL");
    removeAllChildNodes(movieListEL);

    titleKeys.forEach((title) => {
        const liEL = document.createElement("li");
        liEL.classList.add("reviews-card");

        const hEl = document.createElement("h2");
        hEl.style.fontSize = "23px"; // Set font size directly
        hEl.innerText = title;
        liEL.appendChild(hEl);

        const reviews = groupedReviews[title];

        reviews.forEach((review) => {
            const checkMark = "\u2713"; // Unicode for the check mark
            
            const pEl = document.createElement("p");
            pEl.style.margin = "10px 18px";
            pEl.style.fontSize = "17px";
            
            const checkMarkSpan = document.createElement("span");
            checkMarkSpan.innerText = `${checkMark} `; // Note the space after the check mark

            const spanEl = document.createElement("span");
            spanEl.style.fontWeight = "700";
            spanEl.innerText = review.by; // Set the inner text

            const spnRtEl = document.createElement("span");
            spnRtEl.style.fontWeight = "700";
            spnRtEl.innerText = review.rating; // Set the inner text

            const itEl = document.createElement("i");
            itEl.style.fontStyle = "italic";
            itEl.innerText = review.content; // Set the inner text

            pEl.appendChild(checkMarkSpan);
            pEl.appendChild(spanEl);
            pEl.appendChild(document.createTextNode(" has given "));
            pEl.appendChild(spnRtEl);
            pEl.appendChild(
                document.createTextNode(" rating with a comment, ")
            );
            pEl.appendChild(itEl);

            liEL.appendChild(pEl);

            /*const message1 = `<strong>${review.by}</strong> has given 
            <strong>${review.rating}</strong>ratting with a comment, 
            <i>${review.content}</i>`;

            pEl.appendChild(message1);*/
        });

        movieListEL.appendChild(liEL);
    });
}
function addMovieReviewData(movieListEL, movieReview) {
    movieReview.map((movie) => {
        const liElem = document.createElement("li");
        liElem.classList.add("reviews-card");

        const titleElem = document.createElement("p");
        titleElem.innerText = movie.title;
        titleElem.style.fontSize = "20px"; // Set font size directly
        titleElem.style.marginBottom = "10px"; // Set margin bottom directly
        titleElem.style.fontWeight = "700"; // Set font weight directly
        titleElem.innerText = `${movie.title} - ${movie.rating}`;
        liElem.appendChild(titleElem);

        const reviewElem = document.createElement("p");
        reviewElem.innerText = movie.content;
        // reviewElem.style.fontSize = "19px"; // Set font size directly
        reviewElem.style.margin = "7px 30px"; // Set margin bottom directly
        reviewElem.style.fontWeight = "500"; // Set font weight directly
        reviewElem.innerText = movie.content;
        liElem.appendChild(reviewElem);

        const byElem = document.createElement("p");
        byElem.innerText = movie.by;
        byElem.style.fontSize = "17px"; // Set font size directly
        byElem.style.margin = "7px 30px"; // Set margin bottom directly
        byElem.style.fontWeight = "600"; // Set font weight directly
        byElem.innerText = `By ${movie.by} on ${new Intl.DateTimeFormat(
            "EN-BD"
        ).format(movie.on)}`;
        liElem.appendChild(byElem);

        movieListEL.appendChild(liElem);
    });
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
init();
