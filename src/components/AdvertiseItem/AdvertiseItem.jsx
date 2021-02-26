import React from "react";
import "./AdvertiseItem.css";

function AdvertiseItem({ data }) {
  const { id, date, field, name, new_value, old_value, title } = data;
  return (
    <div className="ads-item">
      <span className="ads-item__id">{id}</span>
      <span className="ads-item__name">{name}</span>
      <span className="ads-item__date">{date}</span>
      <span className="ads-item__title">{title}</span>
      <span className="ads-item__field">{field}</span>
      <span className="ads-item__old-value">{old_value}</span>
      <span className="ads-item__new-value">{new_value}</span>
    </div>
  );
}
export default AdvertiseItem;
