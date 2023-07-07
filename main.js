const URL_BASE = 'https://api.themoviedb.org/3'

const API_KEY = '?api_key=c5190f83a95bc72ce01d58972d1c196a';
//https://api.themoviedb.org/3/movie/popular
// const response = await fetch(`${URL_BASE}/movie/popular${API_KEY}`);

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTE5MGY4M2E5NWJjNzJjZTAxZDU4OTcyZDFjMTk2YSIsInN1YiI6IjYyM2E2ZGQ0MTNhZjVmMDA0NzE0YmE1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w29ToiHMMDrrbl7vjE5Nj5SxSQceSGogIDSfTrDVsXg'
    }
}
const getRequest2 = async () => {
    const response = await fetch(`${URL_BASE}/movie/popular`, options);
    const json = await response.json()
    console.log(json.results[0].title);
    return json.results
}

const main = async () => {
    const popularMoviesInformation = await getRequest2();
    console.log(popularMoviesInformation);
    const fragment = document.createDocumentFragment();
    popularMoviesInformation.forEach(movieInformation => {
        const { poster_path, original_title, release_date, vote_average } = movieInformation;
        console.log(original_title)
        console.log(movieInformation)
        const imageMovie = document.createElement('img');
        const card = document.createElement('div');
        imageMovie.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
        // imageMovie.src = `https://image.tmdb.org/t/p/original${poster_path}`;
        imageMovie.alt = original_title;
        imageMovie.className = 'image_movie'
        card.appendChild(imageMovie);
        card.className = "card"
        const cardFoot = document.createElement('div');
        const titleMovie = document.createElement('h3');
        titleMovie.innerText = original_title;
        cardFoot.appendChild(titleMovie);
        const movieDateRelease = document.createElement('p');
        movieDateRelease.innerText = release_date;
        const rateContainer = document.createElement('div');
        rateContainer.className = 'rateContainer';
        const rateBar = document.createElement('div');
        const popularity = document.createElement('div');
        popularity.innerText = vote_average
        rateContainer.appendChild(rateBar);
        rateBar.appendChild(popularity);
        card.appendChild(cardFoot)
        card.appendChild(movieDateRelease);
        card.appendChild(rateBar);
        fragment.appendChild(card);
    });
    document.getElementById('movies_grid').appendChild(fragment);
    // document.body.appendChild(fragment);
}
main()
