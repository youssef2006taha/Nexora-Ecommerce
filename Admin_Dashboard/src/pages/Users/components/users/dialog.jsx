import React, { useState, useEffect } from 'react';
import { X, Sun, Moon } from "lucide-react";
import api from '../../../../api/axios';

const UserDialog = ({ 
  fetchUsers, 
  isDialogOpen, 
  user, 
  setIsDialogOpen, 
  setSelectedUser, 
  setLoading 
}) => {
  // لو الـ Dialog مقفول أو مفيش مستخدم محدد مش هنعرض حاجة
  if (!isDialogOpen || !user) return null;

  const [spin, setSpin] = useState(false);
  const [isDark, setIsDark] = useState(true); // الـ State الافتراضي للثيم بناءً على طلبك
  const [form, setForm] = useState({
    username: user.username || "",
    phone: user.phone || "",
    avatar: user.avatar || ""
  });

  // تحديث الـ Form لما الـ user اللي مبعوث كـ Prop يتغير
  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        phone: user.phone || "",
        avatar: user.avatar || ""
      });
    }
  }, [user]);

  const handleChange = (field) => (e) => {
    const newValue = e.target.value;
    // تحديث الفورم المحلي
    setForm((prev) => ({ ...prev, [field]: newValue }));
    // تحديث الـ State الرئيسي فوق عشان يفضل Synchronized لو محتاجه
    setSelectedUser((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (!user?._id) return;

    try {
      setSpin(true);
      setLoading(true);

      // بنبعت الداتا الجديدة من الـ form للـ API
      await api.patch(`/users/${user._id}`, form);
      await fetchUsers();

      setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSpin(false);
      setLoading(false);
    }
  };

  const toggleTheme = () => setIsDark((prev) => !prev);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) setIsDialogOpen(false);
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm transition-colors ${
        isDark ? "bg-black/60" : "bg-black/30"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[calc(100vw-1.5rem)] sm:max-w-md rounded-2xl border shadow-2xl transition-colors max-h-[90vh] overflow-y-auto ${
          isDark
            ? "border-slate-700/50 bg-slate-900 text-white"
            : "border-slate-200 bg-white text-slate-900"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-5 sm:pt-6 pb-4">
          <h2 className="text-lg sm:text-xl font-bold">
            Edit User
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`rounded-lg p-2 transition-colors ${
                isDark
                  ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              type="button"
              onClick={() => setIsDialogOpen(false)}
              aria-label="Close"
              className={`rounded-lg p-1 transition-colors ${
                isDark
                  ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSaveUser}
          className="space-y-4 sm:space-y-5 px-4 sm:px-6 pb-5 sm:pb-6"
        >
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className={`mb-2 block text-xs font-semibold tracking-wider ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              value={form.username}
              onChange={handleChange("username")}
              placeholder="Username"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:ring-1 ${
                isDark
                  ? "border-slate-700 bg-slate-800/70 text-white placeholder-slate-500 focus:border-teal-500 focus:ring-teal-500"
                  : "border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
          </div>

          {/* Phone Input */}
          <div>
            <label
              htmlFor="phone"
              className={`mb-2 block text-xs font-semibold tracking-wider ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              PHONE
            </label>
            <input
              id="phone"
              type="text"
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="Phone Number"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:ring-1 ${
                isDark
                  ? "border-slate-700 bg-slate-800/70 text-white placeholder-slate-500 focus:border-teal-500 focus:ring-teal-500"
                  : "border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
          </div>

          {/* Avatar Input */}
          <div>
            <label
              htmlFor="avatar"
              className={`mb-2 block text-xs font-semibold tracking-wider ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              AVATAR URL
            </label>
            <input
              id="avatar"
              type="text"
              value={form.avatar}
              onChange={handleChange("avatar")}
              placeholder="https://example.com/avatar.png"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:ring-1 ${
                isDark
                  ? "border-slate-700 bg-slate-800/70 text-white placeholder-slate-500 focus:border-teal-500 focus:ring-teal-500"
                  : "border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
          </div>

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            disabled={spin}
            className={`w-full rounded-lg py-3 font-semibold text-white flex items-center justify-center gap-2 transition-colors ${
              spin
                ? "bg-teal-600/50 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-500 active:bg-teal-700"
            }`}
          >
            {spin && (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-white"></span>
            )}
            {spin ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(UserDialog);