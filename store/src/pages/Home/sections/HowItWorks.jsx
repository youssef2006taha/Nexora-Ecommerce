import { ShoppingBag, CreditCard, Truck } from "lucide-react";

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
    icon: CreditCard,
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
    <section className="min-h-[552px] w-full bg-bg-main px-4 py-16 transition-colors duration-300 sm:px-6 lg:px-10">
      <div className="mx-auto w-[97%] max-w-6xl">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 h-1 w-10 rounded-full bg-primary" />
          <h2 className="text-3xl font-bold leading-none text-text-primary transition-colors duration-300 md:text-[40px]">
            How It Works
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8">
          {/* connector line, desktop only — order carries real meaning here */}
          <div className="pointer-events-none absolute top-10 left-0 right-0 z-0 hidden h-px bg-border md:block" />

          {steps.map(({ id, title, description, icon: Icon }, index) => (
            <article
              key={id}
              className="group relative z-10 flex min-w-0 flex-col items-center text-center"
            >
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-primary-light text-primary shadow-xs ring-1 ring-inset ring-border transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/15">
                <Icon className="h-[35px] w-[35px]" strokeWidth={2} />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-text-white shadow-xs">
                  {index + 1}
                </span>
              </div>

              <h3 className="mb-3 text-[23px] font-bold leading-tight text-text-primary transition-colors duration-300">
                {title}
              </h3>

              <p className="max-w-[430px] text-[18px] leading-[1.4] text-text-muted transition-colors duration-300">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}