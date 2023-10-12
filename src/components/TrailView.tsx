"use client";

import Image from "next/image";
import { useTrackingState } from "@/store/store";

import DirectionIcon from "./DirectionIcon";

import scenes from "../../public/scenes.json";

import useMousePosition from "@/hooks/useMousePosition";
import isWithinBoundary from "@/helper/isWithinBoundary";
import { useEffect, useState } from "react";

interface ControllerProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export default function TrailView({ scrollContainerRef }: ControllerProps) {
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const { currentLocation, updateTrackingState } = useTrackingState();
  const { xy } = useMousePosition(scrollContainerRef);

  const currentScene = scenes.scenes[currentLocation];
  const hasMiddle = currentScene.hitzones.hasOwnProperty("middle");
  const boundaries = determineBoundaries(hasMiddle);

  const navigateTo = (destination: number) => {
    updateTrackingState(destination);
  };

  const handleClick = () => {
    if (isWithinBoundary(xy.xRatio, 10, boundaries.leftBoundary))
      navigateTo(currentScene.hitzones.left.goto);
    if (
      hasMiddle &&
      currentScene.hitzones.middle &&
      isWithinBoundary(
        xy.xRatio,
        boundaries.leftBoundary,
        boundaries.middleBoundary
      )
    )
      navigateTo(currentScene.hitzones.middle.goto);
    if (
      currentScene.hitzones.right &&
      isWithinBoundary(
        xy.xRatio,
        boundaries.middleBoundary || boundaries.leftBoundary,
        boundaries.rightBoundary
      )
    )
      navigateTo(currentScene.hitzones.right.goto);

    return null;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowHeight(window.innerHeight);
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
      <DirectionIcon
        x={xy.x}
        y={xy.y}
        screenX={xy.screenX}
        screenY={xy.screenY}
        xRatio={xy.xRatio}
        boundaries={boundaries}
        hasMiddle={hasMiddle}
        screenXRatio={xy.screenXRatio}
      />

      <div
        // onClick={handleClick}
        className=" h-full aspect-[6.565/1] min-w-full relative"
      >
        {Object.entries(currentScene.hitzones).map(([key, value]) => {
          const { pos } = value;
          return (
            <div key={key}>
              <div
                onClick={() => navigateTo(value.goto)}
                className="absolute bg-red-500 z-20 p-2 rounded-full"
                style={{
                  left: (pos[0] * xy.scrollWidth) / 100,
                  top: (pos[1] * windowHeight) / 100,
                }}
              >
                Go
              </div>
            </div>
          );
        })}
        <Image
          className=" object-cover"
          fill
          src={currentScene.url}
          alt="trail scene"
        ></Image>
      </div>
    </>
  );
}

function determineBoundaries(hasMiddle: boolean) {
  if (hasMiddle)
    return { leftBoundary: 33, middleBoundary: 66, rightBoundary: 97 };
  return { leftBoundary: 50, rightBoundary: 97 };
}
