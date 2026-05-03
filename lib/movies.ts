
// --- TMDB API CONFIG ---
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// --- Token Bucket (rate limit) ---
let tokens = 5;
const MAX_TOKENS = 5;
const REFILL_RATE = 1;

setInterval(() => {
  tokens = Math.min(tokens + REFILL_RATE, MAX_TOKENS);
}, 1000);

// --- Core fetch function ---
async function fetchFromTMDB(endpoint: string) {
  while (tokens <= 0) {
    await new Promise((res) => setTimeout(res, 200));
  }

  tokens--;

  const res = await fetch(
    `${BASE_URL}${endpoint}&api_key=${API_KEY}`,
    {
      next: {
        revalidate: 60 * 5,
      },
    }
  );

  if (res.status === 429) {
    throw new Error("Rate limit exceeded");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// --- APIs ---
export function getMovies(page: number = 1) {
  return fetchFromTMDB(`/movie/popular?page=${page}`);
}

export function getMovie(id: string) {
  return fetchFromTMDB(`/movie/${id}?append_to_response=credits`);
}

export function searchMovies(query: string, page: number = 1) {
  return fetchFromTMDB(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
  );
}