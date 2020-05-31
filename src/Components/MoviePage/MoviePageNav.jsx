import React from 'react';
import { NavLink } from 'react-router-dom';

export const MoviePageNav = () => (
    <div>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink >
            </li>
            <li>
                <NavLink to="/movies/:movieId">Movie Details Page</NavLink >
            </li>
            <li>
                <NavLink to="/movies/:movieId/reviews">reviews</NavLink >
            </li>
            <li>
                <NavLink to="/movies/:movieId/cast">cast</NavLink >
            </li>
        </ul>
    </div>
)