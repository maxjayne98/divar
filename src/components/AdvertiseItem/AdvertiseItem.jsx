import React from "react";
import "./AdvertiseItem.css";

function AdvertiseItem({ data }) {
  const { id, date, field, name, new_value, old_value, title } = data;
  return (
    <div className="ads-item">
      <span>{id}</span>
      <span>{name}</span>
      <span>{date}</span>
      {/* <span>{title}</span>
      <span>{field}</span>
      <span>{old_value}</span>
      <span>{new_value}</span> */}
    </div>
  );
}
export default AdvertiseItem;
