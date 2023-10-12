const API_KEY = '1aabefa76bcd78826f917e467c04f113';
// const API_URL = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`;
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH =`https://image.tmdb.org/t/p/w1280`;

const main = document.querySelector('main');

//get movie initially
getMovies(API_URL);



async function getMovies(url) {
    const response  = await fetch(url);
    const data = await response.json();  
    console.log(data);

    showMovies(data.results);
}



function showMovies(movies) {
    // clear main
    main.innerHTML = "";
    movies.forEach(movie => {
        // const {poster_path, title, vote_average } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
                <img src="${IMG_PATH}/${movie.poster_path}" alt="">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <span class="${getColorByVote(movie.vote_average)}">${movie.vote_average}</span>
                </div>
                <div class="overview">
                    ${movie.overview}
                </div>
                    
                    `;

        main.appendChild(movieEl);
    })
}

function getColorByVote(vote) {
    if(vote >=8){
        return 'green';
    } else if(vote>= 5){
        return 'orange';
    }else {
        return 'red';
    }
}





const form = document.getElementById('form');
const search = document.getElementById('search');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let searchTerm = search.value;
    // console.log(searchTerm);
    
    if(searchTerm) {
        const SEARCH_MOVIE = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${API_KEY}`;
        // Empty the search bar
        getMovies(SEARCH_MOVIE);
        search.value = "";
    }    
})
