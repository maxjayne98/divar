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
      console.log(action.payload);
      const filters = { ...action.payload };
      var filterdData = [...data.slice(0, 100)];
      console.log(filterdData.length, "whole");
      if (filters["date"]) {
        const BST = new BinarySearchTree();
        BST.make(filterdData);
        const node = BST.searchInBst(filters["date"]);
        filterdData = node && node.getData();
        delete filters["date"];
      }
      if (!isEmptyObject(filters) && filterdData) {
        filterdData = filterData(filters, filterdData);
      }
      filterdData && console.log(filterdData.length, "after others");

      console.log("finish");
      return {
        ...state,
        data: filterdData,
        index: 1,
        filters: { ...action.payload },
      };
    } else if (action.type === "REST_FILTER") {
      return { ...initialState };
    } else if (action.type === "SET_DATA") {
      console.log(action.type, action.payload.length);
      return {
        data: action.payload,
        index: 1,
      };
    }
  }

  const initialState = { data: data, index: 1, filters: {} };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  async function doFilter(fils) {
    const filss = { ...fils };
    var filterdData = [...data];
    // console.log(filterdData.length, "whole");
    if (filss["date"]) {
      const BST = new BinarySearchTree();
      BST.make(filterdData);
      const node = BST.searchInBst(filss["date"]);
      filterdData = node && node.getData();
      delete filss["date"];
    }
    if (!isEmptyObject(filss) && filterdData) {
      const promises = [];
      const numberOfPromises = 20;
      const eachPromiseShare = Math.ceil(filterdData.length / numberOfPromises);
      for (let i = 0; i < numberOfPromises; i++) {
        let start = i * eachPromiseShare;
        let end = i * eachPromiseShare + eachPromiseShare;
        promises[i] = new Promise((resolve, reject) =>
          resolve(filterData(filss, data.slice(start, end)))
        );
      }
      filterdData = [];
      await Promise.all(promises)
        .then((values) => {
          console.log("this is it ", values);
          filterdData = [...filterdData, ...values];
        })
        .then(() => {
          console.log(
            filterdData.reduce((acc, item) => (acc += item.length), 0)
          );
          dispatch({
            type: "SET_DATA",
            payload: filterdData.reduce(
              (acc, item) => (acc = [...acc, ...item]),
              []
            ),
          });
        });
      // console.log("asssghar", filterdData, all);
    }
  }
  return (
    <AdvertiseContext.Provider value={{ state, dispatch, doFilter, loading }}>
      {children}
    </AdvertiseContext.Provider>
  );
}
export default AdvertisersProvider;
