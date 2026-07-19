import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const EditUserDialog = ({
  open,
  onClose,
  onConfirm,
  values,
  title = "Edit User",
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(values);

  const [errors, setErrors] = useState({
    username: "",
    phone: "",
    avatar: "",
  });

  const closeHandler = () => {
    onClose();
    setErrors({ username: "", phone: "", avatar: "" });
    setFormData(values);
  };

  const regex = {
    username: /^[\p{L}\s]{3,30}$/u,
    phone: /^01[0125][0-9]{8}$/,
    avatar: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))(?:\?.*)?$/i,
  };

  const validate = () => {
    const newErrors = {};

    if (!regex.username.test(formData.username.trim())) {
      newErrors.username = "Username must be 3-30 letters only.";
    }

    if (!regex.phone.test(formData.phone.trim())) {
      newErrors.phone = "Invalid Egyptian phone number.";
    }

    if (!regex.avatar.test(formData.avatar.trim())) {
      newErrors.avatar = "Please enter a valid image URL.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const confirmHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      await onConfirm(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!loading ? closeHandler : undefined}
      fullWidth
      slotProps={{
        backdrop: {
          className: "!bg-black/75 dark:!bg-black/60",
        },

        paper: {
          className:
            "!bg-gray-200 dark:!bg-slate-800 !border !border-slate-700/90 !rounded-3xl !max-h-[80vh] !w-screen sm:!w-[35vw]",
        },
      }}
      disableScrollLock
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6">
        <DialogTitle className="!p-0 !text-2xl !font-bold !text-slate-600 dark:!text-white/90">
          {title}
        </DialogTitle>

        <IconButton
          onClick={closeHandler}
          disabled={loading}
          className="!text-slate-400 hover:!text-slate-500 dark:hover:!text-white/60"
        >
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent className="!px-6 !pb-6">
        <form onSubmit={confirmHandler}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500/80 dark:text-slate-400"
            >
              Username
            </label>

            <input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              id="username"
              name="username"
              type="text"
              className="w-full rounded-xl border-2 border-slate-500/30 dark:border-slate-700 bg-white dark:bg-slate-700/20 px-4 py-3 text-slate-500 dark:text-white/90 outline-none transition duration-200 focus:border-slate-500/70 focus:shadow-[0_0_5px] focus:shadow-slate-400/50"
            />

            <p className="mt-1 text-sm text-red-400 min-h-[20px]">
              {errors.username || ""}
            </p>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500/80 dark:text-slate-400"
            >
              Phone
            </label>

            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              id="phone"
              name="phone"
              type="text"
              className="w-full rounded-xl border-2 border-slate-500/30 dark:border-slate-700 bg-white dark:bg-slate-700/20 px-4 py-3 text-slate-500 dark:text-white/90 outline-none transition duration-200 focus:border-slate-500/70 focus:shadow-[0_0_5px] focus:shadow-slate-400/50"
            />

            <p className="mt-1 text-sm text-red-400 min-h-[20px]">
              {errors.phone || ""}
            </p>
          </div>

          {/* Avatar */}
          <div>
            <label
              htmlFor="avatar"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500/80 dark:text-slate-400"
            >
              Avatar URL
            </label>

            <input
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
              id="avatar"
              name="avatar"
              type="url"
              className="w-full rounded-xl border-2 border-slate-500/30 dark:border-slate-700 bg-white dark:bg-slate-700/20 px-4 py-3 text-slate-500 dark:text-white/90 outline-none transition duration-200 focus:border-slate-500/70 focus:shadow-[0_0_5px] focus:shadow-slate-400/50"
            />

            <p className="mt-1 text-sm text-red-400 min-h-[20px]">
              {errors.avatar || ""}
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              onClick={closeHandler}
              disabled={loading}
              className="!rounded-xl !border !border-slate-400/30 dark:!border-slate-600 !px-3 !py-2 !font-medium !text-slate-500 dark:!text-slate-300 !transition hover:!bg-gray-300/50 dark:hover:!bg-slate-700"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="!rounded-xl !bg-sky-600 !px-3 !py-2 !font-semibold !text-white !transition hover:!bg-sky-700 disabled:!cursor-not-allowed disabled:!opacity-80 dark:disabled:!opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
