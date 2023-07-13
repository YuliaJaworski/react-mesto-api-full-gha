import React from "react";

function Form({ title, name, onSubmit, buttonName, children }) {
  return (
    <>
      <h2 className={`popup__heading popup__heading_${name}`}>{title}</h2>
      <form name="popup__form" action="URL" method="post" className={`popup__form popup__form_${name}`} noValidate onSubmit={onSubmit}>
        {children}
        <button type="submit" className={`popup__save popup__save_${name}`}>
          {buttonName}
        </button>
      </form>
    </>
  );
}

export default Form;
