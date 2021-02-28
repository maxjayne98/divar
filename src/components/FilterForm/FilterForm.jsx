import React, { useEffect, useReducer, useState } from "react";
import SearchInput from "../SearchInput";
import CustomizedButton from "../CustomizedButton";
import SortFields from "../SortFields";
import useAdvertises from "../../context/Advertises/context.js";
import {
  validFilter,
  createFilterObject,
  isEmptyObject,
  isTwoObjectSame,
  insertParamsToUrl,
  removeParametersFromUrl,
  whatIsFieldNextState,
  whichIsNot,
} from "../../utils/globals";
import { REST_FILTER, SET_FILTER } from "../../context/Advertises/constant";

import "./FilterForm.scss";

function FilterForm() {
  const { dispatch, state, doFilter, doSort } = useAdvertises();
  const { filters } = state;

  const [formValues, setFormValues] = useState({
    field: "",
    name: "",
    date: "",
    title: "",
  });
  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const initialSortFields = {
    date: { persian: "تاریخ", state: "new" },
    name: { persian: "نام", state: "new" },
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
    } else if (action.type === "RESET_FIELD") {
      return { ...initialSortFields };
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
    if (isTwoObjectSame(validatedFilters, filters)) {
    } else {
      if (!isEmptyObject(filters) && isEmptyObject(validatedFilters)) {
        dispatch({ type: REST_FILTER });
        //clear url parameters
        removeParametersFromUrl();
      } else {
        dispatch({ type: SET_FILTER, payload: validatedFilters });
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
    if (!isEmptyObject(validatedFilters)) {
      setFormValues(validatedFilters);
      dispatch({ type: SET_FILTER, payload: validatedFilters });
      doFilter(validatedFilters, dispatch);
    }
  }, []);

  useEffect(() => {
    const sortFiled = whichIsNot(sortFields, "state", "new");
    console.log(sortFiled, isEmptyObject(sortFiled));
    !isEmptyObject(sortFiled) &&
      doSort(whichIsNot(sortFields, "state", "new"), dispatch);
  }, [sortFields]);

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
