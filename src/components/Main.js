import React from 'react';
import api from "../utils/Api";
import Card from "./Card";

function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) {
    const [userName, getUserName] = React.useState("");
    const [userDescription, getUserDescription] = React.useState("");
    const [userAvatar, getUserAvatar] = React.useState("");
    const [cards, getCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([getUserInfo, initialCards]) => {
                getUserName(getUserInfo.name);
                getUserDescription(getUserInfo.about);
                getUserAvatar(getUserInfo.avatar);

                getCards(initialCards);
            })
            .catch(() => {
                console.log('Что-то пошло не так :(')
            })
    }, [])

    return(
        <main className="content">
            <section className="profile">
                <div className="profile__img" onClick={onEditAvatar}>
                    <img src={userAvatar} alt="Аватар" className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <div className="profile__top">
                        <h1 className="profile__title">{userName}</h1>
                        <button
                            className="profile__edit-btn"
                            onClick={onEditProfile}
                        >
                        </button>
                    </div>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button
                    className="profile__add-btn"
                    onClick={onAddPlace}
                >
                </button>
            </section>

            <div className="cards">
                {cards.map((card) => {
                    return(
                        <Card
                            card={card}
                            key={card._id}
                            likes={card.likes}
                            name={card.name}
                            link={card.link}
                            onCardClick={onCardClick}
                        />
                    )
                })}
            </div>
        </main>
    )
}

export default Main;