import React from "react";
import "./SortFields.scss";

function SortFields({ fields, displayName, handleOnClick }) {
  function switchRender(state) {
    if (state === "asc") {
      return <span className="sort-fields__entity ">&#9650;</span>;
    } else if (state === "des") {
      return <span className="sort-fields__entity ">&#9660;</span>;
    } else {
      return <span className="sort-fields__entity ">&#9644;</span>;
    }
  }
  return (
    <div className="sort-fields">
      {Object.keys(fields).map((field) => {
        return (
          <div
            onClick={() => handleOnClick(field)}
            className="sort-fields__item"
            key={field}
          >
            {fields[field][displayName]}
            {switchRender(fields[field]["state"])}
          </div>
        );
      })}
    </div>
  );
}
export default SortFields;
