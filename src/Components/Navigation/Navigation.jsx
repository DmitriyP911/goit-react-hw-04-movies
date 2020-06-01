import React from 'react';
import { NavLink } from 'react-router-dom';
import Styles from '../../Styles/Navigation/navigationStyle.module.css';

export const Navigation = () => (
    <ul className={Styles.mainNav}>
        <li className={Styles.mainNavItem}>
            <NavLink className={Styles.mainNavlink}
                to='/' exact>Home</NavLink>
        </li>
        <li className={Styles.mainNavItem}>
            <NavLink className={Styles.mainNavlink}
                to='/movies' exact>Find Movie Page</NavLink>
        </li>
    </ul>
)