import { useReducer } from "react";
import AdvertiseContext from "./store";
import data from "../../data.json";
import { act } from "react-dom/test-utils";
function AdvertisersProvider({ children }) {
  function reducer(state, action) {
    if (action.type === "ADD_DATA") {
      return {
        data: data.slice(0, (state.index + 1) * 30),
        index: state.index + 1,
      };
    }
  }

  const initialState = { data: data.slice(0, 30), index: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AdvertiseContext.Provider value={{ state, dispatch }}>
      {children}
    </AdvertiseContext.Provider>
  );
}
export default AdvertisersProvider;
