import { useRef, useState } from "react";
import Container from "../ui/Container";

const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name", autoComplete: "name", maxLength: 120 },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email", maxLength: 254 },
  { name: "company", label: "Company / Organization", type: "text", placeholder: "Company or organization", autoComplete: "organization", maxLength: 200, optional: true },
  { name: "project", label: "Project / Inquiry", type: "text", placeholder: "What is this regarding?", maxLength: 200 },
];

const fieldStyle = "mt-2 min-h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-base text-white placeholder:text-zinc-500 focus:border-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 sm:text-sm";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const inFlight = useRef(false);
  const isSubmitting = status === "submitting";

  async function handleSubmit(event) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    // Usability validation only; Formspree remains the server-side boundary.
    for (const field of form.elements) {
      if (field.required && !field.value.trim()) {
        field.setCustomValidity("Please fill out this field.");
      }
    }
    if (!form.reportValidity()) return;
    const body = new FormData(form);
    inFlight.current = true;
    setStatus("submitting");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("https://formspree.io/f/mdekgzng", {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      inFlight.current = false;
    }
  }

  function handleInput(event) {
    event.target.setCustomValidity("");
    if (status !== "idle" && !inFlight.current) setStatus("idle");
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-[#0b0b0b] pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
      <Container>
        <div className="mx-auto grid max-w-6xl gap-8 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 lg:pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-400">Contact</p>
            <h1 id="contact-title" className="mt-4 text-balance font-display text-4xl font-medium leading-[1.1] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">
              Have a project<br />in mind?
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-zinc-400">
              Tell us what you are building and what you need. We will help
              find the right way to work together.
            </p>
            <div className="mt-6 max-w-lg border-l-2 border-orange-500/50 pl-4">
              <p className="text-sm leading-6 text-zinc-400">
                For custom projects, commercial opportunities, partnerships,
                or licensing needs that require a more tailored approach.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} onInput={handleInput} aria-label="Contact DAMTARO" className="min-w-0 rounded-2xl border border-white/[0.08] bg-[#121212] p-5 shadow-sm shadow-black/20 sm:p-6 lg:p-7">
            <fieldset disabled={isSubmitting} className="min-w-0">
              <legend className="sr-only">Your inquiry</legend>
              {/* Formspree's honeypot is evaluated by the service. */}
              <input type="text" name="_gotcha" aria-hidden="true" tabIndex={-1} autoComplete="off" className="hidden" />
              <div className="grid gap-4">
                {fields.map((field) => (
                  <div key={field.name} className="min-w-0">
                    <label htmlFor={`contact-${field.name}`} className="text-sm font-medium text-zinc-300">
                      {field.label}
                      {field.optional && <span className="ml-2 font-normal text-zinc-400">Optional</span>}
                    </label>
                    <input id={`contact-${field.name}`} name={field.name} type={field.type} placeholder={field.placeholder} autoComplete={field.autoComplete} maxLength={field.maxLength} required={!field.optional} className={fieldStyle} />
                  </div>
                ))}
                <div className="min-w-0">
                  <label htmlFor="contact-message" className="text-sm font-medium text-zinc-300">Message</label>
                  <textarea id="contact-message" name="message" rows={4} required maxLength={5000} placeholder="Tell us about your project..." className={`${fieldStyle} resize-y leading-6`} />
                </div>
                <button type="submit" disabled={isSubmitting} className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-black hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 disabled:cursor-wait disabled:opacity-70">
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </button>
              </div>
            </fieldset>
            <p role="status" aria-live="polite" aria-atomic="true" className={status === "idle" ? "sr-only" : "mt-4 text-sm leading-6 text-zinc-200"}>
              {status === "submitting" && "Sending your inquiry..."}
              {status === "success" && "Thank you. Your inquiry has been sent to DAMTARO."}
              {status === "error" && "We couldn't send your inquiry. Please try again."}
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
