export default function FilterSidebar({
  categories,
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  onClearFilters,
}) {
  return (
    <aside className="hidden md:block w-72 rounded-lg bg-bg-card border border-border p-5 h-fit shadow-xs">
      <h2 className="text-lg font-semibold mb-6 text-text-primary">Filters</h2>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-text-primary">Categories</h3>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
            <input
              type="radio"
              name="category"
              value=""
              checked={category === ""}
              onChange={(e) => setCategory(e.target.value)}
              className="accent-primary"
            />
            All Categories
          </label>

          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-text-secondary cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={(e) => setCategory(e.target.value)}
                className="accent-primary"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-text-primary">Price Range</h3>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-border rounded-md p-2 bg-bg-surface text-text-primary placeholder:text-text-placeholder outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
          />

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-border rounded-md p-2 bg-bg-surface text-text-primary placeholder:text-text-placeholder outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
          />
        </div>
      </div>

      {/* Sort */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-text-primary">Sort By</h3>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-border rounded-md p-3 bg-bg-surface text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
        >
          <option value="default">Default</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
          <option value="az">Name A-Z</option>
          <option value="za">Name Z-A</option>
        </select>
      </div>

      <button
        onClick={onClearFilters}
        className="w-full bg-primary text-text-white rounded-lg py-3 font-medium shadow-primary transition-colors hover:bg-primary-hover"
      >
        Clear All Filters
      </button>
    </aside>
  );
}