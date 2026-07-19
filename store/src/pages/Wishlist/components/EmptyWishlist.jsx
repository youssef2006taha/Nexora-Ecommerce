import { useNavigate } from 'react-router-dom'

function EmptyWishlist() {
  const navigate = useNavigate()

  const handleBrowseProducts = () => {
    navigate('/shop')
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        {/* Circle icon */}
        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-10 h-10 text-slate-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s-6.716-4.35-9.428-8.06C.86 10.42 1.2 6.9 3.6 5.1 5.7 3.53 8.63 3.9 10.4 5.9L12 7.7l1.6-1.8c1.77-2 4.7-2.37 6.8-.8 2.4 1.8 2.74 5.32 1.03 7.84C18.716 16.65 12 21 12 21z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Your wishlist is empty
        </h2>

        {/* Description */}
        <p className="text-slate-500 mb-8 leading-relaxed">
          Save items you love to your wishlist. They'll be waiting for you
          here.
        </p>

        {/* CTA Button */}
        <button
          type="button"
          onClick={handleBrowseProducts}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Browse Products
        </button>
      </div>
    </div>
  )
}

export default EmptyWishlist
