"use client";

import { useWatchlistStore } from "../../store/watchlistStore";
import { actors } from "../../lib/actors";

export default function WatchlistPage() {
  const { watchlist } = useWatchlistStore();

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>No actors added yet.</p>
      ) : (
        <ul>
          {watchlist.map((id: string) => {
            const actor = actors[id as keyof typeof actors];
            if (!actor) return null;

            return (
              <li key={id}>
                {actor.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}