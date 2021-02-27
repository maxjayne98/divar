import React from "react";
import useAdvertises from "../../context/Advertises/context";
import useLoading from "../../context/Loading/context";
import AdvertiseItem from "../AdvertiseItem";
import useInfiniteScroll from "../../hooks/useInfinityScroll";

function AdertisersList() {
  const { state, dispatch } = useAdvertises();
  const { data, index } = state;
  const { loading } = useLoading();
  function fetchNewData() {
    dispatch({ type: "ADD_DATA" });
    console.log("fetchNewData is fired");
  }
  console.log(data.length);
  useInfiniteScroll(fetchNewData, 70);
  console.log("thisiiisisis is loadiidididing ", loading);
  return (
    <div>
      {loading
        ? "dar hale bargozari"
        : data
            .slice(0, index * 30)
            .map((item) => <AdvertiseItem key={item.id} data={item} />)}
    </div>
  );
}
export default AdertisersList;
