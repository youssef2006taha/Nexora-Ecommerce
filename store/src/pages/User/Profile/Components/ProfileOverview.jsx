import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { UpdateUserProfileThunk } from "../../../../features/auth/Thunks/updateUserProfileThunk";
import { showToast } from "../../../../features/Toast/toastSlice.js";

import { Avatar, Collapse } from "@mui/material";
import Button from "../../../../components/UI/Button";
import Label from "../../../../components/UI/Label";
import Input from "../../../../components/UI/Input";

import { Mail, Phone } from "lucide-react";

const ProfileOverview = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    avatar: "",
  });
  const [openCollapse, setOpenCollapse] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const updateProfileHandler = async (id) => {
    try {
      setLoading(true);

      await dispatch(UpdateUserProfileThunk({ id, formData })).unwrap();

      dispatch(
        showToast({
          message: "Profile updated successfully.",
          severity: "success",
        }),
      );

      setOpenCollapse(false);
    } catch (error) {
      dispatch(
        showToast({
          message: error || "Failed to update profile.",
          severity: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full mx-auto bg-bg-card p-6 rounded-2xl border border-border shadow">
      <div className="flex gap-4 items-center">
        <Avatar
          alt={user?.username}
          src={user?.avatar}
          className="!size-16 sm:!size-20 !border !border-border"
        >
          {user?.username.slice(0, 2)}
        </Avatar>

        <div className="flex flex-col gap-2">
          {/* Username */}
          <h3 className="text-base sm:text-lg text-text-primary font-bold leading-none">
            {user?.username}
          </h3>

          {/* Email */}
          <h3 className="text-[11px] sm:text-[13px] text-text-muted/80 font-semibold leading-none">
            {user?.email}
          </h3>

          {/* Role */}
          <p className="capitalize text-[11px] sm:text-xs text-primary font-semibold">
            {user?.role}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Email */}
        <div className="flex items-center gap-3 border-l border-border/80 dark:border-border pl-4">
          <div className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-primary/10">
            <Mail className="size-4 text-primary" />
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted/80">
              Email
            </span>

            <span className="text-xs sm:text-sm text-text-primary">{user?.email}</span>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 border-l border-border/80 dark:border-border pl-4">
          <div className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-primary/10">
            <Phone className="size-4 text-primary" />
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted/80">
              Phone
            </span>

            <span className="text-xs sm:text-sm text-text-primary">{user?.phone}</span>
          </div>
        </div>
      </div>

      <div>
        <Collapse in={!openCollapse} timeout={250}>
          <Button
            text="Edit Profile"
            variant="outlined"
            className="!w-full !h-9 max-sm:!text-[13px] sm:!h-10.5"
            onClick={() => setOpenCollapse(true)}
          />
        </Collapse>

        <Collapse in={openCollapse} timeout={300}>
          <form className="flex flex-col gap-6">
            {/* UserName */}
            <div className="flex flex-col gap-2">
              <Label value="Username" htmlFor="username" />
              <Input
                id="username"
                value={formData.username || user?.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <Label value="Phone" htmlFor="phone" />
              <Input
                id="phone"
                value={formData.phone || user?.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            {/* Avatar URL */}
            <div className="flex flex-col gap-2">
              <Label value="Avatar URL" htmlFor="avatar_url" />
              <Input
                id="avatar_url"
                value={formData.avatar || user?.avatar}
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.value })
                }
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 items-center justify-end">
              <Button
                text="Cancel"
                variant="secondary"
                className="!h-10 !px-4"
                onClick={() => setOpenCollapse(false)}
              />
              <Button
                text="Save"
                variant="primary"
                loading={loading}
                className="!h-10 !px-6"
                onClick={() => updateProfileHandler(user._id)}
              />
            </div>
          </form>
        </Collapse>
      </div>
    </div>
  );
};

export default React.memo(ProfileOverview);
