import { useState } from "react";
import { X, Sun, Moon } from "lucide-react";

export default function EditUserModal({
  isOpen = true,
  onClose = () => {},
  user = {
    username: "eeeeeeeee",
    phone: "",
    avatarUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  onSave = () => {},
}) {
  const [form, setForm] = useState(user);
  const [isDark, setIsDark] = useState(true);

  if (!isOpen) return null;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Close only when the click lands on the backdrop itself,
  // not when it started inside the card.
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
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
            ? "border-slate-700/50 bg-slate-900"
            : "border-slate-200 bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-5 sm:pt-6 pb-4">
          <h2
            className={`text-lg sm:text-xl font-bold ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
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
              onClick={onClose}
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
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-5 px-4 sm:px-6 pb-5 sm:pb-6"
        >
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
              type="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="Phone"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:ring-1 ${
                isDark
                  ? "border-slate-700 bg-slate-800/70 text-white placeholder-slate-500 focus:border-teal-500 focus:ring-teal-500"
                  : "border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="avatarUrl"
              className={`mb-2 block text-xs font-semibold tracking-wider ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              AVATAR URL
            </label>
            <input
              id="avatarUrl"
              type="text"
              value={form.avatarUrl}
              onChange={handleChange("avatarUrl")}
              placeholder="https://..."
              className={`w-full rounded-lg border px-4 py-3 outline-none transition-colors focus:ring-1 ${
                isDark
                  ? "border-slate-700 bg-slate-800/70 text-white placeholder-slate-500 focus:border-teal-500 focus:ring-teal-500"
                  : "border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-teal-600 py-3 font-semibold text-white transition-colors hover:bg-teal-500 active:bg-teal-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import EditUserModal from "./components/EditUserModal.jsx";

// export default function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSave = (updatedUser) => {
//     console.log("Saved user:", updatedUser);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-500"
//       >
//         Edit User
//       </button>

//       <EditUserModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSave}
//       />
//     </div>
//   );
// }
