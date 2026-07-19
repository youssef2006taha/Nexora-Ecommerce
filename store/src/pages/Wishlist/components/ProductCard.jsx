import { useWishlist } from '../context/WishlistContext.jsx'

function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const liked = isInWishlist(product.id)

  const handleToggle = () => {
    toggleWishlist(product)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        {/* Heart / like button */}
        <button
          type="button"
          onClick={handleToggle}
          aria-pressed={liked}
          aria-label={
            liked ? 'Remove from wishlist' : 'Add to wishlist'
          }
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={1.5}
            className={`w-5 h-5 transition-colors duration-150 ${
              liked ? 'text-red-500' : 'text-slate-400'
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s-6.716-4.35-9.428-8.06C.86 10.42 1.2 6.9 3.6 5.1 5.7 3.53 8.63 3.9 10.4 5.9L12 7.7l1.6-1.8c1.77-2 4.7-2.37 6.8-.8 2.4 1.8 2.74 5.32 1.03 7.84C18.716 16.65 12 21 12 21z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-slate-800 font-semibold mb-1">{product.name}</h3>
        <p className="flex items-baseline gap-2">
          <span className="text-indigo-600 font-bold">
            EGP {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-slate-400 text-sm line-through">
              EGP {product.originalPrice}
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
