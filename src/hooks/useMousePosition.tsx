import { RefObject, useEffect, useState } from "react";

export default function useMousePosition(containerRef: RefObject<HTMLElement>) {
  const [xy, setXY] = useState({
    x: 0,
    y: 0,
    screenX: 0,
    screenY: 0,
    xRatio: 0,
    screenXRatio: 0,
    scrollWidth: 0,
  });
  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left + containerRef.current.scrollLeft;
      const y = e.clientY - rect.top + containerRef.current.scrollTop;
      const screenX = e.clientX;
      const screenY = e.clientY;
      const screenXRatio = Math.floor((screenX / window.innerWidth) * 100);
      const xRatio = Math.floor(
        (x / (containerRef?.current?.scrollWidth || 0)) * 100
      );
      setXY({
        x,
        y,
        screenX,
        screenY,
        screenXRatio,
        xRatio,
        scrollWidth: containerRef.current.scrollWidth,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    if (containerRef.current) {
      setXY((prevState) => ({
        ...prevState,
        scrollWidth: (containerRef!.current as HTMLElement).scrollWidth,
      }));
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [containerRef]);

  return { xy };
}
