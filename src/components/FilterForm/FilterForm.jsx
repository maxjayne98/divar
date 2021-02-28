import React, { useEffect, useReducer, useState } from "react";
import SearchInput from "../SearchInput";
import CustomizedButton from "../CustomizedButton";
import SortFields from "../SortFields";
import useAdvertises from "../../context/Advertises/context.js";
import useLoading from "../../context/Loading/context";
import {
  validFilter,
  createFilterObject,
  isEmptyObject,
  isTwoObjectSame,
  insertParamsToUrl,
  removeParametersFromUrl,
  whatIsFieldNextState,
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
    console.log(
      "in change handler",
      formValues,
      e.target.name,
      "::::",
      e.target.value
    );
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const initialSortFields = {
    date: { persian: "تاریخ", state: "none" },
    name: { persian: "نام", state: "none" },
  };
  function setSortFields(state, action) {
    if (action.type === "SET_FIELD") {
      return {
        ...initialSortFields,
        [action.payload]: {
          ...state[action.payload],
          state: whatIsFieldNextState(state[action.payload]["state"]),
        },
      };
    }
  }

  const [sortFields, dispatchSortFields] = useReducer(
    setSortFields,
    initialSortFields
  );
  function handleSortOnclick(val) {
    dispatchSortFields({ type: "SET_FIELD", payload: val });
  }

  function formSubmit(ev) {
    ev.preventDefault();
    const validatedFilters = validFilter(formValues);
    console.log("before submit:::::", validatedFilters, filters);
    if (isTwoObjectSame(validatedFilters, filters)) {
      console.log("filters are same so we don't dispatch anything");
    } else {
      if (!isEmptyObject(filters) && isEmptyObject(validatedFilters)) {
        console.log("user cleared filter so we should reset it");
        dispatch({ type: "REST_FILTER" });
        console.log(window.location.pathname);
        //clear url parameters
        removeParametersFromUrl();
      } else {
        console.log("filters are changed and we have to dispatch someThing");
        dispatch({ type: "SET_FILTER", payload: validatedFilters });
        doFilter(validatedFilters, dispatch);
        //change url parameters
        insertParamsToUrl(validatedFilters);
      }
    }
  }

  useEffect(() => {
    const validatedFilters = validFilter(
      createFilterObject(window.location.pathname.substring(1).split("&"))
    );
    console.log("in useEffect : ", validatedFilters);
    if (!isEmptyObject(validatedFilters)) {
      setFormValues(validatedFilters);
      dispatch({ type: "SET_FILTER", payload: validatedFilters });
      doFilter(validatedFilters, dispatch);
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
      <SortFields
        fields={sortFields}
        displayName="persian"
        handleOnClick={handleSortOnclick}
      />
    </form>
  );
}
export default React.memo(FilterForm);
