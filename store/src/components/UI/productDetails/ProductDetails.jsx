import {
  ChevronLeft,
  ChevronRight,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { User } from "lucide-react";
import { useState } from "react";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const images = ["/sqbbmndvmnvig86i7qpj.jpg", "/61EQABgS5fL._AC_UF480,480_SR480,480_.jpg", "/51Dk60i1xmL._AC_SX522_.jpg"];
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/*  ================= Product Card  ================= */}
        <div
          className="grid lg:grid-cols-2 gap-12 rounded-2xl p-4"
          style={{
            backgroundColor: "var(--bg-card)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Image */}
          <div>
            {/* Main Image */}

            <div
              className="relative rounded-2xl p-10 flex items-center justify-center"
              style={{
                background: "var(--bg-main)",
              }}
            >
              <img
                src={images[currentImage]}
                alt="Product"
                className="w-full max-w-md object-contain"
              />

              {/* Previous */}

              <button
                onClick={() =>
                  setCurrentImage(
                    currentImage === 0 ? images.length - 1 : currentImage - 1,
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow flex items-center justify-center"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next */}

              <button
                onClick={() =>
                  setCurrentImage(
                    currentImage === images.length - 1 ? 0 : currentImage + 1,
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow flex items-center justify-center"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Thumbnails */}

            <div className="flex gap-4 mt-6">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`rounded-xl overflow-hidden border-2 transition ${
                    currentImage === index
                      ? "border-cyan-500"
                      : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-24 h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="w-full text-left">
              <span
                className="block text-sm font-semibold"
                style={{ color: "var(--gold-primary)" }}
              >
                Television
              </span>

              <h2
                className="mt-5 text-4xl md:text-5xl font-bold leading-tight"
                style={{ color: "var(--text-main)" }}
              >
                Smart TV Samsung
              </h2>
            </div>

            {/* Rating */}

            <div className="flex items-center gap-3 mt-5">
              <div className="flex text-gray-300">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" />
                ))}
              </div>

              <span style={{ color: "var(--text-muted)" }}>(0)</span>

              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: "#DCFCE7",
                  color: "#15803D",
                }}
              >
                In Stock
              </span>
            </div>

            {/* Price */}

            <div className="flex items-center gap-4 mt-8">
              <h2
                className="text-5xl font-bold"
                style={{
                  color: "var(--gold-primary)",
                }}
              >
                EGP 24,000
              </h2>

              <span
                className="line-through"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                EGP 25,000
              </span>

              <span className="bg-red-100 text-red-600 items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                -4%
              </span>
            </div>

            {/* Cart */}

            <div className="grid grid-cols-[2fr_6fr_1fr] gap-2 mt-8">
              {/* Counter */}

              <div
                className="flex items-center overflow-hidden rounded-lg border"
                style={{
                  borderColor: "var(--border-color)",
                }}
              >
                <button
                  className="w-12 h-12 flex items-center justify-center"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  <Minus size={18} />
                </button>

                <span className="w-12 text-center flex items-center justify-center">
                  {quantity}
                </span>

                <button
                  className="w-12 h-12 flex items-center justify-center"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Add Cart */}

              <button
                className="flex-1 flex items-center justify-center gap-3 rounded-lg text-white font-semibold"
                style={{
                  backgroundColor: "var(--gold-primary)",
                }}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              {/* Wishlist */}

              <button
                className="w-14 rounded-lg border flex items-center justify-center"
                style={{
                  borderColor: "var(--border-color)",
                }}
              >
                <Heart size={20} />
              </button>
            </div>

            {/* Description */}

            <p
              className="text-left mt-8 leading-8 text-xs"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Samsung Smart TV 55 inch with 4K resolution and Android system.
            </p>
          </div>
        </div>

        {/* ================= Reviews Section ================= */}

        <div className="mt-20">
          {/* Tabs */}

          <div
            className="flex gap-10 border-b pb-3"
            style={{ borderColor: "var(--border-color)" }}
          >
            <button
              onClick={() => setActiveTab("description")}
              className="pb-3 font-medium border-b-2 transition"
              style={{
                color:
                  activeTab === "description"
                    ? "var(--gold-primary)"
                    : "var(--text-muted)",
                borderColor:
                  activeTab === "description"
                    ? "var(--gold-primary)"
                    : "transparent",
              }}
            >
              Description
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className="pb-3 font-medium border-b-2 transition"
              style={{
                color:
                  activeTab === "reviews"
                    ? "var(--gold-primary)"
                    : "var(--text-muted)",
                borderColor:
                  activeTab === "reviews"
                    ? "var(--gold-primary)"
                    : "transparent",
              }}
            >
              Reviews (1)
            </button>
          </div>

          {activeTab === "description" && (
            <div className="mt-10">
              <p
                className="text-xs text-left leading-8"
                style={{ color: "var(--text-muted)" }}
              >
                Samsung Smart TV 55 inch with 4K resolution and Android system.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <>
              {/* Review Form */}

              <div className="mt-10 max-w-2xl">
                <h3
                  className="text-left text-2xl font-bold mb-5"
                  style={{ color: "var(--text-main)" }}
                >
                  Write a Review
                </h3>

                <div className="flex gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      className="cursor-pointer"
                      fill="#E5E7EB"
                      color="#E5E7EB"
                    />
                  ))}
                </div>

                <textarea
                  rows={5}
                  placeholder="Share your thoughts..."
                  className="w-full rounded-xl p-5 resize-none outline-none border"
                  style={{
                    borderColor: "var(--border-color)",
                  }}
                />

                <div className="text-left mt-6">
                  <button
                    className="px-8 py-3 rounded-xl text-white font-semibold transition"
                    style={{
                      background: "var(--gold-primary)",
                    }}
                  >
                    Submit Review
                  </button>
                </div>
              </div>

              {/* Customer Review */}

              <div className="mt-14 flex gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "#EEF2FF",
                  }}
                >
                  <User size={22} style={{ color: "var(--gold-primary)" }} />
                </div>

                <div>
                  <h4
                    className="font-semibold text-lg"
                    style={{ color: "var(--text-main)" }}
                  >
                    Customer Account
                  </h4>

                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Jul 18, 2026
                  </p>

                  <div className="flex gap-1 my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        fill="#F59E0B"
                        color="#F59E0B"
                      />
                    ))}
                  </div>

                  <p style={{ color: "var(--text-main)" }}>hello</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
