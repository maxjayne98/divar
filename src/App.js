import React from "react";
import AdvertisersProvider from "./context/Advertises/provider";
import AdertisersList from "./components/AdertisersList";
import FilterForm from "./components/FilterForm";
import ScrollToTopControlller from "./hooks/useScrollToTop";
import { useSelector, useDispatch } from "react-redux";
import { selectCouner } from "./redux/shared/selector";
import {
  increaseCounter,
  decreaseCounter,
  fetchUser,
} from "./redux/shared/actions.js";

function App() {
  ScrollToTopControlller();
  const counter = useSelector(selectCouner);
  console.log(counter, "this is counter");
  const dispatch = useDispatch();

  return (
    <AdvertisersProvider>
      <div onClick={() => dispatch(increaseCounter(1))}>{counter}</div>
      <FilterForm />
      <AdertisersList />
    </AdvertisersProvider>
  );
}

export default App;
