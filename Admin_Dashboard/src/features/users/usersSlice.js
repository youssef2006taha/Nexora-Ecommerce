import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersThunk } from "./Thunks/GetAllUsersThunk";
import { addUserThunk } from "./Thunks/AddUserThunk";
import { deleteUserThunk } from "./Thunks/DeleteUserThunk";
import { editUserThunk } from "./Thunks/EditUserThunk";
import { changeUserRoleThunk } from "./Thunks/ChangeUserRoleThunk";

// =================== INITIAL STATE ===================
const initialState = {
  users: [],
  count: 0,
  loading: false,
  error: null,
  success: false,
};

// =================== SLICE ===================
const usersSlice = createSlice({
  name: "users",
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

      // ========== GET ALL USERS ==========
      .addCase(getAllUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.count = action.payload?.count;
        state.users = action.payload?.users;
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload?.message;
      })

      // ========== Add ==========
      .addCase(addUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.count = state.count + 1;
        state.users.push(action.payload?.user);
      })
      .addCase(addUserThunk.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload?.message;
      })

      // ========== DELETE ==========
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.count = state.count - 1;
        state.users = state.users.filter((user) => user._id !== action.payload?._id);
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload?.message;
      })

      // ========== EDIT ==========
      .addCase(editUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(editUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.users = state.users.map((user) =>
          user._id === action.payload?.user._id ? action.payload?.user : user,
        );
      })

      .addCase(editUserThunk.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload?.message;
      })

      // ========== CHANGE ROLE ==========
      .addCase(changeUserRoleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changeUserRoleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        const index = state.users.findIndex(
          (user) => user._id === action.payload?.user._id,
        );

        if (index !== -1) {
          state.users[index] = action.payload.user;
        }
      })
      .addCase(changeUserRoleThunk.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { clearStatus } = usersSlice.actions;

export default usersSlice.reducer;
