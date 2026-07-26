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
  paginationUsers: [],
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
  success: false,
};

const usersPaginationCalc = (users, page, limit = 10) => {
  const paginationUsers = [];

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  for (let i = startIndex; i < endIndex && i < users.length; i++) {
    paginationUsers.push(users[i]);
  }

  return paginationUsers;
};

const pagesCount = (count, limit = 10) => {
  return Math.ceil(count / limit);
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

    setPage(state, action) {
      state.currentPage = action.payload;
      state.paginationUsers = usersPaginationCalc(state.users, action.payload);
    },

    searchUser(state, action) {
      const filteredUsers = state.users?.filter((user) =>
        user?.username?.toLowerCase().includes(action.payload.toLowerCase()),
      );

      state.totalPages = pagesCount(filteredUsers.length);
      state.currentPage = 1;
      state.paginationUsers = filteredUsers;
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
        state.paginationUsers = usersPaginationCalc(
          action.payload?.users,
          state.currentPage,
        );
        state.totalPages = pagesCount(action.payload?.count);
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
        state.users.unshift(action.payload?.user);
        state.totalPages = pagesCount(state.count);
        state.currentPage = 1;
        state.paginationUsers = usersPaginationCalc(state.users, 1);
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
        state.users = state.users.filter(
          (user) => user._id !== action.payload?._id,
        );

        state.totalPages = pagesCount(state.count);

        state.currentPage =
          state.currentPage <= state.totalPages
            ? state.currentPage
            : state.totalPages;

        state.paginationUsers = usersPaginationCalc(
          state.users,
          state.currentPage,
        );
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
        state.paginationUsers = usersPaginationCalc(
          state.users,
          state.currentPage,
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

        state.paginationUsers = usersPaginationCalc(
          state.users,
          state.currentPage,
        );
      })
      .addCase(changeUserRoleThunk.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { clearStatus, setPage, searchUser } = usersSlice.actions;

export default usersSlice.reducer;
