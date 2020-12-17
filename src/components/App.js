import React from 'react';
import '../index.css';
import '../components/Header';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from "../contexts/CurrentCardContext";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([getUserInfo, initialCards]) => {
                setCurrentUser(getUserInfo);
                setCards(initialCards);
            })
            .catch(() => {
                console.log('Что-то пошло не так :(')
            })
    }, [])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(false);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (isLiked) {
            api.deleteLike(card, isLiked).then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            })
                .catch(() => {
                    console.log('Что-то пошло не так :(')
                })
        } else {
            api.addLike(card, !isLiked).then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            })
                .catch(() => {
                    console.log('Что-то пошло не так :(')
                });
        }

    }
    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            const newCards = cards.filter((c) => c._id !== card._id);

            setCards(newCards)
        })
            .catch(() => {
                console.log('Что-то пошло не так :(')
            });
    }
    function handleUpdateUser(userInfo) {
        api.changeUserInfo(userInfo.name, userInfo.about).then((userInfo) => {
            setCurrentUser(userInfo)
        }).catch(() => {
            console.log('Что-то пошло не так :(')
        })
    }
    function handleUpdateAvatar(userAvatar) {
        api.changeUserAvatar(userAvatar.avatar).then((avatar) => {
            setCurrentUser(avatar)
        }).catch(() => {
            console.log('Что-то пошло не так :(')
        })
    }
    function handleAddPlaceSubmit(card) {
        api.addNewCard(card).then((newCard) => {
            setCards([newCard, ...cards]);
        }).catch(() => {
            console.log('Что-то пошло не так :(')
        })
    }

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <CurrentCardContext.Provider value={cards}>
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                </CurrentCardContext.Provider>
                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <PopupWithForm
                    name="confirm"
                    title="Вы уверены?"
                    onClose={closeAllPopups}
                >
                    <>
                        <button
                            type="submit"
                            className="popup__save-btn popup__confirm-btn"
                        >
                            <span>
                                Да
                            </span>
                        </button>
                    </>
                </PopupWithForm>

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </CurrentUserContext.Provider>

      </>
    );
}

export default App;
