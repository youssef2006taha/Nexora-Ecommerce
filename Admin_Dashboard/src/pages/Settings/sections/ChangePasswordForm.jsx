import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

const BASE_URL = "https://e-commerce-api-3wara.vercel.app";

const baseInputClass =
  "w-full px-4 py-3 rounded-[12px] bg-bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all";

const PasswordField = ({ label, name, register, error, validation }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          className={baseInputClass}
          placeholder="••••••••"
          {...register(name, validation)}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary dark:hover:text-primary transition-colors"
        >
          {visible ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>
      {error && <p className="text-xs text-rose-500 mt-1">{error.message}</p>}
    </div>
  );
};

const ChangePasswordForm = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");
    try {
      const token = localStorage.getItem("token");

      // ⚠️ Placeholder endpoint — replace with your real change-password route
      await axios.patch(
        `${BASE_URL}/auth/change-password`,
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      onSuccess?.();
      onClose();
    } catch (error) {
      setServerError(
        error?.response?.data?.message || "Failed to change password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <PasswordField
        label="Current Password"
        name="currentPassword"
        register={register}
        error={errors.currentPassword}
        validation={{ required: "Current password is required" }}
      />

      <PasswordField
        label="New Password"
        name="newPassword"
        register={register}
        error={errors.newPassword}
        validation={{
          required: "New password is required",
          minLength: { value: 8, message: "Minimum 8 characters" },
        }}
      />

      <PasswordField
        label="Confirm New Password"
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
        validation={{
          required: "Please confirm your new password",
          validate: (value) => value === newPassword || "Passwords do not match",
        }}
      />

      {serverError && <p className="text-xs text-rose-500">{serverError}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 rounded-[12px] border border-border text-sm font-bold text-text-secondary hover:bg-bg-hover transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 rounded-[12px] bg-primary text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Saving..." : "Save Password"}
        </button>
      </div>
    </form>
  );
};

export default React.memo(ChangePasswordForm);