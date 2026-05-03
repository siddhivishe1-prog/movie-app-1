"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Something went wrong 😢</h2>

      <p style={{ marginTop: "10px" }}>
        {error.message}
      </p>

      <button
        onClick={() => reset()}
        style={{
          marginTop: "15px",
          padding: "10px 16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}