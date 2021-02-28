import { useReducer, useState } from "react";
import AdvertiseContext from "./store";
import {
  filterData,
  isEmptyObject,
  ascSort,
  desSort,
  whichIsNot,
} from "../../utils/globals";
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
      return { ...initialState };
    } else if (action.type === "SET_FILTER") {
      return {
        ...state,
        filters: action.payload,
      };
    } else if (action.type === "SET_DATA") {
      return {
        ...state,
        data: action.payload,
        index: 1,
      };
    } else if (action.type === "SET_LOADING") {
      return {
        ...state,
        loading: action.payload,
      };
    }
  }

  const initialState = { data: data, index: 1, filters: {}, loading: false };
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [loading, setLoading] = useState(false);

  async function doFilter(fils, callback) {
    callback({ type: "SET_LOADING", payload: true });
    const filss = { ...fils };
    var filterdData = [...data];
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
          resolve(filterData(filss, filterdData.slice(start, end)))
        );
      }
      filterdData = [];
      await Promise.all(promises)
        .then((values) => {
          filterdData = [...filterdData, ...values];
        })
        .then(() => {
          callback({
            type: "SET_DATA",
            payload: filterdData.reduce(
              (acc, item) => (acc = [...acc, ...item]),
              []
            ),
          });
          setTimeout(() => {
            callback({ type: "SET_LOADING", payload: false });
          }, 1000);
        });
    } else {
      callback({
        type: "SET_DATA",
        payload: filterdData,
      });
      setTimeout(() => {
        callback({ type: "SET_LOADING", payload: false });
      }, 1000);
    }
  }
  async function doSort(obj, callback) {
    const key = Object.keys(whichIsNot(obj, "state", "none"))[0];
    const state = key ? obj[key]["state"] : "none";
    if (state === "asc") {
      let v;
      try {
        callback({ type: "SET_LOADING", payload: true });

        v = await new Promise((resolve, reject) =>
          resolve(ascSort([...data], key))
        );
        dispatch({ type: "SET_DATA", payload: v });
      } catch {
        console.log("err");
      }
      setTimeout(() => {
        callback({ type: "SET_LOADING", payload: false });
      }, 1000);
    } else if (state === "des") {
      let v;
      try {
        callback({ type: "SET_LOADING", payload: true });

        v = await new Promise((resolve, reject) =>
          resolve(desSort([...data], key))
        );
        dispatch({ type: "SET_DATA", payload: v });
      } catch {
        console.log("err");
      }
      setTimeout(() => {
        callback({ type: "SET_LOADING", payload: false });
      }, 1000);
    } else if (state === "none") {
      dispatch({ type: "SET_DATA", payload: data });
    }
  }
  return (
    <AdvertiseContext.Provider value={{ state, dispatch, doFilter, doSort }}>
      {children}
    </AdvertiseContext.Provider>
  );
}
export default AdvertisersProvider;
