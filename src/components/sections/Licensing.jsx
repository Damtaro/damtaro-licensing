import Container from "../ui/Container";
import LicenseCard from "../licensing/LicenseCard";

import licenses from "../../data/licenses";

export default function Licensing({ onLicense, selectedCurrency }) {
  return (
    <section id="licensing" className="scroll-mt-24 py-24">

      <Container>

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
            Licensing Solutions
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Choose the Right License
          </h2>

          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Whether you're an independent creator or a global company,
            DAMTARO offers licensing solutions designed to fit your project.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          {licenses.map((license) => (

            <LicenseCard
              key={license.id}
              license={license}
              selectedCurrency={selectedCurrency}
              onLicense={onLicense}
            />

          ))}

        </div>

      </Container>

    </section>
  );
}
