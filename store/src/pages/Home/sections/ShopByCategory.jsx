import { useNavigate } from 'react-router-dom'
import { categories } from './data/categories'
import { TbArrowUpRight } from 'react-icons/tb'

export default function ShopByCategory() {
  const navigate = useNavigate()

  const goToCategory = (categoryId) => {
    navigate(`/shop?category=${categoryId}`)
  }

  return (
    <section className="relative overflow-hidden py-10" id='CategorySec'>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full">
        <div className="mx-auto h-[420px] max-w-3xl bg-primary/10 blur-[100px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 h-1 w-10 rounded-full bg-primary" />
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-text-muted">
            Browse our wide range of categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {categories.map(({ id, name, products, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => goToCategory(id)}
              className="group relative flex flex-col items-center overflow-hidden rounded-lg border border-border bg-bg-card px-6 py-10 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-light to-transparent" />
              <span className="pointer-events-none absolute -top-6 h-24 w-24 rounded-full bg-primary/0 blur-2xl transition-colors duration-300 group-hover:bg-primary/20" />

              <span className="absolute right-4 top-4 flex h-7 w-7 -translate-y-1 items-center justify-center rounded-full bg-bg-hover text-text-muted opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <TbArrowUpRight className="h-4 w-4" />
              </span>

              <span className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary-light text-primary ring-1 ring-inset ring-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Icon className="h-7 w-7" strokeWidth={1.75} />
              </span>

              <span className="relative text-lg font-semibold text-text-primary">
                {name}
              </span>

              <span className="relative mt-2 inline-flex items-center rounded-full bg-bg-hover px-2.5 py-0.5 text-xs font-medium text-text-muted">
                {products} products
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}