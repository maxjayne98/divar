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
    } else if (action.type === "REST_FILTER") {
      console.log("reset filter");
      return { ...initialState };
    } else if (action.type === "SET_DATA") {
      return {
        data: action.payload,
        index: 1,
      };
    }
  }

  const initialState = { data: data, index: 1, filters: {} };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  async function doFilter(fils, callback) {
    const filss = { ...fils };
    var filterdData = [...data];
    if (filss["date"]) {
      const BST = new BinarySearchTree();
      BST.make(filterdData);
      const node = BST.searchInBst(filss["date"]);
      filterdData = node && node.getData();
      console.log("after date this is :::", filterdData.length);
      delete filss["date"];
    }
    if (!isEmptyObject(filss) && filterdData) {
      console.log("with other than date", filss);
      const promises = [];
      const numberOfPromises = 20;
      const eachPromiseShare = Math.ceil(filterdData.length / numberOfPromises);
      for (let i = 0; i < numberOfPromises; i++) {
        let start = i * eachPromiseShare;
        let end = i * eachPromiseShare + eachPromiseShare;
        promises[i] = new Promise((resolve, reject) =>
          resolve(filterData(filss, filterdData.slice(start, end)))
        );
      }
      filterdData = [];
      await Promise.all(promises)
        .then((values) => {
          filterdData = [...filterdData, ...values];
        })
        .then(() => {
          console.log(
            filterdData.reduce((acc, item) => (acc += item.length), 0)
          );
          callback({
            type: "SET_DATA",
            payload: filterdData.reduce(
              (acc, item) => (acc = [...acc, ...item]),
              []
            ),
          });
        });
    } else {
      console.log("whithout others");
      callback({
        type: "SET_DATA",
        payload: filterdData,
      });
    }
  }
  return (
    <AdvertiseContext.Provider value={{ state, dispatch, doFilter, loading }}>
      {children}
    </AdvertiseContext.Provider>
  );
}
export default AdvertisersProvider;
