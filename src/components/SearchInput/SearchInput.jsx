import React, { useState } from "react";
import "./SearchInput.css";

function SearchInput({ name, type }) {
  const [value, setValue] = useState("");
  function onChangeInput(ev) {
    setValue(ev.target.value);
    console.log(ev.target.value);
  }
  return (
    <input
      className="search-input"
      type={type}
      value={value}
      onChange={onChangeInput}
      placeholder={name}
    />
  );
}
export default SearchInput;
