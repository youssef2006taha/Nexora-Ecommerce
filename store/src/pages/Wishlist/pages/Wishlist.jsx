import { Link } from 'react-router-dom'
import EmptyWishlist from '../components/EmptyWishlist.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()

  if (wishlist.length === 0) {
    return <EmptyWishlist />
  }

  const handleAddToCart = (product) => {
    // Hook this up to your real cart logic
    console.log('Added to cart:', product)
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 sm:px-10 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-8">
          My Wishlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-slate-100 overflow-hidden"
            >
              {/* Image area */}
              <div className="bg-slate-50 flex items-center justify-center h-72">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-slate-700 mb-1">{product.name}</p>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-indigo-600 font-bold text-lg">
                    EGP {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-slate-400 text-sm line-through">
                      EGP {product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.883-4.752 2.244-7.303a1.125 1.125 0 00-1.113-1.276H6.911M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    Add to Cart
                  </button>

                  {/* Delete / remove from wishlist */}
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/shop"
            className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            ← Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
