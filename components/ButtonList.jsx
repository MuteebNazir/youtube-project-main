import { useRef, useState, useEffect } from "react";
import Button from "./Button";
import { useOutletContext } from "react-router";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const ButtonList = () => {
  const list = [
    { name: "All" },
    { name: "Gaming", id: 20 },
    { name: "Songs", id: 10 },
    { name: "Live", id: 34 },
    { name: "Cooking", id: 26 },
    { name: "Sports", id: 17 },
    { name: "React", id: 27 },
    { name: "Coding", id: 28 },
    { name: "JavaScript", id: 29 },
    { name: "Podcast", id: 30 },
    { name: "Music", id: 10 },
    { name: "News", id: 25 },
    { name: "Trending", id: 19 },
    { name: "Android", id: 31 },
    { name: "Programming", id: 32 },
    { name: "PC", id: 33 },
    { name: "ReactNative", id: 35 },
    { name: "Editing", id: 36 },
    { name: "Adobe AfterEffect", id: 50 },
    { name: "Motion Designer", id: 54 },
    { name: "SaaS", id: 84 },
  ];

  const { category, setCategory } = useOutletContext();
  const scrollRef = useRef(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    // check if at extreme left or right
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scroll = (direction) => {
    const scrollAmount = 250;
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    checkScroll(); // initial check
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className="button-scroll-wrapper relative flex items-center">
      {showLeft && (
        <div
          className="scroll-btn-left-container absolute left-0 z-10 bg-white shadow-md cursor-pointer"
          onClick={() => scroll("left")}
        >
          <MdKeyboardArrowLeft size={27} />
        </div>
      )}

      <div
        className="button-list-container flex overflow-x-auto no-scrollbar"
        ref={scrollRef}
      >
        {list.map((items) => (
          <Button
            key={items.name}
            name={items.name}
            isSelected={isSelected(items)}
            onClick={() => setCategory(items)}
          />
        ))}
      </div>

      {showRight && (
        <div
          className="scroll-btn-right-container absolute right-0 z-10 bg-white shadow-md cursor-pointer"
          onClick={() => scroll("right")}
        >
          <MdKeyboardArrowRight size={27} />
        </div>
      )}
    </div>
  );
};

export default ButtonList;
