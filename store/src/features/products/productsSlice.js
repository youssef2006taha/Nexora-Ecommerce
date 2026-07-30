import { createSlice } from "@reduxjs/toolkit";
import { getProductsThunk } from "./Thunks/getAllProductsThunk.js";
// =================== INITIAL STATE ===================
const initialState = {
  products: [],
  filteredProducts: [],
  paginationProducts: [],
  filters: {
    inputSearch: "",
    category: "All Categories",
    minPrice: "",
    maxPrice: "",
    sortedBy: "Default",
  },
  loading: false,
  error: null,
  success: false,
  limit: 2,
  totalPages: 1,
  currentPage: 1,
  totalProducts: 0,
};

const filterProducts = (products = [], filters) => {
  const { inputSearch, category, minPrice, maxPrice, sortedBy } = filters;

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      category === "All Categories" ||
      product.category?.toLowerCase() === category?.toLowerCase();

    const minPriceMatch = minPrice ? product.price >= minPrice : true;

    const maxPriceMatch = maxPrice ? product.price <= maxPrice : true;

    const inputSearchMatch =
      !inputSearch ||
      product.name?.toLowerCase().includes(inputSearch?.trim().toLowerCase());

    return categoryMatch && minPriceMatch && maxPriceMatch && inputSearchMatch;
  });

  return [...filteredProducts].sort((a, b) => {
    switch (sortedBy) {
      case "Price Low → High":
        return a.price - b.price;

      case "Price High → Low":
        return b.price - a.price;

      case "Name A-Z":
        return a.name.localeCompare(b.name);

      case "Name Z-A":
        return b.name.localeCompare(a.name);

      case "Default":
      default:
        return 0;
    }
  });
};

const productsPaginationCalc = (products, page, limit = 10) => {
  const paginationOrders = [];

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  for (let i = startIndex; i < endIndex && i < products.length; i++) {
    paginationOrders.push(products[i]);
  }

  return paginationOrders;
};

const pagesCount = (count, limit = 10) => {
  return Math.ceil(count / limit);
};

// =================== SLICE ===================
const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    clearStatus(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },

    setFiltersProducts(state, action) {
      state.filters = action.payload;
      state.filteredProducts = filterProducts(state.products, action.payload);
      state.paginationProducts = productsPaginationCalc(
        state.filteredProducts,
        1,
        state.limit,
      );
      state.currentPage = 1;
      state.totalPages = pagesCount(state.filteredProducts.length, state.limit);
    },

    setPage(state, action) {
      state.currentPage = action.payload;
      state.paginationProducts = productsPaginationCalc(
        state.filteredProducts,
        state.currentPage,
        state.limit,
      );
    },

    resetFilters(state) {
      state.filters = {
        inputSearch: "",
        category: "All Categories",
        minPrice: "",
        maxPrice: "",
        sortBy: "Default",
      };
      state.filteredProducts = filterProducts(state.products, state.filters);
      state.paginationProducts = productsPaginationCalc(
        state.filteredProducts,
        state.currentPage,
        state.limit,
      );
      state.totalPages = pagesCount(
        state.filteredProducts?.length,
        state.limit,
      );
    },
  },

  extraReducers: (builder) => {
    builder

      // ========== GET ALL Products ==========
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.success = true;
        state.loading = false;
        state.limit = action.payload.productsPerPage;
        state.products = action.payload?.products;
        state.filteredProducts = filterProducts(
          action.payload?.products,
          state.filters,
        );
        state.paginationProducts = productsPaginationCalc(
          state.filteredProducts,
          state.currentPage,
          state.limit,
        );
        state.totalPages = pagesCount(
          state.filteredProducts?.length,
          state.limit,
        );
        state.totalProducts = action.payload?.totalProducts;
      })
      .addCase(getProductsThunk.rejected, (state) => {
        state.success = false;
        state.loading = false;
      });
  },
});

export const { clearStatus, setFiltersProducts, setPage, resetFilters } =
  productsSlice.actions;

export default productsSlice.reducer;
