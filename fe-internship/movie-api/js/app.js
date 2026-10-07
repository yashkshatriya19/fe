import {
    searchMovies
} from "./api.js";


import {
    showLoading,
    hideLoading,
    showError,
    clearError,
    showNoResults,
    hideNoResults,
    displayMovies
} from "./ui.js";


const form =
    document.querySelector(
        "#search-form"
    );


const input =
    document.querySelector(
        "#search-input"
    );


const moviesContainer =
    document.querySelector(
        "#movies"
    );


const loading =
    document.querySelector(
        "#loading"
    );


const errorMessage =
    document.querySelector(
        "#error-message"
    );


const noResults =
    document.querySelector(
        "#no-results"
    );


const resultCount =
    document.querySelector(
        "#result-count"
    );


const sectionTitle =
    document.querySelector(
        "#section-title"
    );


/* =========================
   RANDOM MOVIES
========================= */

const randomSearches = [
    "Batman",
    "Avengers",
    "Spider",
    "Harry Potter",
    "Dune",
    "Matrix"
];


function getRandomMovieName() {

    const randomIndex =
        Math.floor(
            Math.random() *
            randomSearches.length
        );

    return randomSearches[randomIndex];

}


/* =========================
   LOAD MOVIES
========================= */

async function loadMovies(
    movieName,
    title
) {

    clearError(
        errorMessage
    );

    hideNoResults(
        noResults
    );

    showLoading(
        loading
    );


    try {

        const movies =
            await searchMovies(
                movieName
            );


        if (
            !movies ||
            movies.length === 0
        ) {

            showNoResults(
                noResults
            );

            return;
        }


        sectionTitle.textContent =
            title;


        displayMovies(
            movies,
            moviesContainer,
            resultCount
        );


    } catch (error) {

        showError(
            errorMessage,
            error.message
        );


        moviesContainer.innerHTML =
            "";


    } finally {

        hideLoading(
            loading
        );

    }

}


/* =========================
   SEARCH
========================= */

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const movieName =
            input.value.trim();


        if (movieName === "") {

            showError(
                errorMessage,
                "Please enter a movie name."
            );

            return;
        }


        await loadMovies(
            movieName,
            `Search results for "${movieName}"`
        );

    }
);


/* =========================
   INITIAL MOVIES
========================= */

const randomMovie =
    getRandomMovieName();


loadMovies(
    randomMovie,
    "Random Movies"
);