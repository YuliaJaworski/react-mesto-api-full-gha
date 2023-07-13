import React from "react";
import PopupWithForm from "./popupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleUpdateUserName(evt) {
    setName(evt.target.value);
  }

  function handleUpdateUserDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" buttonName="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        id="input-name"
        type="text"
        className="popup__element popup__element_field_name"
        name="name"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleUpdateUserName}
      />
      <span id="input-name-error" className="popup__span"></span>
      <input
        id="input-job"
        type="text"
        className="popup__element popup__element_field_job"
        name="job"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleUpdateUserDescription}
      />
      <span id="input-job-error" className="popup__span"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
