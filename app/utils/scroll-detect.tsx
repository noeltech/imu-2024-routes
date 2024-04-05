import { useState, useEffect, useRef, ReactNode } from "react";
import { RaceViews } from "../igbaras-ultra-routes/ImuRoutesMap";

export const useElementOnScreen = (
  options: IntersectionObserverInit | undefined
) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const refContainer = containerRef.current;
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (refContainer) observer.unobserve(refContainer);
    };
  }, [options]);

  return { containerRef, isVisible };
};

type ScrollableDivsProps = {
  children: ReactNode;
  id: RaceViews;
  onVisible: (id: RaceViews) => void;
};
export const ScrollableDiv = ({
  children,
  id,
  onVisible,
}: ScrollableDivsProps) => {
  const { isVisible, containerRef } = useElementOnScreen({
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
