"use client";

interface ControllerProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export default function Controller({ scrollContainerRef }: ControllerProps) {
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="absolute h-screen w-screen bg-center bg-no-repeat overflow-hidden">
      {/* Left and Right Buttons */}
      <button
        className="absolute top-1/2 left-4 bg-opacity-50 bg-gray-600 text-white p-2 rounded-full z-20"
        onClick={scrollLeft}
      >
        Left
      </button>
      <button
        className="absolute top-1/2 right-4 bg-opacity-50 bg-gray-600 text-white p-2 rounded-full z-20"
        onClick={scrollRight}
      >
        Right
      </button>
    </div>
  );
}
