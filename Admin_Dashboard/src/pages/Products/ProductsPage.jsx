import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLoader from "../../components/UI/DashboardLoader";
import ProductHeader from "./product/ProductHeader";
import ProductStats from "./product/ProductStats";
import ProductFilters from "./product/ProductFilters";
import ProductCards from "./product/ProductCards";
import QuickEditProduct from "./product/quick-edit/QuickEditProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/products/productsSlice";
import { deleteProductThunk } from "../../features/products/Thunks/DeleteProductThunk";

function ProductsPage({ onNavigateToAddProduct }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategoryQuery, setSubcategoryQuery] = useState("");
  const [isQuickEditOpen, setIsQuickEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsDispatch = useDispatch();
  const deleteDispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.products);

  useEffect(() => {
    productsDispatch(getAllProducts());
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;
    try {
      deleteDispatch(deleteProductThunk(id));
    } catch (err) {
      console.error(err);
      alert("Could not delete product.");
    }
  };

  const handleViewProduct = (id) => navigate(`/products/view/${id}`);
  const handleEditProduct = (id) => navigate(`/products/edit/${id}`);

  const handleQuickEditProduct = (product) => {
    setSelectedProduct(product);
    setIsQuickEditOpen(true);
  };

  const handleSearchClick = () => setSearchQuery(inputValue);

  const totalProducts = products.length;
  const featuredProducts = products.filter(
    (p) => p.featured || p.isFeatured,
  ).length;
  const inStockProducts = products.filter(
    (p) => Number(p.stock || 0) > 0,
  ).length;
  const outOfStockProducts = products.filter(
    (p) => Number(p.stock || 0) === 0,
  ).length;

  const filteredProducts = products.filter((product) => {
    const name = product.name || product.title || "";
    const category = product.category || "";
    const description = product.subcategory || "";
    const matchesSearch = name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSubcategory =
      !subcategoryQuery ||
      description.toLowerCase().includes(subcategoryQuery.toLowerCase()) ||
      category.toLowerCase().includes(subcategoryQuery.toLowerCase());
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const categories = [
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  if (loading) return <DashboardLoader />;

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-6 md:space-y-8 animate-fadeIn">
      <ProductHeader onNavigateToAddProduct={onNavigateToAddProduct} />
      <ProductStats
        totalProducts={totalProducts}
        featuredProducts={featuredProducts}
        inStockProducts={inStockProducts}
        outOfStockProducts={outOfStockProducts}
      />
      <ProductFilters
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearchClick={handleSearchClick}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        subcategoryQuery={subcategoryQuery}
        setSubcategoryQuery={setSubcategoryQuery}
      />
      <ProductCards
        products={filteredProducts}
        onViewProduct={handleViewProduct}
        onEditProduct={handleEditProduct}
        onQuickEditProduct={handleQuickEditProduct}
        handleDeleteProduct={handleDeleteProduct}
      />
      <QuickEditProduct
        open={isQuickEditOpen}
        onClose={() => setIsQuickEditOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}

export default React.memo(ProductsPage);
