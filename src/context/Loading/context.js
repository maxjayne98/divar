import React from "react";
import LoadingContext from "./store";
function useLoading() {
  const context = React.useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}
export default useLoading;
