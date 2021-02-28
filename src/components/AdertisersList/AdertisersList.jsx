import React from "react";
import useAdvertises from "../../context/Advertises/context";
import useLoading from "../../context/Loading/context";
import AdvertiseItem from "../AdvertiseItem";
import useInfiniteScroll from "../../hooks/useInfinityScroll";
import "./AdertisersList.scss";
function AdertisersList() {
  const { state, dispatch } = useAdvertises();
  const { data, index } = state;
  const { loading } = useLoading();
  function fetchNewData() {
    dispatch({ type: "ADD_DATA" });
  }
  useInfiniteScroll(fetchNewData, 70);
  const titles = [
    "مقدار جدید",
    "مقدار قدیمی",
    "تاریخ",
    "نام آگهی",
    "فیلد",
    "نام تغییردهنده",
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
            data
              .slice(0, index * 30)
              .map((item) => <AdvertiseItem key={item.id} data={item} />)}
        </tbody>
      </table>
    </div>
  );
}
export default AdertisersList;
