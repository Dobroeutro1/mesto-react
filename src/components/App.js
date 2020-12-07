import React from 'react';
import '../index.css';
import '../components/Header';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false, []);

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
        setSelectedCard(false, []);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    return (
      <body className="page">
        <Header />
        <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            children={
                <>
                    <input
                        className="popup__input popup__input_name"
                        type="text"
                        name="name"
                        id="name-profile"
                        value=""
                        required
                        minLength="2"
                        maxLength="40"
                    />
                    <span
                        className="popup__input-error"
                        id="name-profile-error"
                    >
                    </span>
                    <input
                        className="popup__input popup__input_title"
                        type="text"
                        name="link"
                        id="about-profile"
                        value=""
                        required
                        minLength="2"
                        maxLength="200"
                    />
                    <span
                        className="popup__input-error"
                        id="about-profile-error"
                    >
                    </span>
                    <button
                        type="submit"
                        className="popup__save-btn popup__save-profile"
                        onClick={closeAllPopups}
                    >
                        <span>Сохранить</span>
                    </button>
                </>
            }
        />
        <PopupWithForm
            name="card"
            title="Новое место"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            children={
            <>
                <input
                    className="popup__input popup__input_name"
                    type="text"
                    value=""
                    name="name"
                    id="name-card"
                    placeholder="Название"
                    required
                    minLength="1"
                    maxLength="30"
                />
                <span
                    className="popup__input-error"
                    id="name-card-error">
                </span>
                <input
                    className="popup__input popup__input_title"
                    type="URL"
                    name="link"
                    id="link-card"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span
                    className="popup__input-error"
                    id="link-card-error"
                >
                </span>
                <button
                    type="submit"
                    className="popup__save-btn popup__create-card"
                    onClick={closeAllPopups}
                >
                    <span
                        className="popup__create-card"
                    >
                        Создать
                    </span>
                </button>
            </>
        }
        />
        <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            onClose={closeAllPopups}
            children={
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
            }
        />
        <PopupWithForm
            name="update"
            title="Обновить аватар"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            children={
                <>
                    <input
                        className="popup__input popup__input_title"
                        type="URL"
                        name="link"
                        id="link-popup"
                        placeholder="Ссылка на картинку"
                        required
                    />
                    <span
                        className="popup__input-error"
                        id="link-popup-error"
                    >
                    </span>
                    <button
                        type="submit"
                        className="popup__save-btn popup__save-profile"
                        onClick={closeAllPopups}
                    >
                        <span>
                            Сохранить
                        </span>
                    </button>
                </>
            }
        />

        <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
        />
      </body>
    );
}

export default App;
