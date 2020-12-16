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
    const [currentUser, setCurrentUser] = React.useState([]);
    const [currentCard, setCurrentCard] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([getUserInfo, initialCards]) => {
                setCurrentUser(getUserInfo);
                setCurrentCard(initialCards);
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
                const newCards = currentCard.map((c) => c._id === card._id ? newCard : c);
                setCurrentCard(newCards);
            })
        } else {
            api.addLike(card, !isLiked).then((newCard) => {
                const newCards = currentCard.map((c) => c._id === card._id ? newCard : c);
                setCurrentCard(newCards);
            });
        }

    }
    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            const newCards = currentCard.filter((c) => c._id !== card._id);

            setCurrentCard(newCards)
        });
    }
    function handleUpdateUser(userInfo) {
        api.changeUserInfo(userInfo.name, userInfo.about).then((userInfo) => {
            setCurrentUser(userInfo)
        })
    }
    function handleUpdateAvatar(userAvatar) {
        api.changeUserAvatar(userAvatar.avatar).then((avatar) => {
            setCurrentUser(avatar)
        })
    }
    function handleAddPlaceSubmit(cards) {
        api.addNewCard(cards).then((newCard) => {
            setCurrentCard([newCard, ...currentCard]);
        })
    }

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <CurrentCardContext.Provider value={currentCard}>
                    <Main
                        cards={currentCard}
                        user={currentUser}
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
                            onClick={closeAllPopups}
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
