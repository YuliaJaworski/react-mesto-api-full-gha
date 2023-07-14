class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //загрузка карточек с сервера
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }

  //добавить новую карточку
  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }

  //загрузка информации о пользователе с сервера
  getUserName() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }

  //редактирование профиля
  addNewUserName(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }

  //поставить лайк
  like(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }

  //удалить лайк
  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }

  //удалить карточку
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }

  //обновить аватар профиля
  addNewUserPhoto(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: "include",
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  url: "http://localhost:3000",
  headers: {
    "content-type": "application/json",
    // authorization: 'c26594ca-8d0e-4994-82bd-fba2c3fd8012'
  },
});

export default api;
