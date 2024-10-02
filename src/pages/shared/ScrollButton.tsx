import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <div
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-[#42f5f5] text-[#102e47] cursor-pointer shadow-lg hover:bg-[#102e47] hover:text-[#42f5f5] hover:border hover:border-[#42f5f5] transition duration-300"
      >
        <FaArrowUp className="text-xl" />
      </div>
    )
  );
};

export default ScrollButton;