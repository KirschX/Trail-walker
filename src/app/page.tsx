"use client";

import TrailView from "@/components/TrailView";
import { useRef } from "react";
import Controller from "@/components/Controller";

export default function Home() {
  let scrollContainerRef = useRef<HTMLDivElement | null>(null);
  return (
    <main
      ref={scrollContainerRef}
      className=" h-[100vh] overflow-x-scroll overflow-y-hidden transition-all duration-1000"
    >
      <Controller scrollContainerRef={scrollContainerRef} />
      <TrailView scrollContainerRef={scrollContainerRef} />
    </main>
  );
}
