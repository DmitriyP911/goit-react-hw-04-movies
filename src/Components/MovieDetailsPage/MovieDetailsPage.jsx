import React, { Component } from 'react';
import Styles from '../../Styles/MovieDetailsPage/movieDetailsPageStyle.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getFilmInfo } from '../../Utils/getFilmInfo';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

export default class MovieDetailsPage extends Component {

    state = {
        film: {}
    }

    static propTypes = {
        film: PropTypes.objectOf( {
            id: PropTypes.string.isRequired,
            poster_path: PropTypes.string.isRequired,
            original_title: PropTypes.string.isRequired
        } )
    };

    componentDidMount () {
        const filmId = this.props.match.params.movieId;
        getFilmInfo( filmId )
            .then( movie => {
                const film = movie.data
                this.setState( {
                    film
                } )
            } )
    }

    render () {
        const film = this.state.film;
        return (
            <div>
                <NavLink activeClassName={Styles.moviePageNav} to="/"> Home </NavLink>
                <h2 className={Styles.movieTitle}>{film.original_title}</h2>
                <img className={Styles.moviePoster}
                    src={`${IMG_URL}${film.poster_path}`}
                    alt="" />
                <div className={Styles.movieLinks}>
                    <a
                        href={film.homepage}
                        target="_blank"
                        rel="noopener noreferrer">You can watch this movie in official cite</a>
                    <NavLink to={`/movies/${film.id}/reviews`} >Get film information</NavLink>
                    <NavLink to={`/movies/${film.id}/cast`} >Get production information</NavLink>
                </div>
            </div>
        )
    }
}