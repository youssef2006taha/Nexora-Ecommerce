import { useEffect, useState } from 'react'

// ---------------------------------------------------------------------
// API layer - replace BASE_URL + endpoints with your real backend.
// The component still works with no backend connected: it just stays
// empty until liked items are actually saved on the server.
// ---------------------------------------------------------------------
const BASE_URL = 'https://api.example.com'

async function apiRequest(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!response.ok) throw new Error(`API request failed: ${response.status}`)
  if (response.status === 204) return null
  return response.json()
}

const fetchWishlist = () => apiRequest('/wishlist')
const removeFromWishlistApi = (productId) =>
  apiRequest(`/wishlist/${productId}`, { method: 'DELETE' })

function HeartIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-6.716-4.35-9.428-8.06C.86 10.42 1.2 6.9 3.6 5.1 5.7 3.53 8.63 3.9 10.4 5.9L12 7.7l1.6-1.8c1.77-2 4.7-2.37 6.8-.8 2.4 1.8 2.74 5.32 1.03 7.84C18.716 16.65 12 21 12 21z"
      />
    </svg>
  )
}

function Wishlist() {
  // Starts empty - only fills up once the API returns whatever the user
  // has already liked from the product page(s).
  const [wishlist, setWishlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    fetchWishlist()
      .then((data) => {
        if (isMounted) setWishlist(data)
      })
      .catch((err) => {
        // No backend connected yet - just stay empty, no crash.
        console.warn('Wishlist API not available yet:', err.message)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  const removeFromWishlist = (productId) => {
    const removedItem = wishlist.find((item) => item.id === productId)

    // Optimistic update
    setWishlist((prev) => prev.filter((item) => item.id !== productId))

    removeFromWishlistApi(productId).catch((err) => {
      console.warn('Could not sync removal with API:', err.message)
      // Roll back if the API call failed
      if (removedItem) setWishlist((prev) => [...prev, removedItem])
    })
  }

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
        <p className="text-slate-400">Loading your wishlist...</p>
      </div>
    )
  }

  // ---- Empty state ----
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4">
        <div className="flex flex-col items-center text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
            <HeartIcon className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Your wishlist is empty
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Save items you love to your wishlist. They'll be waiting for you
            here.
          </p>
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  // ---- Filled state ----
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
              <div className="bg-slate-50 flex items-center justify-center h-72">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

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
      </div>
    </div>
  )
}

export default Wishlist
