import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserProfileApi } from "../../../api/auth/authApi";

export const UpdateUserProfileThunk = createAsyncThunk(
  "users/updateProfile",
  async ({ id, formData }, thunkAPI) => {
    try {
      const result = await updateUserProfileApi(id, {
        ...formData,
        addresses: {
          country: "Egypt",
          city: "Cairo",
          street: "New Street",
          building: "B10",
          postalCode: "11511",
          defaultAddress: true,
        },
      });

      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update profile.",
      );
    }
  },
);
