import Button from "../ui/Button";

export default function LicenseCard({ license, onLicense }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/10">
      <div className="text-5xl">{license.icon}</div>
      <h3 className="mt-6 text-3xl font-bold text-white">{license.title}</h3>
      <p className="mt-4 leading-7 text-zinc-400">{license.description}</p>
      <div className="mt-8 space-y-3">
        {license.features.map((feature) => (
          <div key={feature} className="flex items-center gap-3"><span className="text-orange-500">✓</span><span className="text-zinc-300">{feature}</span></div>
        ))}
      </div>
      <div className="mt-auto pt-10"><Button onClick={onLicense} className="w-full">{license.button}</Button></div>
    </article>
  );
}
