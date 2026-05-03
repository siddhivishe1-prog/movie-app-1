import MoviesList from "../components/moviesList";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <div>
      <ThemeToggle />
      <MoviesList />
    </div>
  );
}
