import React, { useState } from "react";
import SearchInput from "../SearchInput";
import useAdvertises from "../../context/Advertises/context.js";
import { objectToUrlParam } from "../../utils/globals";
import "./FilterForm.css";

function FilterForm() {
  const { dispatch } = useAdvertises();
  const [formValues, setFormValues] = useState({
    field: "",
    name: "",
    date: "",
    title: "",
  });

  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  function formSubmit(ev) {
    console.log(formValues);
    dispatch({ type: "FILTER_DATA", payload: formValues });
    console.log(document.location);
    window.history.replaceState(null, null, objectToUrlParam(formValues));
    ev.preventDefault();
  }
  return (
    <form className="filter-form" onSubmit={formSubmit}>
      <SearchInput name="field" type="text" handleOnChange={changeHandler} />
      <SearchInput name="name" type="text" handleOnChange={changeHandler} />
      <SearchInput name="date" type="date" handleOnChange={changeHandler} />
      <SearchInput name="title" type="text" handleOnChange={changeHandler} />
      <SearchInput name="submit" type="submit" />
    </form>
  );
}
export default FilterForm;
