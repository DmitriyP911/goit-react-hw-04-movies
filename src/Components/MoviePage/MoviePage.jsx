import React, { Component, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

// Components

import HomePage from '../HomePage/HomePage';
import MoviePageSearch from './MoviePageSearch';

const AsyncMovieDetailsPage = lazy( () =>
    import( '../MovieDetailsPage/MovieDetailsPage' )
);

export default class MoviePage extends Component {

    state = {}

    render () {
        return (
            <div>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Switch>
                        <Route path="/"
                            exact component={HomePage} />
                        <Route path="/movies/:movieId"
                            component={AsyncMovieDetailsPage} />
                        <Route path="/movies"
                            component={MoviePageSearch} />
                    </Switch>
                </Suspense>
            </div>
        )
    }
}