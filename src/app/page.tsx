"use client";

import TrailView from "@/components/TrailView";
import { useState } from "react";
import scenes from "../../public/scenes.json";
import Controller from "@/components/Controller";

export default function Home() {
  return (
    <main>
      <Controller />
      <TrailView />
    </main>
  );
}
