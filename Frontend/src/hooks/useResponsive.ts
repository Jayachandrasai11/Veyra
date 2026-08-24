import { useState, useEffect, useCallback } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

interface ResponsiveState {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1280,
} as const;

function getBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS.desktop) return "desktop";
  if (width >= BREAKPOINTS.tablet) return "tablet";
  return "mobile";
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => {
    if (typeof window === "undefined") {
      return {
        breakpoint: "desktop",
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        width: 1200,
      };
    }
    const width = window.innerWidth;
    const breakpoint = getBreakpoint(width);
    return {
      breakpoint,
      isMobile: breakpoint === "mobile",
      isTablet: breakpoint === "tablet",
      isDesktop: breakpoint === "desktop",
      width,
    };
  });

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const breakpoint = getBreakpoint(width);
    setState({
      breakpoint,
      isMobile: breakpoint === "mobile",
      isTablet: breakpoint === "tablet",
      isDesktop: breakpoint === "desktop",
      width,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return state;
}
