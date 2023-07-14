import React from "react";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Login({ handleLogin }) {
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
      .login(password, email)
      .then((data) => {
        const jwt = document.cookie;
        console.log(jwt);
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          handleLogin(email);
          navigate("/mesto");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <div className="page__full-screen">
        <div className="popup_auth">
          <Form title="Вход" buttonName="Войти" name="auth" onSubmit={handleSubmit}>
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
        </div>
      </div>
    </div>
  );
}

export default Login;
