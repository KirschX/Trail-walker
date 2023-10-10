import { create } from "zustand";

interface TrackingStore {
  currentLocation: number;
  updateTrackingState: (newState: number) => void;
}

const trackingState = create<TrackingStore>((set) => ({
  currentLocation: 0,

  updateTrackingState: (newState) => {
    if (newState < 0) return;
    set({ currentLocation: newState });
  },
}));

export const useTrackingState = () => trackingState((state) => state);
