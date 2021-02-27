import { useReducer } from "react";
import AdvertiseContext from "./store";
import data from "../../data.json";

function AdvertisersProvider({ children }) {
  function reducer(state, action) {
    if (action.type === "ADD_DATA") {
      return {
        data: data.slice(0, (state.index + 1) * 30),
        index: state.index + 1,
      };
    } else if (action.type === "FILTER_DATA") {
      console.log(action);
      return { ...state };
    }
  }

  const initialState = { data: data.slice(0, 30), index: 1, filters: {} };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AdvertiseContext.Provider value={{ state, dispatch }}>
      {children}
    </AdvertiseContext.Provider>
  );
}
export default AdvertisersProvider;
