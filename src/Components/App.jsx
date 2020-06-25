import React, { lazy, Suspense, Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Styles

import Styles from '../Styles/App/appStyles.module.css'

// data

import { searchData } from '../Utils/getSearchData';

// Components

import HomePage from './HomePage/HomePage';
import { Navigation } from './Navigation/Navigation';

const AsyncMoviePage = lazy( () =>
    import( './MoviePage/MoviePage' )
)

// const AsyncNotFound = lazy( () =>
//     import( './NotFound/NotFound' )
// )

export default class App extends Component {

    state = {
        films: [],
        query: ''
    }

    handleGetQuery = ( e ) => {
        this.setState( {
            [e.target.name]: e.target.value
        } )
    }

    handleGetData = ( e ) => {
        e.preventDefault();
        if( this.state.query !== '' ) {
            searchData( this.state.query )
                .then( response => {
                    const filmsArr = response.data.results;
                    this.setState( {
                        films: [...filmsArr]
                    } )
                } )
        }
        this.setState( {
            films: []
        } )
    }

    render () {
        return (
            <div className={Styles.mainWrap}>
                <Route path="/" exact component={HomePage}>
                    <Navigation />
                </Route>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/movies" component={AsyncMoviePage} />
                        {/* <Route path="/NotFound" component={AsyncNotFound} /> */}
                    </Switch>
                </Suspense>
            </div >
        )
    }
}
