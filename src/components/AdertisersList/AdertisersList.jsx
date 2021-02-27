import React from "react";
import useAdvertises from "../../context/Advertises/context";
import AdvertiseItem from "../AdvertiseItem";
import useInfiniteScroll from "../../hooks/useInfinityScroll";

function AdertisersList() {
  const { state, dispatch } = useAdvertises();
  const { data } = state;
  function fetchNewData() {
    dispatch({ type: "ADD_DATA" });
    console.log("fetchNewData is fired");
  }
  console.log(data.length);
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
