"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getMovie } from "@/lib/movies";
import { useState, useEffect } from "react";

export default function MoviePage() {
  const params = useParams();
  const id = params.id as string;
  const [reviews, setReviews] = useState<any[]>([]);
const [name, setName] = useState("");
const [comment, setComment] = useState("");
const [editId, setEditId] = useState<number | null>(null);
const [sortType, setSortType] = useState<"latest" | "oldest">("latest");
const handleDelete = (id: number) => {
  const updated = reviews.filter((r) => r.id !== id);
  setReviews(updated);
};
const handleEdit = (review: any) => {
  setName(review.user);
  setComment(review.comment);
  setEditId(review.id);
};
useEffect(() => {
  const stored = localStorage.getItem(`reviews-${id}`);
  if (stored) {
    setReviews(JSON.parse(stored));
  }
}, [id]);

useEffect(() => {
  localStorage.setItem(`reviews-${id}`, JSON.stringify(reviews));
}, [reviews, id]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movie</p>;

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !comment) return;

  if (editId) {
    // update review
    const updated = reviews.map((r) =>
      r.id === editId ? { ...r, user: name, comment: comment } : r
    );
    setReviews(updated);
    setEditId(null);
  } else {
    // add new review
    const newReview = {
      id: Date.now(),
      user: name,
      comment: comment,
    };
    setReviews([...reviews, newReview]);
  }

  setName("");
  setComment("");
};
const sortedReviews = [...reviews].sort((a, b) => {
  if (sortType === "latest") {
    return b.id - a.id; // latest first
  } else {
    return a.id - b.id; // oldest first
  }
});

  return (
  <div
    style={{
      position: "relative",
      minHeight: "100vh",
      color: "white",
    }}
  >
    {/* 🔥 Background */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(8px)",
        opacity: 0.3,
      }}
    />
    <div
  style={{
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)",
  }}
/>

    {/* 🔥 CONTENT */}
    <div style={{ position: "relative", padding: "40px" }}>
      
      
      <div
        style={{
          display: "flex",
          gap: "40px",
          maxWidth: "1000px",
          margin: "0 auto",
          background: "rgba(0,0,0,0.6)",
          padding: "30px",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
        }}
      >
        
        {/* Poster */}
        {data?.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
            style={{
              width: "300px",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          />
        )}

        {/* Details */}
        <div style={{ maxWidth: "500px", lineHeight: "1.6" }}>
          <h1 style={{
  fontSize: "40px",
  fontWeight: "bold",
  marginBottom: "10px"
}}>
  {data?.title}
</h1>

          <p style={{ marginTop: "10px" }}>{data?.overview}</p>

          <p>⭐ Rating: {data?.vote_average}</p>
          <p>📅 Release Date: {data?.release_date}</p>

          {/* Cast */}
          <h3 style={{ marginTop: "20px" }}>🎭 Cast</h3>
          <ul>
            {data?.credits?.cast?.slice(0, 5).map((actor: any) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>

          {/* Reviews */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h3>⭐ Reviews</h3>

            <select
              value={sortType}
              onChange={(e) =>
                setSortType(e.target.value as "latest" | "oldest")
              }
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          {reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            <ul style={{
  background: "rgba(255,255,255,0.05)",
  padding: "10px",
  borderRadius: "10px"
}}>
              {sortedReviews.map((r) => (
                <li key={r.id}>
                  <b>{r.user}:</b> {r.comment}

                  <button onClick={() => handleEdit(r)}>✏️</button>
                  <button onClick={() => handleDelete(r.id)}>❌</button>
                </li>
              ))}
            </ul>
          )}

          {/* Add Review */}
          <h4 style={{ marginTop: "10px" }}>Add Review</h4>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <br />

            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <br />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

    </div>
  </div>
);
}
