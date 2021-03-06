import React, { Component } from 'react';
import shortId from 'shortid';
import { NavLink } from 'react-router-dom';
import Styles from '../../Styles/MoviePage/moviePageNavStyle.module.css';
import PropTypes from 'prop-types';

import defaultPoster from '../../Images/cant-find-poster.jpg';
import { searchData } from '../../Utils/getSearchData';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

export default class MoviePageSearch extends Component {
    state = {
        film: [],
        query: ''
    }

    static propTypes = {
        film: PropTypes.arrayOf( PropTypes.shape( {
            original_title: PropTypes.string.isRequired,
            poster_path: PropTypes.string.isRequired,
            overview: PropTypes.string.isRequired
        } ) ),
        query: PropTypes.string
    };

    handleGetQuery = ( e ) => {
        const { name, value } = e.target;
        this.setState( {
            [name]: value
        } )
    }

    handleGetQueryData = ( e ) => {
        e.preventDefault()
        searchData( this.state.query )
            .then( response => {
                this.setState( {
                    film: response.data.results,
                } )
            } )
    }

    componentDidMount = () => {
        if( this.props.location.prevQuery !== undefined ) {
            searchData( this.props.location.prevQuery )
                .then( response => {
                    this.setState( {
                        film: response.data.results,
                    } )
                } )
        }
    }

    render () {
        return (
            <div>
                <NavLink activeClassName={Styles.searchNav} to="/">Home</NavLink>
                <h2 className={Styles.searchTitle}>Search your movie</h2>
                <form onSubmit={this.handleGetQueryData} action="">
                    <input
                        className={Styles.input}
                        onChange={this.handleGetQuery}
                        name='query'
                        type="text"
                        value={this.state.query} />
                </form>
                <ul className={Styles.searchList}>
                    {
                        this.state.film.map( film => {
                            return (
                                <li className={Styles.searchListItem}
                                    key={shortId.generate()}>
                                    <NavLink to={{
                                        pathname: `/movies/${film.id}`,
                                        query: this.state.query,
                                        path: this.props.location.pathname
                                    }}>
                                        <h3 >{film.original_title}</h3>
                                        <img
                                            className={Styles.searchImg}
                                            src={film.poster_path !== null ? `${IMG_URL}${film.poster_path}` : `${defaultPoster}`}
                                            alt="" />
                                        <p>{film.overview}</p>
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