import React from "react";
import api from "../utils/api";
import Login from "./Login";
import Register from "./Register";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import { Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import Header from "./Header";

function App() {
  const [cards, setCards] = React.useState([]);
  const [selecredCard, setSelectedCard] = React.useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(null);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState({ email: "" });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserName()
        .then((data) => {
          console.log(data);
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getAllCards()
        .then((data) => {
          console.log(data);
          setCards(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const onCardClick = (selecredCard) => setSelectedCard(selecredCard);
  const closePopupImage = (selecredCard) => setSelectedCard(null);
  const closePopupEdit = (isEditProfilePopupOpen) => setIsEditProfilePopupOpen(null);
  const closePopupAdd = (isAddPlacePopupOpen) => setIsAddPlacePopupOpen(null);
  const closePopupAvatar = (isEditAvatarPopupOpen) => setIsEditAvatarPopupOpen(null);

  //поставить лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .like(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => console.log(err));
    }
  }

  //удалить карточку
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  //обновить данные пользователя
  function handleUpdateUser(data) {
    api
      .addNewUserName(data.name, data.about)
      .then((info) => {
        setCurrentUser(info);
        closePopupEdit();
      })
      .catch((err) => console.log(err));
  }

  //обновить аватар
  function handleUpdateAvatar(data) {
    api
      .addNewUserPhoto(data)
      .then((avatar) => {
        setCurrentUser(avatar);
        closePopupAvatar();
      })
      .catch((err) => console.log(err));
  }

  //добавить фото
  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closePopupAdd();
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(email) {
    setLoggedIn(true);
    setUserEmail(email);
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((user) => {
          handleLogin(user.email);
          navigate("/mesto");
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__full-screen">
          <Header signOut={signOut} email={userEmail} loggedIn={loggedIn} />
          <Routes>
            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
            <Route
              path="/mesto"
              element={
                <ProtectedRoute
                  element={MainPage}
                  loggedIn={loggedIn}
                  cards={cards}
                  onCardClick={onCardClick}
                  setIsEditProfilePopupOpen={setIsEditProfilePopupOpen}
                  setIsAddPlacePopupOpen={setIsAddPlacePopupOpen}
                  setIsEditAvatarPopupOpen={setIsEditAvatarPopupOpen}
                  handleCardDelete={handleCardDelete}
                  handleCardLike={handleCardLike}
                  selecredCard={selecredCard}
                  closePopupImage={closePopupImage}
                  isEditProfilePopupOpen={isEditProfilePopupOpen}
                  closePopupEdit={closePopupEdit}
                  handleUpdateUser={handleUpdateUser}
                  isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                  closePopupAvatar={closePopupAvatar}
                  handleUpdateAvatar={handleUpdateAvatar}
                  isAddPlacePopupOpen={isAddPlacePopupOpen}
                  closePopupAdd={closePopupAdd}
                  handleAddPlaceSubmit={handleAddPlaceSubmit}
                />
              }
            />
            <Route path="/" element={loggedIn ? <Navigate to="/mesto" /> : <Navigate to="/sign-in" replace />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
