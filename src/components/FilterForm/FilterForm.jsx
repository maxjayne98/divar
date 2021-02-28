import React, { useEffect, useState } from "react";
import SearchInput from "../SearchInput";
import CustomizedButton from "../CustomizedButton";
import useAdvertises from "../../context/Advertises/context.js";
import useLoading from "../../context/Loading/context";
import {
  objectToUrlParam,
  checkFilters,
  validFilter,
  createFilterObject,
  isEmptyObject,
} from "../../utils/globals";
import "./FilterForm.scss";

function FilterForm() {
  const { dispatch, state, doFilter } = useAdvertises();
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
      // dispatch({ type: "FILTER_DATA", payload: validatedFilters });
      doFilter(validatedFilters, dispatch);
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
      // dispatch({ type: "FILTER_DATA", payload: filters });
      doFilter(filters, dispatch);
    }
  }, []);
  return (
    <form id="form1" className="filter-form" onSubmit={formSubmit}>
      <SearchInput
        values={formValues}
        name="field"
        type="text"
        label="نوع"
        handleOnChange={changeHandler}
      />
      <SearchInput
        values={formValues}
        name="name"
        type="text"
        label="نام"
        handleOnChange={changeHandler}
      />
      <SearchInput
        values={formValues}
        name="date"
        type="text"
        label="تاریخ"
        handleOnChange={changeHandler}
      />
      <SearchInput
        values={formValues}
        name="title"
        type="text"
        label="عنوان"
        handleOnChange={changeHandler}
      />
      <CustomizedButton form="form1" type="submit" name="فیلتر" />
    </form>
  );
}
export default React.memo(FilterForm);
