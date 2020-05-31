import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getFilmInfo } from '../../Utils/getFilmInfo';
import Styles from '../../Styles/Cast/castStyle.module.css';
import PropTypes from 'prop-types';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

export default class Cast extends Component {

    state = {
        film: {},
        genres: [],
        prodCompanies: []
    }

    static propTypes = {
        film: PropTypes.objectOf( PropTypes.string.isRequired ),
        genres: PropTypes.arrayOf( PropTypes.shape( {
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        } ) )
    };

    componentDidMount () {
        const filmId = this.props.match.params.movieId;
        getFilmInfo( filmId )
            .then( movie => {
                const film = movie.data
                this.setState( {
                    film: film,
                    genres: [...film.genres],
                    prodCompanies: [...film.production_companies]
                } )
            } )
    }

    render () {
        const { film, genres, prodCompanies } = this.state;
        return (
            <div className={Styles.castWrap}>
                <NavLink to={`/movies/${film.id}`}> Go Back </NavLink>
                <h2 className={Styles.castTitle}>{film.original_title}</h2>
                <img
                    className={Styles.castPoster}
                    src={`${IMG_URL}${film.backdrop_path}`}
                    alt="" />
                <h3 className={Styles.castGenres}>Genres:</h3>
                <ul className={Styles.castGenresList}>
                    {
                        genres.map( genre => {
                            return (
                                <li key={genre.id}>
                                    <p>{genre.name}</p>
                                </li>
                            )
                        } )
                    }
                </ul>
                <h3 className={Styles.castCompanies}>Production Companies</h3>
                <ul className={Styles.castCompaniesList}>
                    {
                        prodCompanies.map( company => {
                            return (
                                <li
                                    className={Styles.castCompaniesListItem} key={company.id}>
                                    <p>{company.name}</p>
                                    {
                                        company.logo_path !== null &&
                                        <img
                                            className={Styles.castCompaniesImg}
                                            src={`${IMG_URL}${company.logo_path}`}
                                            alt={company.name} />
                                    }
                                </li>
                            )
                        } )
                    }
                </ul>
                <p>Release: {film.release_date}</p>
            </div>
        )
    }
}