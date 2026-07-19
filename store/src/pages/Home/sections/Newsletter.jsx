import { useState } from "react";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) return;

    console.log("Newsletter email:", email);
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
            flex min-h-[402px]
            flex-col items-center justify-center
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
          <Mail
            className="mb-6 h-12 w-12 text-[#e0e7ff]"
            strokeWidth={2}
          />

          <h2 className="mb-4 text-3xl font-bold leading-none text-white md:text-[40px]">
            Stay Updated
          </h2>

          <p className="mb-8 max-w-[620px] text-base leading-[1.45] text-[#eef2ff] md:text-[21px]">
            Subscribe to our newsletter and get exclusive deals and
            <br className="hidden sm:block" />
            new arrivals first.
          </p>

          <form
            onSubmit={handleSubmit}
            className="
              !m-0 !flex !w-full !max-w-[560px]
              !flex-col !gap-3
              !border-0 !bg-transparent
              !p-0 !shadow-none
              sm:!flex-row
            "
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
                !m-0 !h-[62px] !min-w-0 !flex-1
                !rounded-xl
                !border !border-white/25
                !bg-white/10
                !px-5
                !text-[18px] !text-white
                !shadow-none !outline-none
                placeholder:!text-[#c7d2fe]
                focus:!border-white/60
                focus:!bg-white/15
                focus:!ring-4
                focus:!ring-white/10
              "
            />

            <button
              type="submit"
              className="
                !m-0 !h-[62px]
                !rounded-xl !border-0
                !bg-white
                !px-8
                !text-[18px] !font-semibold
                !text-[#4338ca]
                !shadow-none
                transition
                hover:!bg-[#eef2ff]
                focus:!outline-none
                focus:!ring-4
                focus:!ring-white/30
                active:scale-[0.98]
              "
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}