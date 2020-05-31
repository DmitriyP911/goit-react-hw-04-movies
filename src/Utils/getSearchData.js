import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie?api_key=8d4e0a5a0c37d4780eefdf617d0feea1&query=';

export const searchData = ( query ) => {
    return axios.get( `${BASE_URL}${query}` )
}

// https://image.tmdb.org/t/p/w500/