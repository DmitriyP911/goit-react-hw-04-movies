import React from 'react';
import Styles from '../../Styles/Cast/castStyle.module.css';
import PropTypes from 'prop-types';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/'

export const Cast = ( { castArr } ) => (
    <div className={Styles.castWrap}>
        <h3 className={Styles.castGenres}>Actors:</h3>
        <ul className={Styles.castGenresList}>
            {
                castArr.map( actor => {
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

Cast.propTypes = {
    castArr: PropTypes.arrayOf( PropTypes.shape( {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    } ) )
}