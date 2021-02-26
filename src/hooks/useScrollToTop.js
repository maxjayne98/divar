import { useEffect } from "react";

const ScrollToTopControlller = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};
export default ScrollToTopControlller;
