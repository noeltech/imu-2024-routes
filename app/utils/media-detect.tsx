import { useState, useEffect } from "react";

const useResponsiveScreen = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const currentScreenSize = {
        isMobile: window.innerWidth <= 767,
        isTablet: window.innerWidth >= 768 && window.innerWidth <= 1023,
        isDesktop: window.innerWidth >= 1024,
      };
      setScreenSize(currentScreenSize);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useResponsiveScreen;
