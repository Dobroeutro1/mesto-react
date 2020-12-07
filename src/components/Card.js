import React from 'react';

function Card({card, link, name, likes, onCardClick}) {
    function handleCardClick() {
        onCardClick(card);
    }

    return(
        <div className="card">
            <img src={link} alt={name} className="card__img" onClick={handleCardClick}/>
            <div className="card__item">
                <h2 className="card__title">{name}</h2>
                <div className="card__like">
                    <button className="card__like-btn"></button>
                    <p className="card__like-counter">{likes.length}</p>
                </div>
            </div>
            <button className="card__trash-btn"></button>
        </div>
    )
}

export default Card;