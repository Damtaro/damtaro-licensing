import { useEffect } from "react";

import {
  CREATOR_LICENSE_PRICE,
  default as licenses,
} from "../../data/licenses";
import Button from "../ui/Button";

export default function LicenseModal({
  open,
  onClose,
  track,
  onAddToCart,
}) {
  useEffect(() => {
    if (!open) return undefined;

    function handleKey(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  function handleAddToCart(license) {
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

          <div className="grid gap-5 lg:grid-cols-2">
            <LicenseOption
              license={licenses[0]}
              price={`$${CREATOR_LICENSE_PRICE}`}
              subtitle="Starting at"
              payment="One-time payment"
              onSelect={() =>
                handleAddToCart(licenses[0])
              }
            />

            <LicenseOption
              license={licenses[1]}
              price="$149"
              subtitle="Starting from"
              description="Tailored licensing for brands, agencies, games and commercial productions."
              variant="secondary"
              onSelect={() =>
                handleAddToCart(licenses[1])
              }
            />
          </div>

          <div className="mt-6 border-t border-zinc-800 pt-6">
            <div className="space-y-3 text-sm text-zinc-400">
              <LicenseNote>
                <strong className="text-white">
                  One-time payment.
                </strong>{" "}
                No recurring fees or hidden charges.
              </LicenseNote>

              <LicenseNote>
                <strong className="text-white">
                  No attribution required.
                </strong>{" "}
                Use your licensed track without mandatory
                credits.
              </LicenseNote>

              <LicenseNote>
                <strong className="text-white">
                  Lifetime license.
                </strong>{" "}
                Valid forever for the licensed project.
              </LicenseNote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LicenseOption({
  license,
  price,
  subtitle,
  payment,
  description,
  variant = "primary",
  onSelect,
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-center gap-3">
        <span className="text-3xl">
          {license.icon}
        </span>

        <h3 className="text-xl font-bold text-white">
          {license.title}
        </h3>
      </div>

      <p className="mt-4 text-xs uppercase tracking-widest text-orange-500">
        {subtitle}
      </p>

      <h2 className="mt-2 text-5xl font-black text-white">
        {price}
      </h2>

      {payment && (
        <p className="text-zinc-500">
          {payment}
        </p>
      )}

      {description && (
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {description}
        </p>
      )}

      <div className="mt-5 space-y-2">
        {license.features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2"
          >
            <span className="text-orange-500">
              &#10003;
            </span>

            <span className="text-sm text-zinc-300">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button
          variant={variant}
          className="w-full"
          onClick={onSelect}
        >
          {license.button}
        </Button>
      </div>
    </article>
  );
}

function LicenseNote({ children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-orange-500">
        &#10003;
      </span>

      <p>{children}</p>
    </div>
  );
}
