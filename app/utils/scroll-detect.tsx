import { useState, useEffect, useRef } from "react";

export const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

export const ScrollableDiv = ({ children, id, onVisible }) => {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.3, // Adjust this value to change the visibility threshold
  });

  useEffect(() => {
    if (isVisible) {
      console.log(id);
      onVisible && onVisible(id);
    }
  }, [isVisible, id, onVisible]);
  return (
    <div ref={containerRef} className="h-screen">
      {children}
    </div>
  );
};
