import { useNavigate } from 'react-router-dom'
import { categories } from './data/categories'
import { TbArrowUpRight } from 'react-icons/tb'

export default function ShopByCategory() {
  const navigate = useNavigate()

  const goToCategory = (categoryId) => {
    navigate(`/shop?category=${categoryId}`)
  }

  return (
    <section className="py-10 relative overflow-hidden" id='CategorySec'>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-full dark:block">
        <div className="mx-auto h-[420px] max-w-3xl bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="mx-auto w-full w-full px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 h-1 w-10 rounded-full bg-blue-500" />
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Shop by Category
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Browse our wide range of categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
          {categories.map(({ id, name, products, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => goToCategory(id)}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                dark:border-white/[0.08] dark:bg-slate-900/60 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] dark:backdrop-blur-sm
                dark:hover:-translate-y-1.5 dark:hover:border-blue-400/30 dark:hover:bg-slate-800/80 dark:hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.35)]"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden dark:block" />
              <span className="pointer-events-none absolute -top-6 h-24 w-24 rounded-full bg-blue-500/0 blur-2xl transition-colors duration-300 group-hover:bg-blue-500/20 hidden dark:block" />

              <span className="absolute right-4 top-4 flex h-7 w-7 -translate-y-1 items-center justify-center rounded-full bg-slate-50 text-slate-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-white/5 dark:text-slate-500">
                <TbArrowUpRight className="h-4 w-4" />
              </span>

              <span className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-100 dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-blue-500/5 dark:text-blue-400 dark:ring-1 dark:ring-inset dark:ring-blue-400/20 dark:group-hover:from-blue-500/30 dark:group-hover:to-blue-500/10 dark:group-hover:text-blue-300">
                <Icon className="h-7 w-7" strokeWidth={1.75} />
              </span>

              <span className="relative text-lg font-semibold text-slate-900 dark:text-white">
                {name}
              </span>

              <span className="relative mt-2 inline-flex items-center rounded-full bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-500 dark:bg-white/5 dark:text-slate-400">
                {products} products
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}