import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  //проверяем являемся ли мы владельцем карточки
  const isOw = card.owner._id === currentUser._id;

  //определяем, поставлен ли лайк текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  //делаем кнопку активной
  const cardLikeButtonClassName = `element__like ${isLiked && "element__like_active"}`;

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  return (
    <li className="element">
      {isOw && <button type="button" className="element__delete" onClick={handleDeleteClick} />}
      <img className="element__photo" src={card.link} alt={card.name} onClick={handleCardClick} />
      <div className="element__description">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__likes">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <a className="element__count-likes">{card.likes.length}</a>
        </div>
      </div>
    </li>
  );
}

export default Card;
