import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const UpdateUserProfileThunk = createAsyncThunk(
  "users/updateProfile",
  async ({ id, formData }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const res = await axios.patch(
        `https://e-commerce-api-3wara.vercel.app/users/${id}`,
        {
          ...formData,
          addresses: {
            country: "Egypt",
            city: "Cairo",
            street: "New Street",
            building: "B10",
            postalCode: "11511",
            defaultAddress: true,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("sdgdgdfg", res.data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update profile.",
      );
    }
  },
);
