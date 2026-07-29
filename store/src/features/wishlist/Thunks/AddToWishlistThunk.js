import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddToWishlistThunk = createAsyncThunk(
  "wishlist/addWishlist",
  async (id, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const res = await axios.post(
        `https://e-commerce-api-3wara.vercel.app/wishlists/add/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product to wishlist."
      );
    }
  }
);





















// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const AddToWishlistThunk = createAsyncThunk(
//   "wishlist/addWishlist",
//   async (id, thunkAPI) => {
//     // const { token } = thunkAPI.getState().auth;
//     const token = localStorage.getItem("token");

//     try {
//       const res = await axios.post(
//         `https://e-commerce-api-3wara.vercel.app/wishlists/add/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       console.log(res.data);

//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to get wishlist.",
//       );
//     }
//   },
// );
