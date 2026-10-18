import { getVerifiedStemDetails } from '../../utils/stemMetadata';

export default function BusinessStemInfo({ track, compact = false }) {
  const details = getVerifiedStemDetails(track);
  if (compact) return <section aria-label="Official Business stems" className="mt-3 text-sm leading-6 text-zinc-400">{details ? <><p>{details.count} official stems:</p><ul className="list-inside list-disc">{details.labels.map(label => <li key={label}>{label}</li>)}</ul></> : <p>Contact DAMTARO for details of the stems supplied for your selected track.</p>}<p>No stem redistribution, resale or standalone musical exploitation.</p></section>;
  return <section aria-label="Official Business stems" className="mt-5 rounded-xl border border-white/10 p-4 text-sm leading-6 text-zinc-300">
    <h3 className="font-semibold text-white">Official stems · Business License</h3>
    <p className="mt-2">Includes the official stems supplied by DAMTARO for the selected track.</p>
    {details ? <><p className="mt-2">{details.count} official stems:</p><ul className="mt-1 list-inside list-disc">{details.labels.map(label => <li key={label}>{label}</li>)}</ul></> : <p className="mt-2 text-zinc-400">Contact DAMTARO for details of the stems supplied for your selected track.</p>}
    <p className="mt-2">Availability and supplied files follow the existing License Terms. Stems are for the licensed project only; no redistribution, resale or standalone musical exploitation.</p>
  </section>;
}
