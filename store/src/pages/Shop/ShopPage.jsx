import { useState, useEffect } from "react";
import ProductCard from "../../components/UI/ProductCart";
import FilterDrawer from "./sections/FilterDrawer";
import ActiveFilters from "./sections/ActiveFilters";
import { useSelector, useDispatch } from "react-redux";

import { getProductsThunk } from "../../features/products/Thunks/getAllProductsThunk";
import {
  setFiltersProducts,
  setPage,
} from "../../features/products/productsSlice";

import { SlidersHorizontal } from "lucide-react";
import Input from "../../components/UI/Input";
import Pagination from "../../components/UI/Pagination";
import { Button } from "@mui/material";

function ShopPage() {
  const {
    products,
    filteredProducts,
    paginationProducts,
    totalPages,
    currentPage,
    filters,
  } = useSelector((store) => store.products);

  const [openFilterationDrawer, setOpenFilterationDrawer] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const productsPerPage = 4;
      dispatch(getProductsThunk(productsPerPage)).unwrap();
    } catch (error) {
      console.log(error);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const paginationHandler = (_, value) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(setPage(value));
  };

  return (
    <div className="min-h-screen bg-bg-main p-6">
      {/* Search */}
      <div className="flex gap-4 items-center mb-6">
        <Input
          type="text"
          placeholder="Search products..."
          value={filters.inputSearch}
          onChange={(e) => {
            const newValue = { ...filters, inputSearch: e.target.value };
            dispatch(setFiltersProducts(newValue));
          }}
          icon={true}
        />
        <Button
          variant="outlined"
          onClick={() => {
            setOpenFilterationDrawer(true);
          }}
          className="md:!hidden !min-w-0 !w-14 !p-2 !rounded-md !text-primary !bg-primary/4 !border-1 !border-primary/20 hover:!bg-primary/10 dark:hover:!bg-primary dark:hover:!text-white !transition !duration-100"
        >
          <SlidersHorizontal className="!size-5" />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <ActiveFilters />
        <div className="flex gap-6">
          <FilterDrawer
            open={openFilterationDrawer}
            setOpen={setOpenFilterationDrawer}
            filters={filters}
          />

          {/* Products */}
          <main className="flex-1">
            <div className="flex justify-between border border-border py-2 px-5 bg-primary/20 rounded-2xl items-center mb-6">
              <h1 className="text-2xl font-bold text-text-primary">Shop</h1>
              <span className="text-text-muted">
                {products.length} Products
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginationProducts.map((product) => (
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
        {(paginationProducts?.length > 0 || filteredProducts?.length > 0) && (
          <div className="mx-auto rounded-3xl bg-bg-card p-4 w-fit sm:w-full shadow">
            <div className="flex justify-between items-center">
              <p className="hidden sm:block text-xs text-text-primary/80">{`Page ${currentPage} of ${totalPages}`}</p>

              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                paginationHandler={paginationHandler}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;
