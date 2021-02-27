import React, { useEffect, useState } from "react";
import SearchInput from "../SearchInput";
import useAdvertises from "../../context/Advertises/context.js";
import useLoading from "../../context/Loading/context";
import {
  objectToUrlParam,
  checkFilters,
  validFilter,
} from "../../utils/globals";
import "./FilterForm.css";

function FilterForm() {
  const { dispatch } = useAdvertises();
  const { setLoading } = useLoading();
  const [formValues, setFormValues] = useState({
    field: "",
    name: "",
    date: "",
    title: "",
  });
  useEffect(() => {
    console.log("FilterForm is renderd");
  });
  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  function formSubmit(ev) {
    ev.preventDefault();
    const validatedFilters = validFilter(formValues);
    if (checkFilters(formValues)) {
      console.log("submit is fired");
      setLoading(true);
      dispatch({ type: "FILTER_DATA", payload: validatedFilters });
      setLoading(false);
      window.history.replaceState(
        null,
        null,
        objectToUrlParam(validatedFilters)
      );
    }
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
export default React.memo(FilterForm);
