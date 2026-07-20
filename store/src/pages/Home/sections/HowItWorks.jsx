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
    <section className="min-h-[552px] w-full bg-[#f8fafc] px-4 py-16 transition-colors duration-300 dark:bg-[#0b1220] sm:px-6 lg:px-10">
      <div className="mx-auto w-[97%]">
        <h2 className="mb-[90px] text-center text-3xl font-bold leading-none text-[#10213b] transition-colors duration-300 dark:text-[#f8fafc] md:text-[40px]">
          How It Works
        </h2>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8">
          {steps.map(({ id, title, description, icon: Icon }) => (
            <article
              key={id}
              className="flex min-w-0 flex-col items-center text-center"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[20px] bg-[#dfe6ff] text-[#5148f5] transition-colors duration-300 dark:bg-[#252d4b] dark:text-[#8b83ff]">
                <Icon className="h-[35px] w-[35px]" strokeWidth={2} />
              </div>

              <h3 className="mb-3 text-[23px] font-bold leading-tight text-[#10213b] transition-colors duration-300 dark:text-[#f1f5f9]">
                {title}
              </h3>

              <p className="max-w-[430px] text-[18px] leading-[1.4] text-[#5f7594] transition-colors duration-300 dark:text-[#94a3b8]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}