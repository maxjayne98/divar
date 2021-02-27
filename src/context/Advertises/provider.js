import { useReducer } from "react";
import AdvertiseContext from "./store";
import { filterData } from "../../utils/globals";
import data from "../../data.json";

function AdvertisersProvider({ children }) {
  function reducer(state, action) {
    console.log(action);
    if (action.type === "ADD_DATA") {
      return {
        data: data.slice(0, (state.index + 1) * 30),
        index: state.index + 1,
      };
    } else if (action.type === "FILTER_DATA") {
      const filters = action.payload;
      return {
        ...state,
        data: filterData(filters, data).slice(0, 30),
        index: 1,
      };
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
