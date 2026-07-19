import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import products from '../data/products.js'
import { useWishlist } from '../context/WishlistContext.jsx'

function Shop() {
  const { wishlist } = useWishlist()

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Shop</h1>

          <Link
            to="/wishlist"
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={wishlist.length > 0 ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={1.5}
              className={`w-5 h-5 ${
                wishlist.length > 0 ? 'text-red-500' : 'text-slate-500'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s-6.716-4.35-9.428-8.06C.86 10.42 1.2 6.9 3.6 5.1 5.7 3.53 8.63 3.9 10.4 5.9L12 7.7l1.6-1.8c1.77-2 4.7-2.37 6.8-.8 2.4 1.8 2.74 5.32 1.03 7.84C18.716 16.65 12 21 12 21z"
              />
            </svg>
            Wishlist ({wishlist.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Shop
