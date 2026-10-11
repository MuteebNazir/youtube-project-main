import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { cacheResults } from "../utils/searchSlice";
import ThemeToggle from "./ThemeToggle";


const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    if (!searchQuery) return;
    try {
      const data = await fetch(
        `https://corsproxy.io/?${encodeURIComponent(
          `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchQuery}`
        )}`
      );
      const json = await data.json();
      setSuggestion(json[1]);
      dispatch(cacheResults({ [searchQuery]: json[1] }));
    } catch (error) {
      console.error("Failed to fetch search suggestions:", error);
    }
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <nav className="nav-container">
      {/* LEFT */}
      <div className="nav-left">
        <img
          onClick={() => toggleMenuHandler()}
          className="menu-icon"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwZDBkMGQiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tZW51LWljb24gbHVjaWRlLW1lbnUiPjxwYXRoIGQ9Ik00IDEyaDE2Ii8+PHBhdGggZD0iTTQgMThoMTYiLz48cGF0aCBkPSJNNCA2aDE2Ii8+PC9zdmc+"
        />
        <a href="/">
          <img
            className="logo"
            src="https://supersimple.dev/exercises/youtube/icons/youtube-logo.svg"
            alt="YouTube Logo"
          />
        </a>
      </div>

      {/* MIDDLE */}
      <div className="nav-middle">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestion(true)}
          onBlur={() => setShowSuggestion(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchQuery.trim() !== "") {
              navigate(`/results?search_query=${encodeURIComponent(searchQuery)}`);
            }
          }}
        />

        {showSuggestion && suggestion.length > 0 && (
          <div className="search-container">
            <ul>
              {suggestion.map((s) => (
                <li
                  key={s}
                  onMouseDown={() => {
                    setSearchQuery(s);
                    setShowSuggestion(false);
                    navigate(`/results?search_query=${encodeURIComponent(s)}`);
                  }}
                >
                  <CiSearch
                    color="black"
                    size={20}
                    style={{ marginLeft: 10, marginRight: 10 }}
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => {
            if (searchQuery.trim() !== "") {
              navigate(`/results?search_query=${encodeURIComponent(searchQuery)}`);
            }
          }}
        >
          <img
            className="search-button"
            src="https://img.icons8.com/?size=100&id=132&format=png&color=000000"
          />
        </button>

        <div className="micro-phone-icon-container">
          <img
            className="micro-phone-icon"
            src="https://img.icons8.com/?size=100&id=8LR9OAENZPeS&format=png&color=000000"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        <Link to="/resume">  
          <div className="resume-container"> 
              <button className="resume-btn">Resume</button>
          </div>
        </Link>

        <ThemeToggle />
 
        <div className="create-container">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtcGx1cy1pY29uIGx1Y2lkZS1wbHVzIj48cGF0aCBkPSJNNSAxMmgxNCIvPjxwYXRoIGQ9Ik0xMiA1djE0Ii8+PC9zdmc+" />
          <span> Create</span>
        </div>

        <div className="notification-container">
          <img
            className="notification-icon"
            src="https://img.icons8.com/?size=100&id=ZW2vgTIQ1bkh&format=png&color=000000"
          />
          <div className="notification-count">9+</div>
        </div>

        <img
          className="user-icon"
          src="https://yt3.ggpht.com/ytc/AIdro_k82QyAI4bPkllTGYW1uAh9g2F373PAH3byJC8f1I0FsxpqxMTd2Pi9ZMx0zq4opKmx6Q=s88-c-k-c0x00ffffff-no-rj"
          style={{height:32,width:32,borderRadius:'50%'}}
        />
      </div>
    </nav>
  );
};

export default Header;
