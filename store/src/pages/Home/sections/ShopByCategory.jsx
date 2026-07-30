import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaLaptop,
  FaMobileAlt,
  FaTshirt,
  FaCouch,
  FaGamepad,
  FaShoppingBag,
} from "react-icons/fa";
import { TbArrowUpRight } from "react-icons/tb";
import BackgroundCircle from "../../../components/UI/BackgroundCircle";

import { setFiltersProducts } from "../../../features/products/productsSlice";

const API_BASE = "https://e-commerce-api-3wara.vercel.app";

const categoryIcons = {
  electronics: FaLaptop,
  mobiles: FaMobileAlt,
  fashion: FaTshirt,
  furniture: FaCouch,
  gaming: FaGamepad,
  default: FaShoppingBag,
};

export default function ShopByCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { filters } = useSelector((store) => store.products);

  const goToCategory = (category) => {
    dispatch(setFiltersProducts({ ...filters, category: category }));
    navigate(`/shop`);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products`, {
          params: { page: 1, limit: 100 },
        });

        if (res.data.success) {
          const grouped = {};

          res.data.products.forEach((product) => {
            const category = product.category;

            if (!grouped[category]) {
              grouped[category] = {
                id: category,
                name: category.charAt(0).toUpperCase() + category.slice(1),
                products: 0,
              };
            }

            grouped[category].products += 1;
          });

          setCategories(Object.values(grouped));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <h2
          className="text-lg font-semibold animate-pulse"
          style={{ color: "var(--text-muted)" }}
        >
          Loading Categories...
        </h2>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-8 mb-10" id="CategorySec">
      <BackgroundCircle
        size={350}
        color="var(--Background-Circle-color-1)"
        opacity="var(--Background-Circle-opacity-1)"
        blur={130}
        top="-5%"
        left="50%"
        className="absolute -translate-x-1/2"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <span
            className="mb-3 h-1 w-10 rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
          />

          <h2
            className="text-3xl font-extrabold sm:text-4xl tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Shop by Category
          </h2>

          <p
            className="mt-2 text-sm sm:text-base"
            style={{ color: "var(--text-muted)" }}
          >
            Browse our wide range of categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {categories.map(({ id, name, products }) => {
            const Icon = categoryIcons[id] || categoryIcons.default;

            return (
              <button
                key={id}
                type="button"
                onClick={() => goToCategory(id)}
                className="group relative flex flex-col items-center overflow-hidden rounded-2xl border px-6 py-10 text-center transition-all duration-300 hover:-translate-y-1 focus:outline-none"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-xs-value)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md-value)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "var(--shadow-xs-value)";
                }}
              >
                <span
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
                  style={{
                    backgroundColor: "var(--bg-hover)",
                    color: "var(--primary)",
                  }}
                >
                  <TbArrowUpRight className="h-4 w-4" />
                </span>

                <span
                  className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: "var(--primary-light)",
                    color: "var(--primary)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <Icon className="h-7 w-7" />
                </span>

                <span
                  className="relative text-lg font-bold transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  {name}
                </span>

                <span
                  className="relative mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--bg-hover)",
                    color: "var(--text-muted)",
                  }}
                >
                  {products} products
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
