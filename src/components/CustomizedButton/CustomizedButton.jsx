import React from "react";
import "./CustomizedButton.scss";
function CustomizedButton({ name }) {
  return <button className="button">{name}</button>;
}
export default CustomizedButton;
