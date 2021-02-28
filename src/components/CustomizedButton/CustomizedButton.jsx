import React from "react";
import "./CustomizedButton.scss";
function CustomizedButton({ name }) {
  return (
    <div className="button__container">
      <button className="button">{name}</button>
    </div>
  );
}
export default CustomizedButton;
