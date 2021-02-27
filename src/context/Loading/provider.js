import { useReducer, useState } from "react";
import LoadingContext from "./store";
import { filterData, isEmptyObject } from "../../utils/globals";
import BinarySearchTree from "../../utils/BST";
import data from "../../data.json";

function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
export default LoadingProvider;
