import React, { useEffect } from "react";
import useAdvertises from "../../context/Advertises/context";
import AdvertiseItem from "../AdvertiseItem";
import Loading from "../Loading";
import useInfiniteScroll from "../../hooks/useInfinityScroll";
import "./AdertisersList.scss";

function AdertisersList() {
  const { state, dispatch } = useAdvertises();
  const { data, index, loading } = state;
  function fetchNewData() {
    dispatch({ type: "ADD_DATA" });
  }
  useEffect(() => {
    console.log("loading is changedddd", loading);
  }, [loading]);
  useInfiniteScroll(fetchNewData, 70);
  const titles = [
    "مقدار جدید",
    "مقدار قدیمی",
    "تاریخ",
    "نام آگهی",
    "فیلد",
    "نام تغییردهنده",
    "مورد علاقه",
  ];
  return (
    <div className="ads-list">
      <table id="rwd-table">
        <thead>
          <tr>
            {titles.map((title) => (
              <th>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            !loading &&
            data
              .slice(0, index * 30)
              .map((item) => <AdvertiseItem key={item.id} data={item} />)}
        </tbody>
      </table>
      {loading && <Loading />}
      {/* <Loading /> */}
    </div>
  );
}
export default AdertisersList;
