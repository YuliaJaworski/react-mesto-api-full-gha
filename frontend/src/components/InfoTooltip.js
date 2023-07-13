import React from "react";
import PopupWithForm from "./popupWithForm";

function InfoTooltip({ isOpen, onClose, isError }) {
  return (
    <section className={`popup  ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container-confirm">
        <button type="button" className={`popup__close`} onClick={onClose}></button>
        <div className={`popup__img-register ${isError ? "popup__img-register_type_error" : "popup__img-register_type_confirm"}`} />
        <h2 className="popup__heading popup__heading-confirm">
          {isError ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
