import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Styles from '../../Styles/Reviews/reviewsStyle.module.css';
import { getFilmInfo } from '../../Utils/getFilmInfo';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

export default class Reviews extends Component {
    state = {
        film: {}
    }

    componentDidMount () {
        const filmId = this.props.match.params.movieId;
        getFilmInfo( filmId )
            .then( movie => {
                const film = movie.data
                this.setState( { film } )
            } )
    }

    render () {
        const film = this.state.film;
        return (
            <div>
                <NavLink to={`/movies/${film.id}`}> Go Back </NavLink>
                <div className={Styles.infoWrap}>
                    <h2 className={Styles.infoWrapTitle}>Tagline: {film.tagline}</h2>
                    <img className={Styles.infoWrapImg}
                        src={`${IMG_URL}${film.backdrop_path}`}
                        alt="" />
                    <div className={Styles.infoWrapOverview}>
                        <p>{film.overview}</p>
                    </div>
                    <div className={Styles.info}>
                        <div>
                            <p><span>Budget:</span>  {film.budget}$</p>
                        </div>
                        <div>
                            <p><span>Status:</span>  {film.status}</p>
                        </div>
                        <div>
                            <p><span>Runtime:</span>  {film.runtime} min</p>
                        </div>
                        <div>
                            <p><span>Rating:</span>  {film.vote_average} of 10</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}