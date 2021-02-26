import React from "react";
import AdvertiseContext from "./store";
function useAdvertises() {
  const context = React.useContext(AdvertiseContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}
export default useAdvertises;
