import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../features/users/Thunks/GetAllUsersThunk";
import { deleteUserThunk } from "../../features/users/Thunks/DeleteUserThunk";
import { editUserThunk } from "../../features/users/Thunks/EditUserThunk";
import { changeUserRoleThunk } from "../../features/users/Thunks/ChangeUserRoleThunk";
import { showToast } from "../../features/Toast/toastSlice.js";
import UsersPageHeader from "./usersPageHeader";
import { useState, useEffect, useRef } from "react";
import { Button, Avatar, Tooltip } from "@mui/material";
import ConfirmationDialog from "./dialogs/ConfirmationDialog";
import EditUserDialog from "./dialogs/EditUserDialog";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const UsersPage = () => {
  const users = useSelector((store) => store.users);
  const usersDispatch = useDispatch();
  const toastDispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");

  // Edit User Dialog Control
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);

  // Confirmation Dialog Data
  const [confirmationDialogData, setConfirmationDialogData] = useState({
    title: "",
    message: "",
    confirmText: "",
    confirmButtonColor: "",
    action: null,
  });

  // Confirmation Dialog Control
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  // Edit User Dialog Data
  const [editUserDialogData, setEditUserDialogData] = useState({
    title: "",
    values: { username: "", phone: "", avatar: "" },
    onConfirm: null,
  });

  // Cell Height in Table of Users
  const [maxHeight, setMaxHeight] = useState(0);
  const td = useRef(null);
  const th = useRef(null);

  // Fetch users from API and set state on mount
  useEffect(() => {
    usersDispatch(getAllUsersThunk());
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  // Dynamic max height calculation to fit full table rows without clipping
  useEffect(() => {
    if (!users.users?.length) return;

    const rowHeight = td.current?.getClientRects()[0].height;

    if (rowHeight) {
      setMaxHeight(
        Math.floor((window.innerHeight * 0.9) / rowHeight) * rowHeight -
          Math.abs(rowHeight - th.current?.getClientRects()[0].height),
      );
    }
  }, [users]);

  const editUserHandler = (id, values) => {
    setEditUserDialogData({
      values,
      id,

      onConfirm: async (formData) => {
        try {
          await usersDispatch(editUserThunk({ id, formData })).unwrap();
          toastDispatch(
            showToast({
              message: "User updated successfully!",
              severity: "success",
            }),
          );
        } catch (error) {
          toastDispatch(
            showToast({
              message: error || "Failed to update user",
              severity: "error",
            }),
          );
        }

        setOpenEditUserDialog(false);
      },
    });

    setOpenEditUserDialog(true);
  };

  const deleteUserHandler = (id) => {
    setConfirmationDialogData({
      id,
      title: "Delete User",
      message: "Are you sure you want to delete this user permanently?",
      confirmText: "Delete",
      confirmButtonColor: "!bg-danger hover:!bg-danger/80",

      action: async () => {
        try {
          await usersDispatch(deleteUserThunk(id)).unwrap();
          toastDispatch(
            showToast({
              message: "User deleted successfully!",
              severity: "success",
            }),
          );
        } catch (error) {
          toastDispatch(
            showToast({
              message: error || "Failed to delete user",
              severity: "error",
            }),
          );
        }

        setOpenConfirmationDialog(false);
      },
    });

    setOpenConfirmationDialog(true);
  };

  const changeUserRoleHandler = (id, role) => {
    setConfirmationDialogData({
      id,
      title: "Change User Role",
      message: `Are you sure you want to change this user's role to ${role}?`,
      confirmText: "Change",
      confirmButtonColor: "!bg-success hover:!bg-success/80",

      action: async () => {
        try {
          await usersDispatch(
            changeUserRoleThunk({
              userId: id,
              role,
            }),
          ).unwrap();

          toastDispatch(
            showToast({
              message: "User role updated successfully!",
              severity: "success",
            }),
          );
        } catch (error) {
          toastDispatch(
            showToast({
              message: error || "Failed to change user role",
              severity: "error",
            }),
          );
        }

        setOpenConfirmationDialog(false);
      },
    });

    setOpenConfirmationDialog(true);
  };

  const filteredUsers = users.users?.filter((user) =>
    user?.username?.toLowerCase().includes(inputSearch.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-8 p-6">
      <UsersPageHeader
        inputSearch={inputSearch}
        handleSearch={(val) => setInputSearch(val)}
      />

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="flex justify-between items-center rounded-3xl p-6 border border-border bg-bg-card/75 dark:bg-bg-card shadow hover:shadow-sm hover:bg-info-bg/10 hover:-translate-y-1 transition duration-200 will-change-transform">
          <div className="flex flex-col gap-2">
            <h3 className="capitalize font-bold text-sm text-slate-600/80 dark:text-white/80">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-slate-700/80 dark:text-slate-100/90">
              {users.count}
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-300/50 dark:bg-slate-500 hover:rotate-12 transition duration-250 shadow-[0_0_5px] shadow-slate-500/40 dark:shadow-slate-400/70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users-icon lucide-users"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
        </div>

        {/* Admin */}
        <div className="flex justify-between items-center rounded-3xl p-6 border border-border bg-bg-card/75 dark:bg-bg-card shadow hover:shadow-sm hover:bg-info-bg/10 hover:-translate-y-1 transition duration-200 will-change-transform">
          <div className="flex flex-col gap-2">
            <h3 className="capitalize font-bold text-sm text-slate-600/80 dark:text-white/80">
              Admin
            </h3>
            <p className="text-3xl font-bold text-slate-700/80 dark:text-slate-100/90">
              {users.users.filter((user) => user.role === "admin").length}
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-300/50 dark:bg-slate-500 hover:rotate-12 transition duration-250 shadow-[0_0_5px] shadow-slate-500/40 dark:shadow-slate-400/70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shield-icon lucide-shield"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            </svg>
          </div>
        </div>

        {/* Customers */}
        <div className="flex justify-between items-center rounded-3xl p-6 border border-border bg-bg-card/75 dark:bg-bg-card shadow hover:shadow-sm hover:bg-info-bg/10 hover:-translate-y-1 transition duration-200 will-change-transform">
          <div className="flex flex-col gap-2">
            <h3 className="capitalize font-bold text-sm text-slate-600/80 dark:text-white/80">
              Customers
            </h3>
            <p className="text-3xl font-bold text-slate-700/80 dark:text-slate-100/90">
              {users.users.filter((user) => user.role === "customer").length}
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-300/50 dark:bg-slate-500 hover:rotate-12 transition duration-250 shadow-[0_0_5px] shadow-slate-500/40 dark:shadow-slate-400/70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users-icon lucide-users"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
        </div>

        {/* Verified */}
        <div className="flex justify-between items-center rounded-3xl p-6 border border-border bg-bg-card/75 dark:bg-bg-card shadow hover:shadow-sm hover:bg-info-bg/10 hover:-translate-y-1 transition duration-200 will-change-transform">
          <div className="flex flex-col gap-2">
            <h3 className="capitalize font-bold text-sm text-slate-600/80 dark:text-white/80">
              Verified
            </h3>
            <p className="text-3xl font-bold text-slate-700/80 dark:text-slate-100/90">
              {users.users.filter((user) => user.isVerified).length}
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-300/50 dark:bg-slate-500 hover:rotate-12 transition duration-250 shadow-[0_0_5px] shadow-slate-500/40 dark:shadow-slate-400/70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user-check-icon lucide-user-check"
            >
              <path d="m16 11 2 2 4-4" />
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div
        className="overflow-auto rounded-2xl border border-border shadow-lg hide-scrollbar dark:border-secondary/30"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        <table className="min-w-[620px] sm:min-w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-bg-main text-text-primary/85">
            <tr ref={th} className="bg-secondary/13 dark:bg-secondary/20">
              <th className="py-4 px-6 text-left">User</th>
              <th className="py-4 px-6 text-center">Role</th>
              <th className="py-4 px-6 text-center">Verified</th>
              <th className="py-4 px-6 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="bg-secondary/1 dark:bg-bg-card">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index, array) => (
                <tr
                  ref={index === 0 ? td : null}
                  key={user._id}
                  className="hover:bg-secondary/4 transition"
                >
                  <td
                    className={`py-4 px-6 ${
                      index === array.length - 1 ? "" : "border-b"
                    } border-secondary/15 dark:border-secondary/20`}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar alt={user.username} src={user.avatar}>
                        {user.username.slice(0, 2)}
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <h3 className="capitalize">{user.username}</h3>
                        <p className="text-sm text-text-muted/75">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td
                    className={`py-4 px-6 text-center ${
                      index === array.length - 1 ? "" : "border-b"
                    } border-secondary/15 dark:border-secondary/20`}
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ring-1 transition-all duration-200 ${
                        user.role === "admin"
                          ? "bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20"
                          : "bg-sky-100 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/20"
                      }`}
                    >
                      {user.role === "admin" ? (
                        <span>Admin</span>
                      ) : (
                        <span>Customer</span>
                      )}
                    </span>
                  </td>

                  <td
                    className={`py-4 px-6 text-center text-sm ${
                      user.isVerified ? "text-green-500" : "text-red-500"
                    } ${
                      index === array.length - 1 ? "" : "border-b"
                    } border-secondary/15 dark:border-secondary/20`}
                  >
                    {user.isVerified ? "✅ Verified" : "❌ Not Verified"}
                  </td>

                  <td
                    className={`py-4 px-6 text-center ${
                      index === array.length - 1 ? "" : "border-b"
                    } border-secondary/15 dark:border-secondary/20`}
                  >
                    <div className="flex justify-center items-center gap-3">
                      {/* Edit */}
                      <Tooltip
                        title="Edit User"
                        slotProps={{
                          tooltip: {
                            className:
                              "!bg-slate-200 dark:!bg-slate-700 !border !border-slate-300 dark:!border-slate-500/80 !text-slate-600 dark:!text-white",
                          },
                          popper: {
                            modifiers: [
                              {
                                name: "offset",
                                options: {
                                  offset: [0, -5],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        <Button
                          className="!bg-blue-600 !text-white hover:!bg-blue-700 !min-w-0 !w-8 !h-8 !p-0 !flex !items-center !justify-center !rounded-xl"
                          onClick={() =>
                            editUserHandler(user._id, {
                              username: user.username,
                              phone: user.phone,
                              avatar: user.avatar,
                            })
                          }
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                      </Tooltip>

                      {/* Approve */}
                      <Tooltip
                        title="Toggle Role"
                        slotProps={{
                          tooltip: {
                            className:
                              "!bg-slate-200 dark:!bg-slate-700 !border !border-slate-300 dark:!border-slate-500/80 !text-slate-600 dark:!text-white",
                          },
                          popper: {
                            modifiers: [
                              {
                                name: "offset",
                                options: {
                                  offset: [0, -5],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        <Button
                          className="!bg-green-600 !text-white hover:!bg-green-800 !min-w-0 !w-8 !h-8 !p-0 !flex !items-center !justify-center !rounded-xl"
                          onClick={() =>
                            changeUserRoleHandler(
                              user._id,
                              user.role === "admin" ? "customer" : "admin",
                            )
                          }
                        >
                          <CheckCircleIcon fontSize="small" />
                        </Button>
                      </Tooltip>

                      {/* Delete */}
                      <Tooltip
                        title="Delete User"
                        slotProps={{
                          tooltip: {
                            className:
                              "!bg-slate-200 dark:!bg-slate-700 !border !border-slate-300 dark:!border-slate-500/80 !text-slate-600 dark:!text-white",
                          },
                          popper: {
                            modifiers: [
                              {
                                name: "offset",
                                options: {
                                  offset: [0, -5],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        <Button
                          className="!bg-red-600 hover:!bg-red-800 !text-white !min-w-0 !w-8 !h-8 !p-0 !flex !items-center !justify-center !rounded-xl"
                          onClick={() => deleteUserHandler(user._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-slate-500/90 dark:text-slate-400/75 text-center p-8"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmationDialog
        key={`${confirmationDialogData.id}ConfirmationDialog`}
        open={openConfirmationDialog}
        title={confirmationDialogData.title}
        message={confirmationDialogData.message}
        confirmText={confirmationDialogData.confirmText}
        confirmButtonColor={confirmationDialogData.confirmButtonColor}
        onClose={() => setOpenConfirmationDialog(false)}
        onConfirm={confirmationDialogData.action}
      />

      <EditUserDialog
        key={`${editUserDialogData.id}EditUserDialog`}
        open={openEditUserDialog}
        onClose={() => setOpenEditUserDialog(false)}
        onConfirm={editUserDialogData.onConfirm}
        values={editUserDialogData.values}
      />
    </div>
  );
};

export default React.memo(UsersPage);
