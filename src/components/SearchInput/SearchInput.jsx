import React, { useState } from "react";
import "./SearchInput.css";

function SearchInput({ name, type, handleOnChange }) {
  return (
    <input
      className="search-input"
      type={type}
      onChange={handleOnChange}
      placeholder={name}
      name={name}
    />
  );
}
export default SearchInput;
