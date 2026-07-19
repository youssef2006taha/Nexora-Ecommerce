import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

function ProductFilters({
  inputValue,
  setInputValue,
  handleSearchClick,
  isFilterOpen,
  setIsFilterOpen,
  selectedCategory,
  setSelectedCategory,
  categories,
  subcategoryQuery,
  setSubcategoryQuery,
}) {

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSubcategoryQuery("");

    setTimeout(() => {
      handleSearchClick();
    }, 0);
  };

  const hasActiveFilters = selectedCategory || subcategoryQuery;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-xl-value)] p-5 space-y-5 shadow-sm transition-all">
      
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-placeholder)]" />
          <input
            type="text"
            placeholder="Search products..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
            className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md-value)] pl-11 pr-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-placeholder)] focus:outline-none focus:border-[var(--border-focus)] transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex-1 sm:flex-none px-5 py-3 rounded-[var(--radius-md-value)] flex items-center justify-center gap-2 text-sm font-semibold transition-all border cursor-pointer ${
              isFilterOpen
                ? "bg-[var(--primary-light)] border-[var(--border-focus)] text-[var(--primary)]"
                : "bg-[var(--bg-main)] border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
            }`}
          >
            <SlidersHorizontal
              className={`w-4 h-4 transition-colors ${isFilterOpen ? "text-[var(--primary)]" : "text-[var(--text-muted)]"}`}
            />
            <span>Filters</span>
          </button>

          <button
            type="button"
            onClick={handleSearchClick}
            className="flex-1 sm:flex-none bg-[var(--primary)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] text-[var(--text-white)] px-6 py-3 rounded-[var(--radius-md-value)] flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer"
            style={{ shadow: "var(--shadow-primary-value)" }}
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>

      </div>

      {isFilterOpen && (
        <div className="pt-5 border-t border-[var(--divider)] space-y-4 animate-in fade-in duration-200">
          
          {hasActiveFilters && (
            <div className="flex justify-end items-center">
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors font-medium cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Clear Filters
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md-value)] p-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-all cursor-pointer"
              >
                <option value="" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">All Categories</option>
                {categories.map((category, index) => (
                  <option 
                    key={index} 
                    value={category} 
                    className="bg-[var(--bg-surface)] text-[var(--text-primary)]"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Subcategory
              </label>
              <input
                type="text"
                placeholder="e.g. smartphones"
                value={subcategoryQuery}
                onChange={(e) => setSubcategoryQuery(e.target.value)}
                className="w-full bg-[var(--bg-main)] border border-[var(--border)] rounded-[var(--radius-md-value)] p-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-placeholder)] focus:outline-none focus:border-[var(--border-focus)] transition-all"
              />
            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default ProductFilters;