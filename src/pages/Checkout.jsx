import { useMemo, useState } from "react";

import { CREATOR_LICENSE_PRICE } from "../data/licenses";
import { preparePayment } from "../services/payment/paymentOperations";

export default function Checkout({
  items = [],
  order = null,
  selectedCurrency,
  onBackToCart,
  onContinueShopping,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const [projectType, setProjectType] =
    useState("");

  const [projectDescription, setProjectDescription] =
    useState("");

  const [termsAccepted, setTermsAccepted] =
    useState(false);

  const [paymentMessage, setPaymentMessage] =
    useState("");

  const creatorItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.license?.type === "creator"
    );
  }, [items]);

  const businessItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.license?.type === "business"
    );
  }, [items]);

  const subtotal = useMemo(() => {
    if (order?.subtotal !== undefined) {
      return order.subtotal;
    }

    return creatorItems.length * CREATOR_LICENSE_PRICE;
  }, [creatorItems, order]);

  const currencyCode =
    selectedCurrency?.code || "USD";

  const hasBusinessItems =
    businessItems.length > 0;

  const checkoutReady =
    Boolean(order) &&
    creatorItems.length > 0 &&
    !hasBusinessItems &&
    name.trim() &&
    email.trim() &&
    country.trim() &&
    projectType.trim() &&
    termsAccepted;

  function formatPrice(amount) {
    return `$${amount.toFixed(2)} ${currencyCode}`;
  }

  function handleSubmit(event) {
    event.preventDefault();

    setPaymentMessage("");

    if (!order) {
      setPaymentMessage(
        "Your order could not be found. Please return to your cart and try again."
      );

      return;
    }

    if (!checkoutReady) {
      return;
    }

    try {
      const paymentRequest =
        preparePayment({
          order,
        });

      console.log(
        "Payment request prepared:",
        paymentRequest
      );

      setPaymentMessage(
        "Your order is ready for secure payment. Payment provider integration will be connected next."
      );
    } catch (error) {
      setPaymentMessage(
        error.message ||
          "We could not prepare your payment."
      );
    }
  }

  if (items.length === 0) {
    return (
      <section className="min-h-screen bg-[#090909] px-6 pb-24 pt-36">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
            Checkout
          </p>

          <h1 className="mt-5 font-display text-4xl font-medium text-white sm:text-5xl">
            Your cart is empty.
          </h1>

          <p className="mx-auto mt-5 max-w-md font-sans text-sm leading-6 text-white/45">
            Add a license to your cart before
            continuing to checkout.
          </p>

          <button
            type="button"
            onClick={onContinueShopping}
            className="mt-8 bg-orange-500 px-7 py-4 font-sans text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors duration-200 hover:bg-orange-400"
          >
            Explore Music
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#090909] px-6 pb-24 pt-36">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
            Checkout
          </p>

          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl">
            Complete your license.
          </h1>

          <p className="mt-4 max-w-xl font-sans text-sm leading-6 text-white/40">
            Enter your information and project
            details to continue to secure payment.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_360px]"
        >

          {/* LEFT COLUMN */}
          <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            {/* Personal Information */}
            <section>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-orange-500">
                01
              </p>

              <h2 className="mt-2 font-display text-2xl font-medium text-white">
                Personal Information
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="checkout-name"
                    className="font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-white/40"
                  >
                    Full Name
                  </label>

                  <input
                    id="checkout-name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    className="mt-2 w-full border-b border-white/15 bg-transparent px-0 py-2.5 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-email"
                    className="font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-white/40"
                  >
                    Email
                  </label>

                  <input
                    id="checkout-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="mt-2 w-full border-b border-white/15 bg-transparent px-0 py-2.5 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-orange-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="checkout-country"
                    className="font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-white/40"
                  >
                    Country
                  </label>

                  <input
                    id="checkout-country"
                    type="text"
                    value={country}
                    onChange={(event) =>
                      setCountry(event.target.value)
                    }
                    placeholder="Your country"
                    autoComplete="country-name"
                    required
                    className="mt-2 w-full border-b border-white/15 bg-transparent px-0 py-2.5 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-orange-500"
                  />
                </div>

              </div>
            </section>

            {/* Payment */}
            <section className="mt-9 pt-2">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-orange-500">
                    02
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-medium text-white">
                    Payment
                  </h2>
                </div>

                <span className="pt-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-white/25">
                  Secure Provider
                </span>

              </div>

              <div className="mt-6 border border-white/10 bg-black/20 p-5">

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/5 text-orange-400">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-medium text-white">
                      Secure payment
                    </h3>

                    <p className="mt-2 font-sans text-xs leading-5 text-white/40">
                      Your payment will be handled
                      through DAMTARO's secure payment
                      provider. Card details will not be
                      stored by DAMTARO.
                    </p>
                  </div>

                </div>

              </div>

            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* Order Summary */}
            <aside className="border border-white/10 bg-white/[0.02] p-6 sm:p-7">

              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-orange-500">
                Order Summary
              </p>

              {order?.orderId && (
                <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.14em] text-white/20">
                  Order {order.orderId}
                </p>
              )}

              <div className="mt-6 space-y-4">

                {items.map((item) => {
                  const isCreator =
                    item.license?.type === "creator";

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4"
                    >
                      {item.track?.cover ? (
                        <img
                          src={item.track.cover}
                          alt={item.track.title}
                          className="h-14 w-14 shrink-0 object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-white/5">
                          🎧
                        </div>
                      )}

                      <div className="min-w-0 flex-1">

                        <p className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-orange-500">
                          {isCreator
                            ? "Creator License"
                            : "Business License"}
                        </p>

                        <h3 className="mt-1 truncate font-display text-base font-medium text-white">
                          {item.track?.title ||
                            "Catalog License"}
                        </h3>

                        <p className="mt-1 font-sans text-[11px] text-white/35">
                          {isCreator
                            ? `$${CREATOR_LICENSE_PRICE.toFixed(2)}`
                            : "Custom"}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>

              {hasBusinessItems && (
                <div className="mt-5 border border-orange-500/20 bg-orange-500/5 p-4">
                  <p className="font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-orange-400">
                    Business Licensing
                  </p>

                  <p className="mt-2 font-sans text-[11px] leading-5 text-white/40">
                    Business licensing requires project
                    validation and custom pricing.
                  </p>
                </div>
              )}

              <div className="mt-6 pt-5">

                <div className="border-t border-white/10 pt-5">

                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                      Total
                    </span>

                    <span className="font-display text-2xl font-medium text-white">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p className="mt-2 font-sans text-[9px] leading-5 text-white/20">
                    Pricing currently uses USD as the
                    base price. Currency conversion will
                    be connected with the financial system.
                  </p>

                </div>

              </div>

            </aside>

            {/* Project Information */}
            <section className="border border-white/10 bg-white/[0.02] p-6 sm:p-7">

              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-orange-500">
                03
              </p>

              <h2 className="mt-2 font-display text-2xl font-medium text-white">
                Project Information
              </h2>

              <div className="mt-6 grid gap-5">

                <div>
                  <label
                    htmlFor="checkout-project-type"
                    className="font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-white/40"
                  >
                    Project Type
                  </label>

                  <select
                    id="checkout-project-type"
                    value={projectType}
                    onChange={(event) =>
                      setProjectType(
                        event.target.value
                      )
                    }
                    required
                    className="mt-2 w-full border border-white/10 bg-[#0d0d0d] px-3 py-3 font-sans text-xs text-white outline-none transition-colors focus:border-orange-500"
                  >
                    <option value="">
                      Select project type
                    </option>

                    <option value="YouTube">
                      YouTube
                    </option>

                    <option value="Social Media">
                      Social Media
                    </option>

                    <option value="Podcast">
                      Podcast
                    </option>

                    <option value="Twitch">
                      Twitch
                    </option>

                    <option value="Monetized Content">
                      Monetized Content
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="checkout-description"
                    className="font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-white/40"
                  >
                    Project Description
                    <span className="ml-2 normal-case tracking-normal text-white/20">
                      Optional
                    </span>
                  </label>

                  <textarea
                    id="checkout-description"
                    value={projectDescription}
                    onChange={(event) =>
                      setProjectDescription(
                        event.target.value
                      )
                    }
                    placeholder="Briefly describe how you will use the music."
                    rows={4}
                    className="mt-2 w-full resize-none border border-white/10 bg-black/20 p-3 font-sans text-xs leading-5 text-white outline-none transition-colors placeholder:text-white/20 focus:border-orange-500"
                  />
                </div>

              </div>

              {/* Confirmation */}
              <div className="mt-6 pt-1">

                <label className="flex cursor-pointer items-start gap-3">

                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(event) =>
                      setTermsAccepted(
                        event.target.checked
                      )
                    }
                    className="mt-0.5 h-4 w-4 accent-orange-500"
                  />

                  <span className="font-sans text-[11px] leading-5 text-white/45">
                    I confirm that the information
                    provided is accurate and that I
                    understand the selected license.
                  </span>

                </label>

              </div>

              {paymentMessage && (
                <div className="mt-5 border border-orange-500/20 bg-orange-500/5 p-4">
                  <p className="font-sans text-[11px] leading-5 text-orange-300">
                    {paymentMessage}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={!checkoutReady}
                className="mt-6 w-full bg-orange-500 px-6 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/25"
              >
                Continue to Secure Payment
              </button>

              <button
                type="button"
                onClick={onBackToCart}
                className="mt-3 w-full border border-white/10 px-6 py-3.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:border-white/25 hover:bg-white/5"
              >
                Back to Cart
              </button>

            </section>

          </div>

        </form>
      </div>
    </section>
  );
}
