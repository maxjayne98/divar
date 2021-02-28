import React from "react";
import "./SearchInput.scss";

function SearchInput({ label, values, name, type, handleOnChange }) {
  return (
    <div className="search-input">
      <label>{label}</label>
      <input
        className="search-input__control"
        value={values[name]}
        type={type}
        onChange={handleOnChange}
        placeholder={name}
        name={name}
      />
    </div>
  );
}
export default SearchInput;
