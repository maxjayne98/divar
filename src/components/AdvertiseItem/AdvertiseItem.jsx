import React, { useState } from "react";
import "./AdvertiseItem.scss";

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
    <tr className="advertises-item">
      <td>{new_value}</td>
      <td>{old_value}</td>
      <td>{date}</td>
      <td>{title}</td>
      <td>{field}</td>
      <td>{name}</td>
      <td>
        {isBookmark ? (
          <span className="ads-item__star" onClick={bookmarkOnClick}>
            &#9733;
          </span>
        ) : (
          <span className="ads-item__star" onClick={bookmarkOnClick}>
            &#9734;
          </span>
        )}
      </td>
    </tr>
  );
}
export default AdvertiseItem;
