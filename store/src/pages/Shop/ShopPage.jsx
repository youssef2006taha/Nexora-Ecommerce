import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductCard from "../../components/UI/ProductCart";

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
      const response = await api.get("/products");
      setProducts(response.data?.products || response.products || []);
    } catch (error) {
      console.error(error);
    }
  }

  // Categories
  const categories = [
    ...new Set(
      products
        .map((p) =>
          typeof p.category === "object"
            ? p.category?.name
            : p.category
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

      const price =
        product.discountPrice || product.price;

      const searchMatch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch =
        category === "" ||
        productCategory === category;

      const minMatch =
        minPrice === "" ||
        price >= Number(minPrice);

      const maxMatch =
        maxPrice === "" ||
        price <= Number(maxPrice);

      return (
        searchMatch &&
        categoryMatch &&
        minMatch &&
        maxMatch
      );
    })
    .sort((a, b) => {
      const priceA =
        a.discountPrice || a.price;

      const priceB =
        b.discountPrice || b.price;

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

  return (

 <div className="min-h-screen bg-[#f8f9fb] p-6">

  {/* Search */}
  <div className="mb-6">
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
    />
  </div>

  <div className="flex gap-6">

    {/* Sidebar */}
    <aside className="hidden md:block w-72 rounded-2xl bg-white border border-gray-200 p-5 h-fit shadow-sm">

      <h2 className="text-lg font-semibold mb-6">
        Filters
      </h2>

      {/* Categories */}
      <div className="mb-8">

        <h3 className="font-semibold mb-3">
          Categories
        </h3>

        <div className="space-y-3">

          <label className="flex items-center gap-2">

            <input
              type="radio"
              value=""
              checked={category === ""}
              onChange={(e) => setCategory(e.target.value)}
            />

            All Categories

          </label>

          {categories.map((cat) => (

            <label
              key={cat}
              className="flex items-center gap-2"
            >

              <input
                type="radio"
                value={cat}
                checked={category === cat}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              />

              {cat}

            </label>

          ))}

        </div>

      </div>

      {/* Price */}

      <div className="mb-8">

        <h3 className="font-semibold mb-3">
          Price Range
        </h3>

        <div className="flex gap-2">

          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e)=>setMinPrice(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e)=>setMaxPrice(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

        </div>

      </div>

      {/* Sort */}

      <div className="mb-8">

        <h3 className="font-semibold mb-3">
          Sort By
        </h3>

        <select
          value={sortBy}
          onChange={(e)=>setSortBy(e.target.value)}
          className="w-full border rounded-lg p-3"
        >

          <option value="default">
            Default
          </option>

          <option value="low">
            Price Low → High
          </option>

          <option value="high">
            Price High → Low
          </option>

          <option value="az">
            Name A-Z
          </option>

          <option value="za">
            Name Z-A
          </option>

        </select>

      </div>

      <button
        onClick={()=>{
          setSearch("");
          setCategory("");
          setMinPrice("");
          setMaxPrice("");
          setSortBy("default");
        }}
        className="w-full bg-violet-600 text-white rounded-xl py-3 hover:bg-violet-700"
      >

        Clear All Filters

      </button>

    </aside>

    {/* Products */}

    <main className="flex-1">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Shop
        </h1>

        <span className="text-gray-500">

          {filteredProducts.length} Products

        </span>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {filteredProducts.map((product)=>(

          <ProductCard
            key={product._id}
            product={product}
          />

        ))}

      </div>

    </main>

  </div>

</div>
);
}

export default ShopPage;