import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Styles from '../../Styles/Reviews/reviewsStyle.module.css';
import { getReviewsInfo } from '../../Utils/getFilmInfo';

export default class Reviews extends Component {
    state = {
        film: {},
        reviews: []
    }

    componentDidMount () {
        const filmId = this.props.match.params.movieId;
        getReviewsInfo( filmId )
            .then( movie => {
                const film = movie.data
                const reviews = film.results
                this.setState( { film, reviews } )
            } )
    }

    render () {
        const { film, reviews } = this.state;
        return (
            <div>
                <NavLink to={`/movies/${film.id}`}> Go Back </NavLink>
                <div className={Styles.infoWrap}>
                    <h2 className={Styles.infoWrapTitle}>Reviews:</h2>
                    <ul>
                        {!!reviews.length &&
                            reviews.map( review => {
                                return (
                                    <li key={review.id}>
                                        <div>
                                            <p>Author: <span>{review.author}</span></p>
                                            <div>Review: <p>{review.content}</p></div>
                                        </div>
                                    </li>
                                )
                            } )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}