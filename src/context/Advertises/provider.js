import AdvertiseContext from "./store";
import data from "../../data.json";
function AdvertisersProvider({ children }) {
  return (
    <AdvertiseContext.Provider value={{ data }}>
      {children}
    </AdvertiseContext.Provider>
  );
}
export default AdvertisersProvider;
