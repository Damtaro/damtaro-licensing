import Container from '../components/ui/Container';
import CustomAudioRequest from '../components/licensing/CustomAudioRequest';
export default function CustomAudio({ track, onReadPrivacy, onBackToTrack }) {
  return <section className="pb-20 pt-28 text-white sm:pt-32"><Container><div className="mx-auto max-w-4xl">{track && <button type="button" onClick={onBackToTrack} className="mb-5 min-h-11 text-orange-400 underline">Back to {track.title}</button>}<p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">Custom Licensing</p><h1 className="mt-4 font-display text-4xl sm:text-5xl">Request Custom Audio 🎵</h1><p className="my-6 max-w-2xl leading-7 text-zinc-400">Tell us what you're creating and what you need. DAMTARO will review your request and explore the possibilities with you.</p><CustomAudioRequest track={track} onReadPrivacy={onReadPrivacy} /></div></Container></section>;
}
