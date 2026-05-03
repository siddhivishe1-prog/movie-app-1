"use client";

export default function RevalidateButton() {
  const handleClick = async () => {
    await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: "/actors" }),
    });

    alert("Revalidated successfully");
  };

  return (
    <button onClick={handleClick}>
      Revalidate Actors Page
    </button>
  );
}