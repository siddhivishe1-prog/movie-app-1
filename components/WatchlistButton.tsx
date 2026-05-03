"use client";

import { useWatchlistStore } from "../store/watchlistStore";
import { validateWatchlistId } from "@/lib/watchlistSchema";

interface WatchlistButtonProps {
  actorId: string;
}

export default function WatchlistButton({ actorId }: WatchlistButtonProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();

const isInWatchlist = watchlist.includes(actorId);

const handleClick = () => {
  try {
    validateWatchlistId(actorId); // 🔍 validation

    if (isInWatchlist) {
      removeFromWatchlist(actorId);
    } else {
      addToWatchlist(actorId);
    }

  } catch (error) {
    console.error("Invalid Actor ID", error);
  }
};
  return (
    <button onClick={handleClick}>
  {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
</button>
  );
}