import React, { useEffect, useState } from "react";
import SearchInput from "../SearchInput";
import useAdvertises from "../../context/Advertises/context.js";
import useLoading from "../../context/Loading/context";
import {
  objectToUrlParam,
  checkFilters,
  validFilter,
  createFilterObject,
  isEmptyObject,
} from "../../utils/globals";
import "./FilterForm.css";

function FilterForm() {
  const { dispatch, state } = useAdvertises();
  const { filters } = state;
  const { setLoading } = useLoading();
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
    ev.preventDefault();
    const validatedFilters = validFilter(formValues);
    if (checkFilters(formValues)) {
      dispatch({ type: "FILTER_DATA", payload: validatedFilters });
      window.history.replaceState(
        null,
        null,
        objectToUrlParam(validatedFilters)
      );
    } else {
      if (checkFilters(filters)) {
        dispatch({ type: "REST_FILTER" });
      }
    }
  }
  useEffect(() => {
    const filters = validFilter(
      createFilterObject(window.location.pathname.substring(1).split("&"))
    );
    console.log("in useEffect : ", filters);
    if (!isEmptyObject(filters)) {
      setFormValues(filters);
      dispatch({ type: "FILTER_DATA", payload: filters });
    }
  }, []);
  return (
    <form className="filter-form" onSubmit={formSubmit}>
      <SearchInput
        values={formValues}
        name="field"
        type="text"
        handleOnChange={changeHandler}
      />
      <SearchInput
        values={formValues}
        name="name"
        type="text"
        handleOnChange={changeHandler}
      />
      <SearchInput
        values={formValues}
        name="date"
        type="date"
        handleOnChange={changeHandler}
      />
      <SearchInput
        values={formValues}
        name="title"
        type="text"
        handleOnChange={changeHandler}
      />
      <SearchInput values={formValues} name="submit" type="submit" />
    </form>
  );
}
export default React.memo(FilterForm);
