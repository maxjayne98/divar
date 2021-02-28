import React, { useState } from "react";
import "./SearchInput.scss";

function SearchInput({ label, values, name, type, handleOnChange }) {
  return (
    <div class="search-input">
      <label for="inputText">{label}</label>
      <input
        className="search-input__control"
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
