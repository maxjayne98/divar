import React from "react";
import AdvertisersProvider from "./context/Advertises/provider";
import AdertisersList from "./components/AdertisersList";
import ScrollToTopControlller from "./hooks/useScrollToTop";
function App() {
  ScrollToTopControlller();
  return (
    <AdvertisersProvider>
      <AdertisersList />
    </AdvertisersProvider>
  );
}

export default App;
