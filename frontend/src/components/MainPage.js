import React from "react";

import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function MainPage({
  cards,
  onCardClick,
  setIsEditProfilePopupOpen,
  setIsAddPlacePopupOpen,
  setIsEditAvatarPopupOpen,
  handleCardDelete,
  handleCardLike,
  selecredCard,
  closePopupImage,
  isEditProfilePopupOpen,
  closePopupEdit,
  handleUpdateUser,
  isEditAvatarPopupOpen,
  closePopupAvatar,
  handleUpdateAvatar,
  isAddPlacePopupOpen,
  closePopupAdd,
  handleAddPlaceSubmit,
}) {
  return (
    <>
      <Main
        cards={cards}
        onCardClick={onCardClick}
        onEditProfile={setIsEditProfilePopupOpen}
        onAddPlace={setIsAddPlacePopupOpen}
        onEditAvatar={setIsEditAvatarPopupOpen}
        onCardDelete={handleCardDelete}
        onCardLike={handleCardLike}
      />
      <Footer />
      <ImagePopup card={selecredCard} closePopup={closePopupImage} />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closePopupEdit} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closePopupAvatar} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closePopupAdd} onAddPlace={handleAddPlaceSubmit} />
    </>
  );
}

export default MainPage;
