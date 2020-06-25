import React, { Component } from 'react';
import Styles from '../../Styles/MovieDetailsPage/movieDetailsPageStyle.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getFilmInfo } from '../../Utils/getFilmInfo';
import { Reviews } from '../Reviews/Reviews';
import { Cast } from '../Cast/Cast';
import { getReviewsInfo } from '../../Utils/getFilmInfo';
import { getCastInfo } from '../../Utils/getFilmInfo';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

export default class MovieDetailsPage extends Component {

    state = {
        film: {},
        castArr: [],
        reviewsArr: [],
        cast: false,
        reviews: false
    }

    static propTypes = {
        film: PropTypes.objectOf( {
            id: PropTypes.string.isRequired,
            poster_path: PropTypes.string.isRequired,
            original_title: PropTypes.string.isRequired
        } )
    };

    handleOpenCast = () => {
        const filmId = this.props.match.params.movieId;
        getCastInfo( filmId )
            .then( movie => {
                const film = movie.data
                this.setState( {
                    castArr: [...film.cast]
                } )
            } )
        this.setState( {
            cast: true,
            reviews: false
        } )
    }

    handleOpenReviews = () => {
        const filmId = this.props.match.params.movieId;
        getReviewsInfo( filmId )
            .then( movie => {
                const film = movie.data
                const reviewsArr = film.results
                this.setState( { reviewsArr } )
            } )
        this.setState( {
            cast: false,
            reviews: true
        } )
    }

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
        const prevQuery = this.props.location.query
        return (
            <div>
                <NavLink
                    activeClassName={Styles.moviePageNav}
                    to={{
                        pathname: "/movies",
                        prevQuery
                    }}>Go to search page</NavLink>
                <h2 className={Styles.movieTitle}>{film.original_title}</h2>
                <img className={Styles.moviePoster}
                    src={`${IMG_URL}${film.poster_path}`}
                    alt="" />
                <div className={Styles.movieLinks}>
                    <a
                        href={film.homepage}
                        target="_blank"
                        rel="noopener noreferrer">You can watch this movie in official cite</a>
                    <NavLink onClick={this.handleOpenReviews}
                        className={Styles.reviewsStyle}
                        to={`/movies/${film.id}/reviews`} >Get reviews</NavLink>
                    <NavLink onClick={this.handleOpenCast}
                        className={Styles.castStyle}
                        to={`/movies/${film.id}/cast`} >Get cast information</NavLink>
                    {this.state.cast === true && <Cast castArr={this.state.castArr} />}
                    {this.state.reviews === true && <Reviews reviewsArr={this.state.reviewsArr} />}
                </div>
            </div>
        )
    }
}