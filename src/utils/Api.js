class Api {
    constructor({baseUrl, authorization}, group) {
        this.baseUrl = baseUrl;
        this.authorization = authorization;
        this.group = group;
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/${this.group}/users/me`, {
            headers: {
                authorization: `${this.authorization}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/${this.group}/cards`, {
            headers: {
                authorization: `${this.authorization}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }

    changeUserInfo(nameValue, aboutValue) {
        return fetch(`${this.baseUrl}/${this.group}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameValue,
                about: aboutValue
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }

    changeUserAvatar(avatarLink) {
        return fetch(`${this.baseUrl}/${this.group}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }

    addNewCard(item) {
        return fetch(`${this.baseUrl}/${this.group}/cards`, {
            method: 'POST',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: item.name,
                link: item.link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/${this.group}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }

    addLike(card) {
        return fetch(`${this.baseUrl}/${this.group}/cards/likes/${card._id}`, {
            method: 'PUT',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }

    deleteLike(card) {
        return fetch(`${this.baseUrl}/${this.group}/cards/likes/${card._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this.authorization}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }
}

const api = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/',
        authorization: '8176c3f4-76a7-481c-9a33-49a36549538f'},
    'cohort-17'
);

export default api;