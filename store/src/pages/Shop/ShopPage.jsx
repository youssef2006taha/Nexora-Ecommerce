import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductCard from "../../components/UI/ProductCartUpdate";
import FilterSidebar from "./sections/FilterSidebar";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Price Filter
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Sort
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      // api.get already unwraps res.data — don't call .data again
      const data = await api.get("/products");
      setProducts(data?.products || []);
    } catch (error) {
      console.error(error);
    }
  }

  // Categories
  const categories = [
    ...new Set(
      products
        .map((p) =>
          typeof p.category === "object" ? p.category?.name : p.category
        )
        .filter(Boolean)
    ),
  ];

  // Filter + Search + Price
  const filteredProducts = products
    .filter((product) => {
      const productCategory =
        typeof product.category === "object"
          ? product.category?.name
          : product.category;

      const price = product.discountPrice || product.price;

      const searchMatch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch = category === "" || productCategory === category;

      const minMatch = minPrice === "" || price >= Number(minPrice);

      const maxMatch = maxPrice === "" || price <= Number(maxPrice);

      return searchMatch && categoryMatch && minMatch && maxMatch;
    })
    .sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      switch (sortBy) {
        case "low":
          return priceA - priceB;
        case "high":
          return priceB - priceA;
        case "az":
          return a.name.localeCompare(b.name);
        case "za":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  function handleClearFilters() {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
  }

  return (
    <div className="min-h-screen bg-bg-main p-6">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-placeholder outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-light"
        />
      </div>

      <div className="flex gap-6">
        <FilterSidebar
          categories={categories}
          category={category}
          setCategory={setCategory}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onClearFilters={handleClearFilters}
        />

        {/* Products */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-text-primary">Shop</h1>
            <span className="text-text-muted">
              {filteredProducts.length} Products
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-bg-card py-20 text-center">
              <p className="text-text-primary font-semibold mb-1">
                No products match your filters
              </p>
              <p className="text-text-muted text-sm">
                Try adjusting your search or clearing filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={{
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0]?.url,
                    category:
                      typeof product.category === "object"
                        ? product.category?.name
                        : product.category,
                    rating: product.averageRating,
                    reviewsCount: product.numReviews,
                    inStock: product.stock > 0,
                    discount: product.discountPrice,
                  }}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ShopPage;