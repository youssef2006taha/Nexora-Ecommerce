import { Zap, Globe, MessageCircle, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative left-1/2 -translate-x-1/2 w-screen"
      style={{
        backgroundColor: "var(--bg-card)",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left */}

          <div>
            <div
              className="flex items-center gap-2 text-xl font-bold"
              style={{ color: "var(--gold-primary)" }}
            >
              <Zap size={22} />
              <span>Koda Store</span>
            </div>

            <p
              className="mt-4 leading-7 max-w-xs"
              style={{ color: "var(--text-muted)" }}
            >
              Shop the future, delivered today. Premium products at the best
              prices with fast delivery across Egypt.
            </p>
          </div>

          {/* Middle */}

          <div>
            <h3
              className="font-semibold text-lg mb-5"
              style={{ color: "var(--text-main)" }}
            >
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="transition"
                  style={{ color: "var(--text-muted)" }}
                >
                  Shop
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition"
                  style={{ color: "var(--text-muted)" }}
                >
                  My Orders
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition"
                  style={{ color: "var(--text-muted)" }}
                >
                  Wishlist
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition"
                  style={{ color: "var(--text-muted)" }}
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Right */}

          <div>
            <h3
              className="font-semibold text-lg mb-5"
              style={{ color: "var(--text-main)" }}
            >
              Follow Us
            </h3>

            <div className="flex justify-center gap-3">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center transition"
                style={{
                  background: "var(--bg-main)",
                  color: "var(--text-main)",
                }}
              >
                <Globe size={18} />
              </button>

              <button
                className="w-10 h-10 rounded-full flex items-center justify-center transition"
                style={{
                  background: "var(--bg-main)",
                  color: "var(--text-main)",
                }}
              >
                <MessageCircle size={18} />
              </button>

              <button
                className="w-10 h-10 rounded-full flex items-center justify-center transition"
                style={{
                  background: "var(--bg-main)",
                  color: "var(--text-main)",
                }}
              >
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>

        <hr
          className="my-10"
          style={{
            borderColor: "var(--border-color)",
          }}
        />

        <p
          className="text-center text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          © 2026 Koda Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
