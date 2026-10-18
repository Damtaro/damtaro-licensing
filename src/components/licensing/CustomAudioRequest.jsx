import { useRef, useState } from 'react';
import tracks from '../../data/tracks';
import { sendContactRequest } from '../../services/contactService';
import { createCustomRequestBody, isSafeReferenceUrl, isCustomFieldRelevant } from '../../utils/customRequest';

const fieldStyle = 'mt-2 min-h-11 w-full rounded-lg border border-white/15 bg-[#151515] p-3 text-base text-white focus:border-orange-400';
const requestTypes = ['Isolated Sound', 'Custom Edit', 'Custom Composition', 'Other'];
const intendedUses = ['Creator', 'Business', 'Advertising', 'Film', 'TV', 'Game', 'Other'];
const inputs = [
  { name: 'name', label: 'Name', required: true, maxLength: 120, autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, maxLength: 254, autoComplete: 'email' },
  { name: 'sound', label: 'Instrument or sound (optional)', maxLength: 250, placeholder: 'Lead synth, drums, vocals...' },
  { name: 'timecode', label: 'Relevant timecode (optional)', maxLength: 100, placeholder: '00:45–01:10' },
  { name: 'distribution', label: 'Territory and distribution (optional)', maxLength: 500, placeholder: 'Worldwide, social media' },
  { name: 'deadline', label: 'Deadline (optional)', type: 'date' },
  { name: 'reference_url', label: 'Reference URL (optional)', type: 'url', maxLength: 2000, placeholder: 'https://...' },
];

export default function CustomAudioRequest({ track = null, onReadPrivacy }) {
  const [asset, setAsset] = useState(track ? String(track.id) : '');
  const [requestType, setRequestType] = useState('Custom Edit');
  const [status, setStatus] = useState('idle');
  const inFlight = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    for (const field of form.elements) {
      if (field.required && typeof field.value === 'string' && !field.value.trim()) field.setCustomValidity('Please fill out this field.');
    }
    const reference = form.elements.reference_url;
    if (!isSafeReferenceUrl(reference.value)) reference.setCustomValidity('Enter an HTTP or HTTPS URL without embedded credentials.');
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form));
    if (values._gotcha) { setStatus('error'); return; }
    const selectedTrack = tracks.find(item => String(item.id) === asset);
    const body = createCustomRequestBody(values, selectedTrack);
    inFlight.current = true;
    setStatus('submitting');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      await sendContactRequest(body, controller.signal);
      form.reset();
      setStatus('success');
    } catch { setStatus('error'); }
    finally { window.clearTimeout(timeout); inFlight.current = false; }
  }

  if (status === 'success') return <div role="status" className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6 text-zinc-200"><h2 className="text-2xl text-white">Request received! 🎵</h2><p className="mt-4 leading-7">Thanks for reaching out to DAMTARO. We'll review your project and contact you if we can help.</p><p className="mt-3 text-sm leading-6">A request is not a purchase, contract or license.</p><button type="button" onClick={() => setStatus('idle')} className="mt-5 min-h-11 text-orange-400 underline">Send another request</button></div>;

  return <form aria-label="Custom Audio Request" onSubmit={handleSubmit} onInput={event => { event.target.setCustomValidity?.(''); if (!inFlight.current) setStatus('idle'); }} className="rounded-2xl border border-white/10 bg-[#121212] p-5 sm:p-7">
    <fieldset disabled={status === 'submitting'} className="min-w-0">
      <legend className="sr-only">Adaptation request details</legend>
      <input type="text" name="_gotcha" aria-hidden="true" tabIndex={-1} autoComplete="off" className="hidden" />
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm text-zinc-300">Request type<select name="request_type" required value={requestType} onChange={event => setRequestType(event.target.value)} className={fieldStyle}>{requestTypes.map(value => <option key={value}>{value}</option>)}</select></label>
        <label className="text-sm text-zinc-300">Track / asset reference<select name="asset" required value={asset === 'new' && requestType !== 'Custom Composition' ? '' : asset} onChange={event => setAsset(event.target.value)} className={fieldStyle}><option value="">Select a track or reference</option>{tracks.map(item => <option key={item.id} value={item.id}>{item.title} — ID {item.id}</option>)}<option value="reference">Another asset reference</option>{requestType === 'Custom Composition' && <option value="new">No existing track — Original composition</option>}</select></label>
        <label hidden={asset !== 'reference'} className="text-sm text-zinc-300 md:col-span-2">Asset reference<input name="asset_reference" disabled={asset !== 'reference'} required={asset === 'reference'} maxLength={200} className={fieldStyle} /></label>
        {inputs.map(({ label, ...input }) => {
          const relevant = isCustomFieldRelevant(requestType, input.name);
          return <label key={input.name} hidden={!relevant} className="text-sm text-zinc-300">{label}<input type="text" {...input} disabled={!relevant} className={fieldStyle} /></label>;
        })}
        <label className="text-sm text-zinc-300">Intended use<select name="intended_use" required defaultValue="" className={fieldStyle}><option value="">Select intended use</option>{intendedUses.map(value => <option key={value}>{value}</option>)}</select></label>
        <label className="text-sm text-zinc-300 md:col-span-2">Project description<textarea name="description" rows={4} placeholder="Tell us about your project and the audio you need..." required maxLength={5000} className={fieldStyle} /></label>
      </div>
      <p className="mt-6 text-sm leading-6 text-zinc-400">Your name, email and request details will be sent to DAMTARO through Formspree to discuss your project. Do not include passwords, payment information or private download links. Read our <button type="button" onClick={onReadPrivacy} className="min-h-11 text-orange-400 underline">Privacy Policy</button>.</p>
      <p className="mt-2 text-sm leading-6 text-zinc-400">A request is not a purchase, contract or license. Scope, feasibility and any pricing require a separate review and agreement.</p>
      <button type="submit" className="mt-6 min-h-12 w-full rounded-xl bg-orange-500 px-5 py-3 font-bold text-black disabled:opacity-50">{status === 'submitting' ? 'Sending…' : status === 'error' ? 'Retry request' : 'Submit request'}</button>
    </fieldset>
    <p role="status" aria-live="polite" className="mt-3 text-sm leading-6 text-zinc-200">{status === 'error' ? 'We could not send your request. Your entries are preserved. Please try again.' : status === 'submitting' ? 'Sending your request…' : ''}</p>
  </form>;
}
