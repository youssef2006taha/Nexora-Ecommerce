import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
import ProductCard from "../../../components/UI/ProductCart";

const FeaturedProducts = () => 
{
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFeaturedProducts = async () => 
  {
    try 
    {
      setLoading(true);
      setError("");
      const data = await api.get("/products");
      const featuredProducts = data.products.filter(
        (product) => product.featured
      );
      setProducts(featuredProducts);
    } 
    catch (err) 
    {
        console.log(err);
        setError("Failed to load featured products.");
    }
    finally 
    {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  if (loading) 
  {
    return (
        <section className="dashboard-container py-16">
            <h2 className="text-center text-xl text-[--text-main]">Loading Featured Products...</h2>
        </section>
    );
  }

 if (error) 
 {
    return (
        <section className="dashboard-container py-16">
            <h2 className="text-center text-red-500">{error}</h2>
        </section>
    );
  }

return (
  <section className="dashboard-container py-16">

    {/* Header */}
    <div className="mb-10 flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold text-[--text-main]">Featured Products</h2>
            <p className="mt-2 text-[--text-muted]">Discover our handpicked premium products</p>
        </div>

      <Link to="/shop" className="rounded-[var(--radius-md)] bg-[--gold-primary] px-6 py-3 font-semibold text-white transition hover:bg-[--gold-hover]">
        View All
      </Link>
    </div>

    {/* Products */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
            key={product._id}
            product={{
                name: product.name,
                price: product.price,
                image: product.images?.[0]?.url,
                category: product.category,
                rating: product.averageRating,
                reviewsCount: product.numReviews,
                inStock: product.stock > 0,
                discount: product.discountPrice,
            }}
        />
        ))}
    </div>
  </section>
);
};

export default FeaturedProducts;