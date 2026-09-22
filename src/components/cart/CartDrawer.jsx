import { formatLicensePrice, getDisplayCurrency } from "../../utils/licensePriceDisplay";
import { useEffect, useMemo, useState } from "react";
import { getLicensePrice } from "../../services/orderService";

export default function CartDrawer({
  selectedCurrency,
  open,
  onClose,
  items = [],
  onRemoveItem,
  onContinueShopping,
  onProceedToCheckout,
  lastAddedItem = null,
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsMounted(true);

      const frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    setIsVisible(false);

    const timeout = window.setTimeout(() => {
      setIsMounted(false);
    }, 600);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [open]);

  useEffect(() => {
    if (!isMounted) return undefined;

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
  }, [isMounted, onClose]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + getLicensePrice(item.license), 0);
  }, [items]);

  const totalItems = items.length;

  if (!isMounted) return null;

  function formatPrice(amount) {
    return `${getDisplayCurrency(selectedCurrency).code} ${formatLicensePrice(amount, selectedCurrency)}`;
  }

  return (
    <div
      className={`fixed inset-0 z-[1000] overflow-hidden ${
        isVisible
          ? "pointer-events-auto"
          : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className={`absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm transition-[opacity,backdrop-filter] ${
          isVisible
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 backdrop-blur-0"
        }`}
        style={{
          transitionDuration: "550ms",
          transitionTimingFunction:
            "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`cart-panel absolute right-0 top-0 flex h-dvh w-full max-w-md flex-col overflow-y-auto overscroll-contain sm:overflow-hidden border-l border-white/10 bg-[#0d0d0d] shadow-2xl transition-[transform,opacity] ${
          isVisible
            ? "translate-x-0 opacity-100"
            : "translate-x-[105%] opacity-0"
        }`}
        style={{
          transitionDuration: "600ms",
          transitionTimingFunction:
            "cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform, opacity",
        }}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500">
              Licensing
            </p>

            <h2
              id="cart-title"
              className="mt-1 font-display text-2xl font-medium text-white"
            >
              Your Cart
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-11 w-11 items-center justify-center border border-white/10 text-xl text-white/50 transition-colors duration-200 hover:border-orange-500 hover:text-orange-400"
          >
            &times;
          </button>
        </div>

        {/* Added Confirmation */}
        <div
          className={`shrink-0 overflow-hidden transition-[max-height,opacity,transform] ${
            lastAddedItem
              ? "max-h-32 translate-y-0 opacity-100"
              : "max-h-0 -translate-y-2 opacity-0"
          }`}
          style={{
            transitionDuration: "450ms",
            transitionTimingFunction:
              "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="border-b border-orange-500/20 bg-orange-500/5 px-6 py-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-[11px] font-bold text-black">
                ✓
              </span>

              <div>
                <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-orange-400">
                  Added to cart
                </p>

                <p className="mt-1 font-sans text-sm text-white/70">
                  {lastAddedItem?.track?.title ||
                    "Catalog License"}
                  {" · "}
                  {lastAddedItem?.license?.title}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="cart-content shrink-0 flex-1 sm:min-h-0 sm:shrink sm:overflow-y-auto">
          {items.length === 0 ? (
            <EmptyCart
              onContinueShopping={onContinueShopping}
            />
          ) : (
            <div className="px-6 py-6">
              <div className="mb-6 flex items-center justify-between">
                <p className="font-sans text-xs uppercase tracking-[0.18em] text-white/40">
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "item"
                    : "items"}
                </p>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    selectedCurrency={selectedCurrency}
                    onRemove={() =>
                      onRemoveItem(item.id)
                    }
                  />
                ))}
              </div>


            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 shrink-0 bg-[#0d0d0d] px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                Subtotal
              </span>

              <span className="font-display text-2xl font-medium text-white">
                {formatPrice(subtotal)}
              </span>
            </div>

            <p className="mt-2 font-sans text-[11px] leading-5 text-white/30">
              Fixed nominal prices shown in {getDisplayCurrency(selectedCurrency).code}. Gumroad checkout prices are in USD.
            </p>

            <button
              type="button"
              onClick={onProceedToCheckout}
              disabled={items.length === 0}
              className="mt-6 w-full bg-orange-500 px-6 py-4 font-sans text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors duration-200 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              onClick={onContinueShopping}
              className="mt-3 w-full border border-white/10 px-6 py-4 font-sans text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/5"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

function EmptyCart({ onContinueShopping }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center border border-white/10 text-2xl">
        🛍
      </div>

      <h3 className="mt-6 font-display text-2xl font-medium text-white">
        Your cart is empty.
      </h3>

      <p className="mt-4 max-w-xs font-sans text-sm leading-6 text-white/40">
        Explore the catalog and find the right
        music for your project.
      </p>

      <button
        type="button"
        onClick={onContinueShopping}
        className="mt-8 bg-orange-500 px-6 py-4 font-sans text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors duration-200 hover:bg-orange-400"
      >
        Explore Music
      </button>
    </div>
  );
}

function CartItem({ item, onRemove, selectedCurrency }) {
  const track = item.track;
  const license = item.license;

  const price = `${getDisplayCurrency(selectedCurrency).code} ${formatLicensePrice(getLicensePrice(license), selectedCurrency)}`;

  return (
    <article className="border border-white/10 bg-white/[0.02] p-4">
      <div className="flex gap-4">
        {track?.cover ? (
          <img
            src={track.cover}
            alt={track.title}
            className="h-20 w-20 shrink-0 object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-white/5 text-xl">
            🎧
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-3">
            <div>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">
                {license?.type === "business"
                  ? "Business License"
                  : "Creator License"}
              </p>

              <h3 className="mt-1 break-words font-display text-lg font-medium text-white">
                {track?.title || "Catalog License"}
              </h3>
            </div>

            <span className="shrink-0 font-sans text-sm font-bold text-white">
              {price}
            </span>
          </div>

          {track && (
            <p className="mt-2 font-sans text-xs text-white/35">
              {track.genre} &bull; {track.bpm} BPM
            </p>
          )}

          <button
            type="button"
            onClick={onRemove}
            className="mt-2 min-h-11 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-white/35 transition-colors duration-200 hover:text-red-400"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
