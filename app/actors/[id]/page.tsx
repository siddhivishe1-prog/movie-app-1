export const dynamic = "force-dynamic";
import WatchlistButton from "@/components/WatchlistButton";
import RevalidateButton from "@/components/RevalidateButton";
import LikeButton from "@/components/LikeButton";
import Image from "next/image";
import { actors } from "@/lib/actors";
export const revalidate = 60;
export async function generateStaticParams() {
  return [
    { id: "srk" },
    { id: "salman" }
  ];
}
export default async function ActorPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const actor = actors[id as keyof typeof actors]!;

  if (!actor) {
    return <h1>Actor not found</h1>;
  }

  return (
    <div>
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: actor.name,
      description: actor.bio,
      image: actor.image
    })
  }}
/>
      <h1>{actor.name}</h1>
      <RevalidateButton />
      <Image
  src={actor.image}
  width={200}
  height={250}
  alt={actor.name}
/>
      <p>{actor.bio}</p>

      <h3>Awards</h3>
      <ul>
        {actor.awards.map((award, index) => (
          <li key={index}>{award}</li>
        ))}
      </ul>
      
      <LikeButton />
      <WatchlistButton actorId={id} />
    </div>
  );
}
