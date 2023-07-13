import React from "react";
import Form from "./Form";

function PopupWithForm({ name, children, title, buttonName, isOpen, onClose, onSubmit }) {
  return (
    <section className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className={`popup__close popup__close_button_${name}`} onClick={onClose}></button>
        <Form title={title} name={name} onSubmit={onSubmit} buttonName={buttonName}>
          {children}
        </Form>
      </div>
    </section>
  );
}

export default PopupWithForm;
