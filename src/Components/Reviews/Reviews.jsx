import React from 'react';
import Styles from '../../Styles/Reviews/reviewsStyle.module.css';

export const Reviews = ( { reviewsArr } ) => (
    <div>
        <div className={Styles.infoWrap}>
            <h2 className={Styles.infoWrapTitle}>Reviews:</h2>
            <ul>
                {!!reviewsArr.length &&
                    reviewsArr.map( review => {
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