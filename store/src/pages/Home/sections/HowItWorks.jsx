import { ShoppingBag, ShoppingCart, Truck } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse Products",
    description: "Explore our wide range of premium products",
    icon: ShoppingBag,
  },
  {
    id: 2,
    title: "Add to Cart",
    description: "Select your favorites and add them to your cart",
    icon: ShoppingCart,
  },
  {
    id: 3,
    title: "Order & Receive",
    description: "Place your order and get it delivered to your doorstep",
    icon: Truck,
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-25 transition-colors duration-300 sm:px-6 lg:px-10">
      <div className="mx-auto w-[95%] max-w-6xl">
        <div className="mb-16 flex flex-col items-center text-center">
          <span
            className="mb-3 h-1 w-10 rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
          />
          <h2
            className="text-3xl font-extrabold tracking-tight md:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            How It Works
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">

          {steps.map(({ id, title, description, icon: Icon }, index) => (
            <article
              key={id}
              className="group relative z-10 flex min-w-0 flex-col items-center text-center"
            >
              <div
                className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: "var(--primary-light)",
                  color: "var(--primary)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-sm-value)",
                }}
              >
                <Icon className="h-8 w-8" strokeWidth={2} />
                <span
                  className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  {index + 1}
                </span>
              </div>

              <h3
                className="mb-2 text-xl font-bold tracking-tight transition-colors"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>

              <p
                className="max-w-[320px] text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}