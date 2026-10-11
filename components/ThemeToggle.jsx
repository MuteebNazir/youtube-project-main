import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../utils/appSlice";
import { LuSun, LuMoon } from "react-icons/lu";

const ThemeToggle = () => {
  const theme = useSelector((store) => store.youtube.theme) || "light";
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`theme-toggle-btn ${theme}`}
      aria-label="Toggle Theme"
      title={theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
    >
      <div className="theme-icon-wrapper">
        {theme === "light" ? (
          <LuSun className="theme-icon sun" size={20} />
        ) : (
          <LuMoon className="theme-icon moon" size={20} />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
