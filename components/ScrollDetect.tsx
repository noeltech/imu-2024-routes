import React, { ReactNode, useEffect, useState } from "react";

const ScrollDetector = ({ chidlren }: { children: ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollThreshold = 200; // Adjust this value to your desired scroll position

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollPosition >= scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  return (
    <div>
      {isScrolled ? (
        <div>You have scrolled past {scrollThreshold}px</div>
      ) : (
        <div>Scroll down to see the message</div>
      )}
    </div>
  );
};
