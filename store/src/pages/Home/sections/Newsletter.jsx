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
    <section className="w-full px-4 py-20 transition-colors duration-300 sm:px-6 lg:px-10">
      <div className="mx-auto container-noT">
        <div
          className="relative flex min-h-[380px] flex-col items-center justify-center overflow-hidden rounded-3xl px-6 py-12 text-center transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)`,
            boxShadow: "var(--shadow-lg-value)",
          }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-black/15 blur-3xl" />
          </div>

          <div
            className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderColor: "rgba(255, 255, 255, 0.25)",
            }}
          >
            <Mail className="h-7 w-7 text-white" strokeWidth={2} />
          </div>

          <h2 className="relative mb-3 text-3xl font-extrabold leading-tight text-white md:text-4xl tracking-tight">
            Stay Updated
          </h2>

          <p className="relative mb-8 max-w-[580px] text-base leading-relaxed text-white/90 md:text-lg">
            Subscribe to our newsletter and get exclusive deals and
            <br className="hidden sm:block" />
            new arrivals first.
          </p>

          {submitted ? (
            <div
              className="relative flex w-full max-w-[500px] items-center justify-center gap-2 rounded-2xl border px-6 py-4 text-white backdrop-blur-md"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              <Check className="h-5 w-5" style={{ color: "var(--success)" }} />
              <span className="text-base font-semibold">
                You're subscribed — check your inbox soon.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative flex w-full max-w-[520px] flex-col gap-3 sm:flex-row"
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
                className="h-[56px] min-w-0 flex-1 rounded-xl px-5 text-base text-white outline-none transition-all placeholder:text-white/60 focus:ring-2"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                }}
              />

              <button
                type="submit"
                className="h-[56px] rounded-xl px-8 text-base font-bold transition-all duration-200 active:scale-95 shadow-md"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  color: "var(--primary-hover)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--bg-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--bg-surface)")
                }
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="relative mt-5 text-xs text-white/70">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}