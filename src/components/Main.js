import React from 'react';
import Card from "./Card";

function Main({cards, user, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete}) {

    return(
        <main className="content">
            <section className="profile">
                <div className="profile__img" onClick={onEditAvatar}>
                    <img src={user.avatar} alt="Аватар" className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <div className="profile__top">
                        <h1 className="profile__title">{user.name}</h1>
                        <button
                            className="profile__edit-btn"
                            onClick={onEditProfile}
                        >
                        </button>
                    </div>
                    <p className="profile__subtitle">{user.about}</p>
                </div>
                <button
                    className="profile__add-btn"
                    onClick={onAddPlace}
                >
                </button>
            </section>

            <div className="cards">
                {cards.map((card) => {
                    const isOwn = card.owner._id === user._id;
                    const isLiked = card.likes.some(i => i._id === user._id);

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