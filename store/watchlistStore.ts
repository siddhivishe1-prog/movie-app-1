import { create } from "zustand";
import { persist } from "zustand/middleware";

type WatchlistStore = {
  watchlist: string[];
  addToWatchlist: (id: string) => void;
  removeFromWatchlist: (id: string) => void;
};

let channel: BroadcastChannel | null = null;

if (typeof window !== "undefined") {
  channel = new BroadcastChannel("watchlist-channel");
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set) => ({
      watchlist: [],

      addToWatchlist: (id) =>
        set((state) => {
          const updated = [...state.watchlist, id];
          channel?.postMessage("updated");
          return { watchlist: updated };
        }),

      removeFromWatchlist: (id) =>
        set((state) => {
          const updated = state.watchlist.filter((item) => item !== id);
          channel?.postMessage("updated");
          return { watchlist: updated };
        }),
    }),
    {
      name: "watchlist-storage", // <-- persist options इथे द्याव्यात
    }
  )
);

if (channel) {
  channel.onmessage = () => {
    window.location.reload();
  };
}