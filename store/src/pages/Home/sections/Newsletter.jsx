import { useState } from "react";
import { Mail, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) return;

    console.log("Newsletter email:", email);
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="w-full bg-bg-main px-4 py-20 transition-colors duration-300 sm:px-6 lg:px-10">
      <div className="mx-auto w-[80%]">
        <div className="relative flex min-h-[402px] flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary-active px-6 py-12 text-center shadow-lg transition-shadow duration-300">

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-text-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
          </div>

          <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-text-white/10 ring-1 ring-inset ring-text-white/20">
            <Mail className="h-7 w-7 text-accent" strokeWidth={2} />
          </div>

          <h2 className="relative mb-4 text-3xl font-bold leading-none text-text-white md:text-[40px]">
            Stay Updated
          </h2>

          <p className="relative mb-8 max-w-[620px] text-base leading-[1.45] text-text-white/85 md:text-[21px]">
            Subscribe to our newsletter and get exclusive deals and
            <br className="hidden sm:block" />
            new arrivals first.
          </p>

          {submitted ? (
            <div className="relative flex w-full max-w-[560px] items-center justify-center gap-2 rounded-lg border border-text-white/25 bg-text-white/10 px-5 py-5 text-text-white">
              <Check className="h-5 w-5 text-success" />
              <span className="text-[17px] font-medium">
                You're subscribed — check your inbox soon.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative flex w-full max-w-[560px] flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>

              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
                className="
                  h-[62px] min-w-0 flex-1
                  rounded-md
                  border border-text-white/25
                  bg-text-white/10
                  px-5
                  text-[18px] text-text-white
                  outline-none
                  transition-colors
                  placeholder:text-text-white/60
                  focus:border-text-white/60
                  focus:bg-text-white/15
                  focus:ring-4
                  focus:ring-text-white/10
                "
              />

              <button
                type="submit"
                className="
                  h-[62px]
                  rounded-md
                  bg-bg-card
                  px-8
                  text-[18px] font-semibold
                  text-primary-active
                  transition
                  hover:bg-bg-hover
                  focus:outline-none
                  focus:ring-4
                  focus:ring-text-white/30
                  active:scale-[0.98]
                "
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="relative mt-5 text-sm text-text-white/70">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}