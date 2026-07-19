import React, { useState, useRef } from "react";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import axios from "axios";

const BASE_URL = "https://e-commerce-api-3wara.vercel.app";

const ChangePhotoForm = ({ currentAvatar, onClose, onSuccess }) => {
  const [preview, setPreview] = useState(currentAvatar || null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await axios.put(`${BASE_URL}/auth/avatar`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      onSuccess?.(response.data?.user?.avatar || preview);
      onClose();
    } catch (error) {
      console.error("Avatar upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-4">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-2xl font-bold">
              ?
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex gap-3">
          <button
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <FiUpload size={14} /> Choose Photo
          </button>

          {preview && (
            <button
              onClick={() => {
                setPreview(null);
                setFile(null);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] bg-rose-50 dark:bg-rose-500/10 text-sm font-bold text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors"
            >
              <FiTrash2 size={14} /> Remove
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onClose}
          className="flex-1 py-3 rounded-[12px] border border-border text-sm font-bold text-text-secondary hover:bg-bg-hover transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="flex-1 py-3 rounded-[12px] bg-primary text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Uploading..." : "Save Photo"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ChangePhotoForm);