import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"

function ShopPage() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    loadProducts();
  }, []);


  async function loadProducts() {
    try {
      const data = await api.get("/products");
      console.log(data);

      setProducts(data.products);

    } catch (error) {
      console.error(error);
    }
  }


  const categories = [
    ...new Set(products.map(product => product.category))
  ];


  const filteredProducts = products.filter((product) => {

    const searchMatch =
      product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());


    const categoryMatch =
      category === "" ||
      product.category === category;


    return searchMatch && categoryMatch;

  });


  function addToCart(product) {
    console.log("Added To Cart:", product);
  }


  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Shop Page
      </h1>


      {/* Search + Filter */}
      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border rounded-lg p-3 flex-1"
        />


        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="border rounded-lg p-3"
        >

          <option value="">
            All Categories
          </option>

          {categories.map((cat)=>(
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}

        </select>

      </div>



      {/* Products Grid */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-6
      ">


        {filteredProducts.map((product)=>(

          <div
            key={product._id}
            className="
              bg-white
              border
              rounded-xl
              p-4
              shadow-sm
              hover:shadow-md
              transition
              flex
              flex-col
              justify-between
            "
          >


            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className="
                w-full
                h-52
                object-contain
                mb-4
              "
            />


            <h3 className="font-bold text-lg">
              {product.name}
            </h3>


            <p className="text-gray-700 mt-2">
              ${product.discountPrice || product.price}
            </p>


            <p className="text-yellow-500 mt-2">
              ⭐ {product.rating || 0}
            </p>



            <div className="flex gap-2 mt-5">


              <button
                onClick={() =>
                  navigate(`/products/${product._id}`)
                }
                className="
                  flex-1
                  border
                  rounded-lg
                  py-2
                "
              >
                View Details
              </button>


              <button
                onClick={() => addToCart(product)}
                className="
                  flex-1
                  bg-blue-600
                  text-white
                  rounded-lg
                  py-2
                "
              >
                Add To Cart
              </button>


            </div>


          </div>

        ))}


      </div>


    </div>
  );
}

export default ShopPage;