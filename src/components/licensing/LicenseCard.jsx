import { formatLicensePrice, getDisplayCurrency } from "../../utils/licensePriceDisplay";
import Button from "../ui/Button";

export default function LicenseCard({ license, onLicense, selectedCurrency }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-5 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/10">
      <div className="text-5xl">{license.icon}</div>
      <h3 className="mt-6 text-3xl font-bold text-white">{license.title}</h3>
      <p className="mt-4 text-2xl font-bold text-white">{formatLicensePrice(license.price, selectedCurrency)} <span className="text-sm font-normal text-zinc-400">{getDisplayCurrency(selectedCurrency).code} / track</span></p>
      <p className="mt-4 leading-7 text-zinc-400">{license.description}</p>
      <div className="mt-8 space-y-3">
        {license.features.map((feature) => (
          <div key={feature} className="flex items-center gap-3"><span className="text-orange-500">✓</span><span className="text-zinc-300">{feature}</span></div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-6 text-zinc-400">{license.boundary}</p>
      <div className="mt-auto pt-6"><Button onClick={onLicense} className="w-full">Choose License</Button></div>
    </article>
  );
}
