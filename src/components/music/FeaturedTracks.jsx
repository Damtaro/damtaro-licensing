import Container from "../ui/Container";
import MusicCard from "../music/MusicCard";

export default function FeaturedTracks({ tracks, onLicense, onViewTrack }) {
  return (
    <section id="catalog" aria-label="Track catalog" className="scroll-mt-24">

      <Container>

        {tracks.length > 0 ? <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {tracks.map((track, index) => (
            <MusicCard
              key={track.id}
              track={track}
              eagerArtwork={index < 4}
              onLicense={onLicense}
              onViewTrack={onViewTrack}
            />
          ))}

        </div> : <div className="rounded-3xl border border-zinc-800 bg-zinc-950 px-6 py-16 text-center"><h3 className="text-xl font-bold text-white">No tracks found</h3><p className="mt-3 text-zinc-400">Try a different search or filter.</p></div>}

      </Container>

    </section>
  );
}
