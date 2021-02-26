import React from "react";
import AdvertisersProvider from "./context/Advertises/provider";
import AdertisersList from "./components/AdertisersList";
function App() {
  return (
    <AdvertisersProvider>
      <AdertisersList />
    </AdvertisersProvider>
  );
}

export default App;
