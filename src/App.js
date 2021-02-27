import React from "react";
import AdvertisersProvider from "./context/Advertises/provider";
import LoadingProvider from "./context/Loading/provider";
import AdertisersList from "./components/AdertisersList";
import FilterForm from "./components/FilterForm";
import ScrollToTopControlller from "./hooks/useScrollToTop";
function App() {
  ScrollToTopControlller();
  return (
    <LoadingProvider>
      <AdvertisersProvider>
        <FilterForm />
        <AdertisersList />
      </AdvertisersProvider>
    </LoadingProvider>
  );
}

export default App;
