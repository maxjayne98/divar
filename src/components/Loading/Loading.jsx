import React, { useEffect } from "react";
import "./Loading.scss";

function Loading() {
  useEffect(() => {
    console.log("loading is mounted");
  });
  return <div className="loader">Loading...</div>;
}
export default Loading;
