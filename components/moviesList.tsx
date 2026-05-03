"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies, getMovie } from "@/lib/movies";
import { useRouter } from "next/navigation";

export default function MoviesList() {

const router = useRouter();
const queryClient = useQueryClient();

const loadMoreRef = useRef<HTMLDivElement | null>(null);


  const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  error, 
} = useInfiniteQuery({
  queryKey: ["movies"],
  queryFn: ({ pageParam = 1 }) => getMovies(pageParam),
  initialPageParam: 1,

  retry: 3,
  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),

  staleTime: 1000 * 60 * 5, 
gcTime: 1000 * 60 * 10,   
refetchOnWindowFocus: false, 
refetchOnReconnect: true,    

  getNextPageParam: (lastPage) => {
    if (lastPage.page < lastPage.total_pages) {
      return lastPage.page + 1;
    }
    return undefined;
  },
});
useEffect(() => {
  if (!loadMoreRef.current) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  });

  observer.observe(loadMoreRef.current);

  return () => observer.disconnect();
}, [hasNextPage, fetchNextPage]);
  
  if (isLoading) {
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "20px",
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              height: "250px",
              background: "#333",
              borderRadius: "10px",
              animation: "pulse 1.5s infinite",
            }}
          />
        ))}
      </div>
    </div>
  );
}
 if (error) {
  if (!data || data.pages.length === 0) {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>No movies found 🎬</h2>
    </div>
  );
}
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <p>Something went wrong 😢</p>

      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Retry
      </button>
    </div>
  );
}

  const handlePrefetch = (id: number) => {
  queryClient.prefetchQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(String(id)),
  });
};

  return (
  <div style={{ padding: "20px" }}>
    
    {/* Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "24px",
      }}
    >
    {isFetchingNextPage && (
  <p style={{ textAlign: "center", marginTop: "10px" }}>
    Loading more movies...
  </p>
)}
      <div ref={loadMoreRef} style={{ height: "50px" }} />
      {data?.pages.map((page) =>
        page.results.map((movie: any) => (
          <div
  key={movie.id}
  onClick={() => router.push(`/movies/${movie.id}`)}
  onMouseEnter={(e) => {
    handlePrefetch(movie.id);
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
  style={{
    background: "#111",
    padding: "10px",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  }}
>
            {/* Poster */}
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  transition: "transform 0.2s ease",
                }}
              />
            )}

            {/* Title */}
            <h4 style={{ marginTop: "10px" }}>{movie.title}</h4>

            {/* Rating */}
            <p>⭐ {movie.vote_average}</p>
          </div>
        ))
      )}
    </div>

    {/* Load More Button */}
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        style={{ padding: "10px 20px", borderRadius: "8px" }}
      >
        {isFetchingNextPage
          ? "Loading..."
          : hasNextPage
          ? "Load More"
          : "No more movies"}
      </button>
    </div>
  </div>
);
}