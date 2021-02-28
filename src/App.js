import React from "react";
import AdvertisersProvider from "./context/Advertises/provider";
import AdertisersList from "./components/AdertisersList";
import FilterForm from "./components/FilterForm";
import ScrollToTopControlller from "./hooks/useScrollToTop";
function App() {
  ScrollToTopControlller();
  return (
    <AdvertisersProvider>
      <FilterForm />
      <AdertisersList />
    </AdvertisersProvider>
  );
}

export default App;
