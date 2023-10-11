"use client";

import UpIcon from "../../public/svg/up.svg";
import LeftIcon from "../../public/svg/left.svg";
import RightIcon from "../../public/svg/right.svg";
import isWithinBoundary from "@/helper/isWithinBoundary";

function determineBoundaries(hasMiddle: boolean): Boundaries {
  return hasMiddle
    ? { leftBoundary: 33, middleBoundary: 66, rightBoundary: 90 }
    : { leftBoundary: 50, rightBoundary: 90 };
}

interface Boundaries {
  leftBoundary: number;
  middleBoundary?: number;
  rightBoundary: number;
}

interface DirectionIconProps {
  x: number;
  y: number;
  screenX: number;
  screenY: number;
  screenXRatio: number;
  xRatio: number;
  boundaries: Boundaries;
  hasMiddle: boolean;
  // onClick: () => void;
}

export default function DirectionIcon({
  x,
  y,
  screenX,
  screenY,
  xRatio,
  boundaries,
  hasMiddle,
  screenXRatio,
}: DirectionIconProps) {
  const getDirectionIcon = () => {
    if (isWithinBoundary(xRatio, 3, boundaries.leftBoundary))
      return <LeftIcon />;
    if (
      hasMiddle &&
      isWithinBoundary(
        xRatio,
        boundaries.leftBoundary,
        boundaries.middleBoundary
      )
    )
      return <UpIcon />;
    if (
      isWithinBoundary(
        xRatio,
        boundaries.middleBoundary || boundaries.leftBoundary,
        boundaries.rightBoundary
      )
    )
      return <RightIcon />;
    return null;
  };

  return (
    <div
      className="absolute z-10 bg-gray-600 rounded-full p-4 opacity-70 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        left: screenX,
        top: screenY,
        visibility: isWithinBoundary(screenXRatio, 3, 97)
          ? "visible"
          : "hidden",
      }}
    >
      {getDirectionIcon()}
    </div>
  );
}

// visibility
// screenx가 screen의 3%부터 97%까지만 보이게 하기
