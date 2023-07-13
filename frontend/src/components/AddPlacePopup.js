import React from "react";
import PopupWithForm from "./popupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const inputName = React.useRef();
  const inputLink = React.useRef();

  React.useEffect(() => {
    inputName.current.value = "";
    inputLink.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: inputName.current.value,
      link: inputLink.current.value,
    });
  }
  return (
    <PopupWithForm name="add" title="Новое место" buttonName="Добавить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        id="input-title"
        type="text"
        className="popup__element popup__element_field_title"
        name="title"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        ref={inputName}
      />
      <span id="input-title-error" className="popup__span"></span>
      <input
        id="input-link"
        type="url"
        className="popup__element popup__element_field_link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        ref={inputLink}
      />
      <span id="input-link-error" className="popup__span"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
