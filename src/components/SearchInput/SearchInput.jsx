import React, { useState } from "react";
import "./SearchInput.scss";

function SearchInput({ label, values, name, type, handleOnChange }) {
  return (
    // <div className="search-input">
    //   <label className="search-input__label">{name}</label>
    //   <input
    //     className="search-input__input"
    //     defaultValue={values[name]}
    //     type={type}
    //     onChange={handleOnChange}
    //     placeholder={name}
    //     name={name}
    //   />

    // </div>
    <div class="search-input">
      <label for="inputText">{label}</label>
      <input
        className="search-input__input form-control"
        defaultValue={values[name]}
        type={type}
        onChange={handleOnChange}
        placeholder={name}
        name={name}
      />
    </div>
  );
}
export default SearchInput;
