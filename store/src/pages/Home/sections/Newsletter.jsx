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
    <section
      className="
        w-full
        bg-[#f8fafc]
        px-4 py-20
        transition-colors duration-300
        dark:bg-[#0f172a]
        sm:px-6
        lg:px-10
      "
    >
      <div className="mx-auto w-[80%]">
        <div
          className="
            relative
            flex min-h-[402px]
            flex-col items-center justify-center
            overflow-hidden
            rounded-[20px]
            bg-gradient-to-r
            from-[#5145f5] to-[#4938d1]
            px-6 py-12
            text-center
            shadow-lg
            transition-shadow duration-300
            dark:shadow-black/30
          "
        >
          {/* decorative texture, purely visual */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
          </div>

          <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-inset ring-white/20">
            <Mail className="h-7 w-7 text-[#e0e7ff]" strokeWidth={2} />
          </div>

          <h2 className="relative mb-4 text-3xl font-bold leading-none text-white md:text-[40px]">
            Stay Updated
          </h2>

          <p className="relative mb-8 max-w-[620px] text-base leading-[1.45] text-[#eef2ff] md:text-[21px]">
            Subscribe to our newsletter and get exclusive deals and
            <br className="hidden sm:block" />
            new arrivals first.
          </p>

          {submitted ? (
            <div className="relative flex w-full max-w-[560px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-5 text-white">
              <Check className="h-5 w-5 text-[#c7f9cc]" />
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
                  rounded-xl
                  border border-white/25
                  bg-white/10
                  px-5
                  text-[18px] text-white
                  outline-none
                  transition-colors
                  placeholder:text-[#c7d2fe]
                  focus:border-white/60
                  focus:bg-white/15
                  focus:ring-4
                  focus:ring-white/10
                "
              />

              <button
                type="submit"
                className="
                  h-[62px]
                  rounded-xl
                  bg-white
                  px-8
                  text-[18px] font-semibold
                  text-[#4338ca]
                  transition
                  hover:bg-[#eef2ff]
                  focus:outline-none
                  focus:ring-4
                  focus:ring-white/30
                  active:scale-[0.98]
                "
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="relative mt-5 text-sm text-[#c7d2fe]">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}