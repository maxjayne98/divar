import React from "react";
import useAdvertises from "../../context/Advertises/context";
import AdvertiseItem from "../AdvertiseItem";
import useInfiniteScroll from "../../hooks/useInfinityScroll";

function AdertisersList() {
  const { state, dispatch } = useAdvertises();
  const { data } = state;
  function fetchNewData() {
    dispatch({ type: "ADD_DATA" });
  }
  useInfiniteScroll(fetchNewData, 70);
  return (
    <div>
      {data.map((item) => (
        <AdvertiseItem key={item.id} data={item} />
      ))}
    </div>
  );
}
export default AdertisersList;
