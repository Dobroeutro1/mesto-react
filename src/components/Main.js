import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from "../contexts/CurrentCardContext";

function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const currentCard = React.useContext(CurrentCardContext);
    return(
        <main className="content">
            <section className="profile">
                <div className="profile__img" onClick={onEditAvatar}>
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <div className="profile__top">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button
                            className="profile__edit-btn"
                            onClick={onEditProfile}
                        >
                        </button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-btn"
                    onClick={onAddPlace}
                >
                </button>
            </section>

            <div className="cards">
                {currentCard.map((card) => {
                    const isOwn = card.owner._id === currentUser._id;
                    const isLiked = card.likes.some(i => i._id === currentUser._id);

                    return(
                        <Card
                            card={card}
                            key={card._id}
                            likes={card.likes}
                            name={card.name}
                            link={card.link}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            isOwn={isOwn}
                            isLiked={isLiked}
                        />
                    )
                })}
            </div>
        </main>
    )
}

export default Main;