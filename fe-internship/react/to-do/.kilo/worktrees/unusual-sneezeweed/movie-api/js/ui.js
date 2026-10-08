export function showLoading(element) {

    element.style.display = "block";

}


export function hideLoading(element) {

    element.style.display = "none";

}


export function showError(
    element,
    message
) {

    element.textContent = message;

}


export function clearError(element) {

    element.textContent = "";

}


export function showNoResults(element) {

    element.style.display = "block";

}


export function hideNoResults(element) {

    element.style.display = "none";

}


export function displayMovies(
    movies,
    container,
    resultCount
) {

    container.innerHTML = "";


    resultCount.textContent =
        `${movies.length} results`;


    movies.forEach(movie => {

        const card =
            document.createElement("article");

        card.classList.add(
            "movie-card"
        );


        const image =
            document.createElement("img");

        image.src = movie.Poster;

        image.alt = movie.Title;


        const info =
            document.createElement("div");

        info.classList.add(
            "movie-info"
        );


        const title =
            document.createElement("h3");

        title.textContent =
            movie.Title;


        const year =
            document.createElement("p");

        year.textContent =
            `Year: ${movie.Year}`;


        const type =
            document.createElement("p");

        type.textContent =
            movie.Type;


        info.append(
            title,
            year,
            type
        );


        card.append(
            image,
            info
        );


        container.append(card);

    });

}