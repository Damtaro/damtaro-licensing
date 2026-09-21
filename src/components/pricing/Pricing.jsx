import Container from "../ui/Container";
import PricingCard from "./PricingCard";
import pricing from "../../data/pricing";

export default function Pricing({ onLicense }) {
  return (
    <section id="pricing" className="scroll-mt-24 py-28">

      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
            Pricing
          </p>

          <h2 className="mt-4 text-3xl sm:text-5xl font-black text-white">
            Simple Licensing.
            <br />
            Transparent Pricing.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Choose the license that best fits your project.
            Every purchase includes a lifetime license for the selected project,
            with no recurring fees and no hidden charges.
          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          {pricing.map((plan) => (

            <PricingCard
              key={plan.id}
              pricing={plan}
              onLicense={onLicense}
            />

          ))}

        </div>

      </Container>

    </section>
  );
}
