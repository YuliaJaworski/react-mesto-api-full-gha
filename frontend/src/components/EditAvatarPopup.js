import React from "react";
import PopupWithForm from "./popupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputAvatar = React.useRef();
  //const [avatar, setAvatar] = React.useState();

  React.useEffect(() => {
    inputAvatar.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatar.current.value,
    });
  }

  return (
    <PopupWithForm name="add-avatar" title="Обновить аватар" buttonName="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        id="input-avatar"
        type="url"
        className="popup__element popup__element_field_avatar"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        ref={inputAvatar}
      />
      <span id="input-avatar-error" className="popup__span"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
