import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getCastInfo } from '../../Utils/getFilmInfo';
import Styles from '../../Styles/Cast/castStyle.module.css';
import PropTypes from 'prop-types';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/'

export default class Cast extends Component {

    state = {
        film: {},
        cast: []
    }

    static propTypes = {
        film: PropTypes.objectOf( PropTypes.string.isRequired ),
        cast: PropTypes.arrayOf( PropTypes.shape( {
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        } ) )
    };

    componentDidMount () {
        const filmId = this.props.match.params.movieId;
        getCastInfo( filmId )
            .then( movie => {
                const film = movie.data
                console.log( film )
                this.setState( {
                    film,
                    cast: [...film.cast]
                } )
            } )
    }

    render () {
        const { cast, film } = this.state;
        return (
            <div className={Styles.castWrap}>
                <NavLink to={`/movies/${film.id}`}> Go Back </NavLink>
                <h3 className={Styles.castGenres}>Actors:</h3>
                <ul className={Styles.castGenresList}>
                    {
                        cast.map( actor => {
                            return (
                                <li className={Styles.castGenresListItem} key={actor.id}>
                                    <img className={Styles.actorPhoto} src={`${IMG_URL}${actor.profile_path}`} alt="" />
                                    <p className={Styles.actorName}>{actor.name}</p>
                                </li>
                            )
                        } )
                    }
                </ul>
            </div>
        )
    }
}