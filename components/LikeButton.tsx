"use client";

import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <div style={{ border: "2px solid red", padding: "10px" }}>
      <h2>LIKE BUTTON COMPONENT</h2>
      <button onClick={() => setLikes(likes + 1)}>
        ❤️ Like
      </button>
      <p>Total Likes: {likes}</p>
    </div>
  );
}