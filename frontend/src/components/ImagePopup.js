import React from "react";

function ImagePopup({ closePopup, card }) {
  return (
    <section className={`popup popup_open-photo ${card ? "popup_opened" : ""}`}>
      <div className="popup__container-photo">
        <button type="button" className="popup__close popup__close_button_photo" onClick={closePopup}></button>
        <img src={card ? card.link : ""} alt={card ? card.name : ""} className="popup__photo" />
        <h2 className="popup__title">{card ? card.name : ""}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
