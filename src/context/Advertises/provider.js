import { useReducer, useState } from "react";
import AdvertiseContext from "./store";
import { filterData, isEmptyObject } from "../../utils/globals";
import BinarySearchTree from "../../utils/BST";
import data from "../../data.json";

function AdvertisersProvider({ children }) {
  function reducer(state, action) {
    if (action.type === "ADD_DATA") {
      return {
        ...state,
        index: state.index + 1,
      };
    } else if (action.type === "FILTER_DATA") {
      const filters = { ...action.payload };
      var filterdData = data;
      if (filters["date"]) {
        const BST = new BinarySearchTree();
        BST.make(filterdData);
        const node = BST.searchInBst(filters["date"]);
        filterdData = node && node.getData();
        delete filters["date"];
      }
      console.log(filters);
      if (!isEmptyObject(filters)) {
        filterdData = filterData(filters, filterdData);
        console.log("was not empty");
      }
      return {
        ...state,
        data: filterdData,
        index: 1,
      };
    }
  }
  const initialState = { data: data, index: 1, filters: {} };
  const [state, dispatch] = useReducer(reducer, initialState);
  // async function doFilter(filters) {
  //   var filterdData = data;
  //   if (filters["date"]) {
  //     const BST = new BinarySearchTree();
  //     BST.make(filterdData);
  //     const node = BST.searchInBst(filters["date"]);
  //     filterdData = node && node.getData();
  //     delete filters["date"];
  //   }
  //   console.log(filters);
  //   if (!isEmptyObject(filters)) {
  //     filterdData = filterData(filters, filterdData);
  //     console.log("was not empty");
  //   }
  //   return {
  //     ...state,
  //     data: filterdData,
  //     index: 1,
  //   };
  // }
  return (
    <AdvertiseContext.Provider value={{ state, dispatch }}>
      {children}
    </AdvertiseContext.Provider>
  );
}
export default AdvertisersProvider;
