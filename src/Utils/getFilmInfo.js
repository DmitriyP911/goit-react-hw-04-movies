import axios from 'axios';

export const getFilmInfo = ( id ) => {
    return axios.get( `https://api.themoviedb.org/3/movie/${id}?api_key=8d4e0a5a0c37d4780eefdf617d0feea1` )
}