import { useEffect, useRef, useState } from "react";
import licenses from "../../data/licenses";
import { formatLicensePrice, getDisplayCurrency } from "../../utils/licensePriceDisplay";
import { licensePresentation } from "../../utils/licensePresentation";
import Button from "../ui/Button";
import LegalAcceptance from "./LegalAcceptance";
import BusinessStemInfo from "./BusinessStemInfo";

export default function LicenseModal({ open, onClose, track, onAddToCart, onNavigate, selectedCurrency, termsAccepted, onAcceptanceChange, onReadLegal, onRequestCustom }) {
  const [selectedLicense, setSelectedLicense] = useState(null);
  const dialogRef = useRef(null);
  const summaryRef = useRef(null);
  const scrollRef = useRef(null);
  const choiceRef = useRef(null);

  function close() {
    setSelectedLicense(null);
    onAcceptanceChange(false);
    onClose();
  }

  useEffect(() => {
    if (!open) return undefined;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    (summaryRef.current || dialogRef.current?.querySelector("button"))?.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";
    function handleKey(event) {
      if (event.key === "Escape") {
        setSelectedLicense(null);
        onAcceptanceChange(false);
        onClose();
      }
      if (event.key === "Tab") {
        const controls = [...dialogRef.current.querySelectorAll("button:not(:disabled), input:not(:disabled)")];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === summaryRef.current)) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open, onClose, onAcceptanceChange]);

  if (!open) return null;
  const presentation = selectedLicense && licensePresentation[selectedLicense.type];
  const price = license => `${formatLicensePrice(license.price, selectedCurrency)} ${getDisplayCurrency(selectedCurrency).code}`;

  function choose(license) {
    onAcceptanceChange(false);
    setSelectedLicense(license);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: 0 });
      summaryRef.current?.focus({ preventScroll: true });
    });
  }

  function changeLicense() {
    onAcceptanceChange(false);
    setSelectedLicense(null);
    requestAnimationFrame(() => choiceRef.current?.focus({ preventScroll: true }));
  }

  return <div onClick={close} className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-4">
    <div onClick={event => event.stopPropagation()} ref={dialogRef} role="dialog" aria-modal="true" aria-label="Licensing options" className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl sm:max-h-[calc(100dvh-2rem)]">
      <button type="button" onClick={close} aria-label="Close licensing options" className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-2xl text-zinc-300 hover:text-orange-400">&times;</button>
        <header className="shrink-0 p-5 pr-16 sm:p-6 sm:pr-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">License {track?.title || "your track"}</h2>
          <p className="mt-2 text-base text-zinc-400">Choose how you'll use this track.</p>
        </header>
      <div ref={scrollRef} className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-5 sm:px-6 sm:pb-6">
        {selectedLicense ? <section aria-labelledby="license-summary-title" className="rounded-xl border border-white/15 bg-zinc-900 p-4 sm:p-5">
          <h3 id="license-summary-title" ref={summaryRef} tabIndex={-1} className="text-xl font-bold text-white">{selectedLicense.title} summary</h3>
          <dl className="mt-4 grid gap-3 text-sm leading-6 text-zinc-300 sm:grid-cols-2">
            <div><dt className="text-zinc-400">Track</dt><dd className="font-semibold text-white">{track?.title || "Selected track"}</dd></div>
            <div><dt className="text-zinc-400">Price · one-time purchase</dt><dd className="text-2xl font-bold text-white">{price(selectedLicense)} <span className="text-sm font-normal">/ track</span></dd></div>
            <div className="sm:col-span-2"><dt className="text-zinc-400">Authorized use</dt><dd>{presentation.description}</dd></div>
            <div className="sm:col-span-2"><dt className="text-zinc-400">Essential limit</dt><dd>{presentation.limit}</dd></div>
            <div className="sm:col-span-2"><dt className="text-zinc-400">Included files</dt><dd>{presentation.files}</dd></div>
          </dl>
          {selectedLicense.type === "business" && <BusinessStemInfo track={track} compact />}
          <div className="mt-4 border-t border-white/10 pt-3"><LegalAcceptance checked={termsAccepted} onChange={onAcceptanceChange} onReadLegal={onReadLegal} /></div>
          {!track && <p className="mt-3 text-sm text-zinc-300">Select a track in Browse Music before starting checkout.</p>}
          <Button variant="purchase" disabled={!termsAccepted || !track} onClick={() => { if (termsAccepted && track) onAddToCart({ license: selectedLicense, track }); }} className="mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50">Continue to Secure Checkout</Button>
          {!track && <button type="button" onClick={() => onNavigate("music")} className="mt-2 min-h-11 w-full text-orange-400 underline">Browse Music</button>}
          <button type="button" onClick={changeLicense} className="mt-2 min-h-11 text-sm text-orange-400 underline">Change license</button>
        </section> : <div className="grid gap-4 md:grid-cols-2">
          {licenses.map((license, index) => {
            const copy = licensePresentation[license.type];
            return <article key={license.id} className="flex min-w-0 flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
              <h3 className="text-lg font-bold uppercase text-white">{license.title}</h3>
              <p className="mt-3 text-3xl font-black text-white">{formatLicensePrice(license.price, selectedCurrency)} <span className="text-sm font-normal text-zinc-400">{getDisplayCurrency(selectedCurrency).code} / track</span></p>
              <p className="mt-1 text-sm text-zinc-400">One-time purchase</p>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{copy.description}</p>
              <ul className="mt-3 space-y-1 text-sm leading-6 text-zinc-200">{copy.benefits.map(benefit => <li key={benefit} className="flex gap-2"><span aria-hidden="true" className="text-orange-400">✓</span>{benefit}</li>)}</ul>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{copy.note}</p>
              <div className="mt-auto pt-4"><Button variant="purchase" ref={index === 0 ? choiceRef : undefined} onClick={() => choose(license)} className="w-full">{`Choose ${license.type === "creator" ? "Creator" : "Business"}`}</Button></div>
            </article>;
          })}
        </div>}
        <aside aria-label="Custom options" className="mt-5 border-t border-zinc-800 pt-4 text-sm leading-6 text-zinc-400">
          <p>Film, TV, radio, broadcast, games, apps, software, large campaigns and exclusivity require Custom Licensing.</p>
          <div className="mt-2 grid gap-x-6 md:grid-cols-2">
            <div><button type="button" onClick={() => onNavigate("contact")} className="min-h-11 text-orange-400 underline">Contact for Custom Licensing</button><p>Special permissions beyond standard licenses.</p></div>
            {onRequestCustom && <div><button type="button" onClick={() => onRequestCustom(track)} className="min-h-11 text-orange-400 underline">Request Custom Audio 🎵</button><p>Isolated sounds, custom edits and compositions.</p></div>}
          </div>
        </aside>
      </div>
    </div>
  </div>;
}
