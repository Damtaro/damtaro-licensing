import Container from "../ui/Container";

export default function Contact() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0b0b0b] py-28 md:py-36"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-orange-950/10 blur-[160px]" />

      <Container>
        <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-24">

          {/* Introduction */}
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
              Contact
            </p>

            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl md:text-6xl">
              Have a project
              <br />
              in mind?
            </h2>

            <p className="mt-6 max-w-lg font-sans text-base leading-7 text-white/60 md:text-lg">
              Tell us what you are building and what you need. We will help
              find the right way to work together.
            </p>

            <div className="mt-10 border-l border-orange-500/50 pl-5">
              <p className="font-sans text-sm leading-6 text-white/50">
                For custom projects, commercial opportunities, partnerships,
                or licensing needs that require a more tailored approach.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="border border-white/10 bg-white/[0.02] p-6 sm:p-8 md:p-10"
          >
            <div className="grid gap-7">

              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50"
                >
                  Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-orange-500"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50"
                >
                  Email
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-orange-500"
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="contact-company"
                  className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50"
                >
                  Company / Organization
                  <span className="ml-2 font-normal normal-case tracking-normal text-white/25">
                    Optional
                  </span>
                </label>

                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  placeholder="Company or organization"
                  className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-orange-500"
                />
              </div>

              {/* Project / Inquiry */}
              <div>
                <label
                  htmlFor="contact-project"
                  className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50"
                >
                  Project / Inquiry
                </label>

                <input
                  id="contact-project"
                  name="project"
                  type="text"
                  placeholder="What is this regarding?"
                  className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-orange-500"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Tell us about your project..."
                  className="mt-3 w-full resize-none border border-white/10 bg-black/20 px-4 py-4 font-sans text-sm leading-6 text-white outline-none transition-colors placeholder:text-white/25 focus:border-orange-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-2 w-full bg-orange-500 px-6 py-4 font-sans text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors duration-200 hover:bg-orange-400"
              >
                Send Inquiry
              </button>

            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
