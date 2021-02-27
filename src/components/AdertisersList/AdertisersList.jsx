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
  }
  useInfiniteScroll(fetchNewData, 70);
  return (
    <div>
      {loading
        ? "dar hale bargozari"
        : data &&
          data
            .slice(0, index * 30)
            .map((item) => <AdvertiseItem key={item.id} data={item} />)}
    </div>
  );
}
export default AdertisersList;
