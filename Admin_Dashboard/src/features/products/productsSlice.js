import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductByIdThunk } from "./Thunks/GetSingleProductThunk.js";
import { addProductThunk } from "./Thunks/AddProductThunk.js";
import { updateProductThunk } from "./Thunks/UpdateProductThunk.js";
import { deleteProductThunk } from "./Thunks/DeleteProductThunk.js";

// =================== GET ALL PRODUCTS ===================
export const getAllProducts = createAsyncThunk(
  "products/getAllproducts",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        "https://e-commerce-api-3wara.vercel.app/products",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MzQ1MzgxNCwiZXhwIjoxNzgzODg1ODE0fQ.sEKU3pOYCPuKG06CUT4A2fegt3GzeugQ711DgGL7XEo`,
          },
        },
      );

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// =================== EDIT PRODUCT ===================
export const editProduct = createAsyncThunk(
  "products/editproduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://e-commerce-api-3wara.vercel.app/products/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MzQ1MzgxNCwiZXhwIjoxNzgzODg1ODE0fQ.sEKU3pOYCPuKG06CUT4A2fegt3GzeugQ711DgGL7XEo`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();
      console.log(data.message);
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// =================== INITIAL STATE ===================
const initialState = {
  products: [],
  product: null,
  count: 0,
  loading: false,
  error: null,
  success: false,
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
  },

  extraReducers: (builder) => {
    builder

      // ========== GET ALL Products ==========
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload?.count;
        state.products = action.payload?.products;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= GET PRODUCT BY ID =================
      .addCase(getProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload.product;
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // ========== Add ==========
      .addCase(addProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = state.products.filter(
          (product) => product._id !== action.payload,
        );
      })
      .addCase(addProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== DELETE ==========
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.id,
        );
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== EDIT ==========
      .addCase(updateProductThunk.pending, (state) => {
        state.error = null;
        state.success = false;
      })

      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        console.log("product", action.payload.product);
        state.products = state.products.map((product) =>
          product._id === action.payload.product._id
            ? action.payload.product
            : product,
        );
      })

      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatus } = productsSlice.actions;

export default productsSlice.reducer;
