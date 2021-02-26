import React from "react";
import SearchInput from "../SearchInput";
import "./FilterForm.css";
function FilterForm() {
  return (
    <div className="filter-form">
      <SearchInput name="field" type="text" />
      <SearchInput name="name" type="text" />
      <SearchInput name="date" type="date" />
      <SearchInput name="title" type="text" />
    </div>
  );
}
export default FilterForm;
