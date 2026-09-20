import { useState } from "react";

export default function Register({ onNavigate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="min-h-screen bg-[#090909] px-6 pb-24 pt-36">
      <div className="mx-auto max-w-md">

        <div className="text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
            Account
          </p>

          <h1 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl">
            Create your account.
          </h1>

          <p className="mx-auto mt-5 max-w-sm font-sans text-sm leading-6 text-white/50">
            Create an account to keep your DAMTARO licensing activity organized
            in one place.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 border border-white/10 bg-white/[0.02] p-6 sm:p-8"
        >
          <div className="grid gap-7">

            <div>
              <label
                htmlFor="register-name"
                className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50"
              >
                Name
              </label>

              <input
                id="register-name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                autoComplete="name"
                className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50"
              >
                Email
              </label>

              <input
                id="register-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50"
              >
                Password
              </label>

              <input
                id="register-password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                autoComplete="new-password"
                className="mt-3 w-full border-b border-white/15 bg-transparent px-0 py-3 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-orange-500 px-6 py-4 font-sans text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors duration-200 hover:bg-orange-400"
            >
              Create Account
            </button>

          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="font-sans text-sm text-white/40">
            Already have an account?
          </p>

          <button
            type="button"
            onClick={() => onNavigate("login")}
            className="mt-2 font-sans text-sm font-bold text-white transition-colors hover:text-orange-400"
          >
            Sign in
          </button>
        </div>

      </div>
    </section>
  );
}
