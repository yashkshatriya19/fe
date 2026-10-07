const apiKey = "99bf3bf0";

const baseUrl =
    "https://www.omdbapi.com/";


export async function searchMovies(movieName) {

    const params = new URLSearchParams({
        apikey: apiKey,
        s: movieName
    });

    const url =
        `${baseUrl}?${params}`;


    const response =
        await fetch(url);


    if (!response.ok) {
        throw new Error(
            "Network request failed."
        );
    }


    const data =
        await response.json();


    if (data.Response === "False") {
        throw new Error(
            data.Error
        );
    }


    return data.Search;
}