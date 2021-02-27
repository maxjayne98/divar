import React, { useEffect, useState } from "react";
import "./AdvertiseItem.css";

function AdvertiseItem({ data }) {
  const { id, date, field, name, new_value, old_value, title } = data;
  const [isBookmark, setIsBookmark] = useState(window.localStorage.getItem(id));

  function bookmarkOnClick() {
    if (isBookmark) {
      window.localStorage.removeItem(id);
    } else {
      window.localStorage.setItem(id, id);
    }
    setIsBookmark((state) => !state);
  }

  return (
    <div className="ads-item">
      <span className="ads-item__id">{id}</span>
      <span className="ads-item__name">{name}</span>
      <span className="ads-item__date">{date}</span>
      <span className="ads-item__title">{title}</span>
      <span className="ads-item__field">{field}</span>
      <span className="ads-item__old-value">{old_value}</span>
      <span className="ads-item__new-value">{new_value}</span>
      {isBookmark ? (
        <div className="ads-item__star" onClick={bookmarkOnClick}>
          &#9733;
        </div>
      ) : (
        <div className="ads-item__star" onClick={bookmarkOnClick}>
          &#9734;
        </div>
      )}
    </div>
  );
}
export default AdvertiseItem;
