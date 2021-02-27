import React, { useState } from "react";
import "./SearchInput.css";

function SearchInput({ values, name, type, handleOnChange }) {
  return (
    <input
      className="search-input"
      defaultValue={values[name]}
      type={type}
      onChange={handleOnChange}
      placeholder={name}
      name={name}
    />
  );
}
export default SearchInput;
