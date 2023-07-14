import React from "react";
import Form from "./Form";
import { Link } from "react-router-dom";
import * as auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function Register() {
  const [error, setError] = React.useState(true);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

  const closePopupError = (isConfirmPopupOpen) => setIsConfirmPopupOpen(false);
  const closePopupConfirm = (isConfirmPopupOpen) => {
    setIsConfirmPopupOpen(false);
    navigate("/sign-in");
  };

  const [formValue, setFormValue] = React.useState({
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const { password, email } = formValue;

    auth
      .register(password, email)
      .then((data) => {
        console.log(data);
        setIsConfirmPopupOpen(true);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setIsConfirmPopupOpen(true);
        setError(true);
      });
  }

  return (
    <>
      <div className="popup_auth">
        <Form buttonName="Зарегистрироваться" title="Регистрация" name="auth" onSubmit={handleSubmit}>
          <input
            id="input-email"
            type="email"
            className="popup__element popup__element_field_auth"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <span id="input-email-error" className="popup__span"></span>
          <input
            id="input-password"
            type="password"
            className="popup__element popup__element_field_auth"
            name="password"
            placeholder="Пароль"
            onChange={handleChange}
            required
          />
          <span id="input-password-error" className="popup__span"></span>
        </Form>
        <h3 className="popup__postscriptum">
          Уже зарегистрированы? &nbsp;
          <Link to="/sign-in" className="popup__postscriptum-link">
            Войти
          </Link>
        </h3>
      </div>
      <InfoTooltip isOpen={isConfirmPopupOpen} onClose={error ? closePopupError : closePopupConfirm} isError={error} />
    </>
  );
}

export default Register;
