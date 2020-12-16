import React from 'react';

function Card({card, link, name, likes, onCardClick, onCardLike, onCardDelete, isOwn, isLiked}) {
    function handleCardClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onCardLike(card)
    }
    function handleCardDelete() {
        onCardDelete(card);
    }

    const cardDeleteButtonClassName = (
        `card__trash-btn ${isOwn ? 'card__trash-btn_visible' : 'card__trash-btn_hidden'}`
    );
    const cardLikeButtonClassName = (
        `card__like-btn ${isLiked ? 'card__like-btn_liked' : ''}`
    );

    return(
        <div className="card">
            <img src={link} alt={name} className="card__img" onClick={handleCardClick}/>
            <div className="card__item">
                <h2 className="card__title">{name}</h2>
                <div className="card__like">
                    <button
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}>
                    </button>
                    <p className="card__like-counter">{likes.length}</p>
                </div>
            </div>
            <button
                className={cardDeleteButtonClassName}
                onClick={handleCardDelete}
            >
            </button>
        </div>
    )
}

export default Card;