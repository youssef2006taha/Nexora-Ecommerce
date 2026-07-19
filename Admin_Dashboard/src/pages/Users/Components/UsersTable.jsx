import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Avatar, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteUserThunk } from "../../../features/users/Thunks/DeleteUserThunk";
import { editUserThunk } from "../../../features/users/Thunks/EditUserThunk";
import { changeUserRoleThunk } from "../../../features/users/Thunks/ChangeUserRoleThunk";
import { logout } from "../../../features/auth/authSlice.js";
import { showToast } from "../../../features/Toast/toastSlice.js";

import ConfirmationDialog from "../dialogs/ConfirmationDialog.jsx";
import EditUserDialog from "../dialogs/EditUserDialog";

const UsersTable = ({ inputSearch }) => {
  const toastDispatch = useDispatch();
  const usersDispatch = useDispatch();
  const logoutDispatch = useDispatch();
  const { users } = useSelector((store) => store.users);
  const { email } = useSelector((store) => store.auth);

  // Confirmation Dialog Data
  const [confirmationDialogData, setConfirmationDialogData] = useState({
    title: "",
    message: "",
    confirmText: "",
    confirmButtonColor: "",
    action: null,
  });

  // Edit User Dialog Control
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);

  // Confirmation Dialog Control
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  // Edit User Dialog Data
  const [editUserDialogData, setEditUserDialogData] = useState({
    title: "",
    values: { username: "", phone: "", avatar: "" },
    onConfirm: null,
  });

  const calcTableHeight = () => {
    const rowHeight = 81;
    const headerHeight = 56;

    const itemsCount =
      Math.floor(
        (screen.width < 768
          ? screen.availHeight * 0.8
          : screen.availHeight * 0.7) / rowHeight,
      ) - 1;

    return itemsCount * rowHeight + headerHeight;
  };

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

  const deleteUserHandler = (id, userEmail) => {
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

          if (email === userEmail) {
            toastDispatch(
              showToast({
                message:
                  "Your account has been deleted. You have been signed out.",
                severity: "warning",
              }),
            );

            await logoutDispatch(logout());
            return;
          }
        } catch (error) {
          console.error(error);

          toastDispatch(
            showToast({
              message:
                typeof error === "string"
                  ? error
                  : error?.message || "Failed to delete user.",
              severity: "error",
            }),
          );
        } finally {
          setOpenConfirmationDialog(false);
        }
      },
    });

    setOpenConfirmationDialog(true);
  };

  const changeUserRoleHandler = ({ id, role, userEmail }) => {
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

          if (userEmail === email && role === "customer") {
            toastDispatch(
              showToast({
                message:
                  "Your role has been changed to Customer. You have been signed out.",
                severity: "warning",
              }),
            );

            await logoutDispatch(logout());
            return;
          }

          toastDispatch(
            showToast({
              message: `User role updated to ${role} successfully!`,
              severity: "success",
            }),
          );
        } catch (error) {
          console.log(error);
          toastDispatch(
            showToast({
              message: "Failed to change user role",
              severity: "error",
            }),
          );
        } finally {
          setOpenConfirmationDialog(false);
        }
      },
    });

    setOpenConfirmationDialog(true);
  };

  const filteredUsers = users?.filter((user) =>
    user?.username?.toLowerCase().includes(inputSearch.toLowerCase()),
  );

  return (
    <div
      className="overflow-auto rounded-2xl border border-border shadow-lg hide-scrollbar dark:border-secondary/30"
      style={{ maxHeight: `${calcTableHeight()}px` }}
    >
      <table className="min-w-[620px] sm:min-w-full border-separate border-spacing-0">
        <thead className="sticky top-0 z-10 !bg-gradient-to-r !from-primary-active !via-primary !to-primary-hover text-white/90 !h-[56px]">
          <tr className="w-full h-full inset-0 bg-white/25 dark:bg-black/20">
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
                key={user._id}
                className="bg-bg-card hover:bg-bg-hover transition !h-[81px]"
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
                      <p className="text-sm text-text-muted/75">{user.email}</p>
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
                            "!bg-bg-card !border !border-border !text-text-primary",
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
                            "!bg-bg-card !border !border-border !text-text-primary",
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
                          changeUserRoleHandler({
                            id: user._id,
                            role: user.role === "admin" ? "customer" : "admin",
                            userEmail: user.email,
                          })
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
                            "!bg-bg-card !border !border-border !text-text-primary",
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
                        onClick={() => deleteUserHandler(user._id, user.email)}
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

export default React.memo(UsersTable);
