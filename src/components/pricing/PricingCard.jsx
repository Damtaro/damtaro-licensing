import { formatLicensePrice, getDisplayCurrency } from "../../utils/licensePriceDisplay";
import Button from "../ui/Button";

export default function PricingCard({ pricing, onLicense, selectedCurrency }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-5 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/10">
      <div className="text-5xl">{pricing.icon}</div>
      <h3 className="mt-6 text-3xl font-bold text-white">{pricing.title}</h3>
      <p className="mt-5 text-sm uppercase tracking-[0.3em] text-orange-500">{getDisplayCurrency(selectedCurrency).code} / track</p>
      <div className="mt-2 text-6xl font-black text-white">{formatLicensePrice(pricing.price, selectedCurrency)}</div>
      <p className="mt-5 leading-7 text-zinc-400">{pricing.description}</p>
      <div className="mt-8 space-y-3">
        {pricing.features.map((feature) => (
          <div key={feature} className="flex items-center gap-3"><span className="text-orange-500">✓</span><span className="text-zinc-300">{feature}</span></div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-6 text-zinc-400">{pricing.boundary}</p>
      <div className="mt-auto pt-6"><Button onClick={onLicense} variant={pricing.type === "business" ? "secondary" : "primary"} className="w-full">{pricing.button}</Button></div>
    </article>
  );
}
