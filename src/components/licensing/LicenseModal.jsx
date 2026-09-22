import { formatLicensePrice, getDisplayCurrency } from "../../utils/licensePriceDisplay";
import { useEffect, useRef } from "react";

import licenses from "../../data/licenses";
import Button from "../ui/Button";
import LegalAcceptance from "./LegalAcceptance";

export default function LicenseModal({
  open,
  onClose,
  track,
  onAddToCart,
  onNavigate,
  selectedCurrency,
  termsAccepted,
  onAcceptanceChange,
  onReadLegal,
}) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialogRef.current?.querySelector("button")?.focus({ preventScroll: true });

    function handleKey(event) {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "Tab") {
        const controls = [...dialogRef.current.querySelectorAll("button:not(:disabled), input:not(:disabled)")];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  if (!open) return null;

  function handleAddToCart(license) {
    if (!termsAccepted) return;
    onAddToCart({
      license,
      track,
    });
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
    >
      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        role="dialog" aria-modal="true" aria-label="Licensing options"
        ref={dialogRef}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close licensing options"
          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 transition hover:bg-orange-500 hover:text-white"
        >
          &times;
        </button>

        <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain p-4 pt-16 sm:p-6">
          {track ? (
            <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5 sm:pr-12">
              <img
                src={track.cover}
                alt={track.title}
                className="h-24 w-24 shrink-0 rounded-2xl border border-zinc-800 object-cover"
              />

              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-orange-500">
                  Licensing
                </p>

                <h2 className="mt-1 text-3xl sm:text-4xl font-black text-white">
                  {track.title}
                </h2>

                <p className="mt-2 text-zinc-400">
                  {track.genre} &bull; {track.bpm} BPM
                  &bull; {track.duration}
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-6 sm:pr-12">
              <p className="text-xs uppercase tracking-[0.35em] text-orange-500">
                Licensing
              </p>

              <h2 className="mt-1 text-3xl sm:text-4xl font-black text-white">
                Choose Your License
              </h2>
            </div>
          )}

          <div className="mb-5 rounded-xl border border-zinc-800 p-3">
            <LegalAcceptance checked={termsAccepted} onChange={onAcceptanceChange} onReadLegal={onReadLegal} />
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {licenses.map((license) => (
              <LicenseOption
                key={license.id}
                license={license}
                selectedCurrency={selectedCurrency}
                variant={license.type === "business" ? "secondary" : "primary"}
                onSelect={() => handleAddToCart(license)}
                disabled={!termsAccepted}
              />
            ))}
          </div>

          <div className="mt-5 border-t border-zinc-800 pt-5">
            <h3 className="text-base font-semibold text-white">Need something beyond Business?</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Film, TV, radio, games, apps, software, broadcast, large campaigns,
              exclusive rights and other special uses require custom licensing.
            </p>
            <Button variant="secondary" className="mt-3 min-h-11" onClick={() => onNavigate("contact")}>
              Contact for Custom Licensing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LicenseOption({ license, selectedCurrency, variant = "primary", onSelect, disabled }) {
  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-2xl">{license.icon}</span>
        <h3 className="text-xl font-bold text-white">{license.title}</h3>
      </div>
      <p className="mt-3 text-4xl font-black text-white">
        {formatLicensePrice(license.price, selectedCurrency)} <span className="text-xs font-normal text-zinc-400">{getDisplayCurrency(selectedCurrency).code} / track</span>
      </p>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{license.description}</p>
      <ul className="mt-4 space-y-1.5">
        {license.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm leading-5 text-zinc-300">
            <span aria-hidden="true" className="text-orange-500">&#10003;</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-5 text-zinc-400">{license.boundary}</p>
      <div className="mt-auto pt-4">
        <Button variant={variant} disabled={disabled} className="min-h-11 w-full disabled:cursor-not-allowed disabled:opacity-50" onClick={onSelect}>{license.button}</Button>
      </div>
    </article>
  );
}
