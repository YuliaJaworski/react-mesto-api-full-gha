import React from "react";
import headerLogo from "../images/logo.svg";
import { useLocation, Link } from "react-router-dom";

function Header({ email, signOut, loggedIn }) {
  const location = useLocation();
  const page = location.pathname;

  return (
    <header className="header">
      <img src={headerLogo} alt="логотип 'Место'" className="header__logo" />
      {page === "/mesto" && (
        <div className="header__container">
          <h2 className="header__title">{loggedIn ? email : ""}</h2>
          <button className="header__title header__title-button" onClick={signOut}>
            Выйти
          </button>
        </div>
      )}
      {page === "/sign-up" && (
        <Link to="/sign-in" className="header__title">
          Войти
        </Link>
      )}
      {page === "/sign-in" && (
        <Link to="/sign-up" className="header__title">
          Регистрация
        </Link>
      )}
    </header>
  );
}

export default Header;
