import Container from "../ui/Container";
import MusicCard from "../music/MusicCard";

export default function FeaturedTracks({ tracks, onLicense, onViewTrack }) {
  return (
    <section id="catalog" className="scroll-mt-24 py-20">

      <Container>

        <div className="mb-12 text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
            Featured Catalog
          </p>

          <h2 className="text-4xl font-bold text-white">
            Discover Music
          </h2>

          <p className="mt-4 text-lg text-zinc-400">
            Explore our curated collection of premium Bass Music.
          </p>

        </div>

        {tracks.length > 0 ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {tracks.map((track) => (
            <MusicCard
              key={track.id}
              track={track}
              onLicense={onLicense}
              onViewTrack={onViewTrack}
            />
          ))}

        </div> : <div className="rounded-3xl border border-zinc-800 bg-zinc-950 px-6 py-16 text-center"><h3 className="text-xl font-bold text-white">No tracks found</h3><p className="mt-3 text-zinc-400">Try a different search or filter.</p></div>}

      </Container>

    </section>
  );
}
