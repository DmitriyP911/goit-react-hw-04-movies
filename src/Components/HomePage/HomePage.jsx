import React, { Component } from 'react';
import Styles from '../../Styles/HomePage/homePageStyle.module.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import shortId from 'shortid';

// data

import { getTrendingFilms } from '../../Utils/getTrendingFilms';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

export default class HomePage extends Component {

    state = {
        popularFilms: []
    };

    static propTypes = {
        popularFilms: PropTypes.arrayOf( PropTypes.shape( {
            original_title: PropTypes.string.isRequired,
            poster_path: PropTypes.string.isRequired
        } ) )
    };

    componentDidMount () {
        getTrendingFilms
            .then( resp => this.setState( { popularFilms: [...resp.data.results] } ) )
    }

    render () {
        const { popularFilms } = this.state;
        return (
            <div className={Styles.homepage}>
                <h2 className={Styles.homepageTitle}>Popular films</h2>
                <ul className={Styles.homepageList}>
                    {
                        popularFilms.map( film => {
                            return (
                                <li className={Styles.homepageListItem} key={shortId.generate()}>
                                    <NavLink activeClassName={Styles.navHover} to={`/movies/${film.id}`}>
                                        <img className={Styles.homepagePoster}
                                            src={`${IMG_URL}${film.poster_path}`}
                                            alt="" />
                                        <p>{film.original_title}</p>
                                    </NavLink>
                                </li>
                            )
                        } )
                    }
                </ul>
            </div>
        )
    }
}