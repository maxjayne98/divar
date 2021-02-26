import React from "react";
import useAdvertises from "../../context/Advertises/context";
import AdvertiseItem from "../AdvertiseItem";

function AdertisersList() {
  const { data } = useAdvertises();
  return (
    <div>
      {data.slice(0, 30).map((item) => (
        <AdvertiseItem key={item.id} data={item} />
      ))}
    </div>
  );
}
export default AdertisersList;
