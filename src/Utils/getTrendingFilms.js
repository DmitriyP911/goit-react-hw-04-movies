import axios from 'axios';

export const getTrendingFilms = ( function () {
    return axios.get( 'https://api.themoviedb.org/3/trending/movie/week?api_key=8d4e0a5a0c37d4780eefdf617d0feea1' )
}() );