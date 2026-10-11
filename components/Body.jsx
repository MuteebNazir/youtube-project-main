import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";

const Body = () => {
  const [category, setCategory] = useState(0);
  const location = useLocation();
  const theme = useSelector((store) => store.youtube.theme) || "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const isWatchPage = location.pathname.includes("watch");

  return (
    <div className="body-container">
      <Header />
      {!isWatchPage && <SideBar category={category} setCategory={setCategory} />}
      <Outlet context={{ category, setCategory }} />
    </div>
  );
};

export default Body;
