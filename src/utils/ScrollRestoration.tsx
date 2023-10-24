import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollRestoration = ({ children }) => {
  const { pathname } = useLocation();
  const scrollPositions = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.current[pathname] = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (scrollPositions.current[pathname]) {
      window.scrollTo(0, scrollPositions.current[pathname]);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return children;
};

export default ScrollRestoration;
