import React from "react";
import { FiCamera, FiEdit2, FiCheckCircle, FiInfo } from "react-icons/fi";

const ProfileCard = ({ user, onChangePhoto, onEditProfile, onViewDetails }) => {
  return (
    <div
      className="bg-bg-card/80 backdrop-blur-md rounded-[24px] p-6 border-t-4 border-primary shadow-xs w-full"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-bg-surface border-2 border-border shadow-sm">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.username || "Admin"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl font-bold text-text-muted">
                {user?.username?.charAt(0)?.toUpperCase() || "A"}
              </div>
            )}
          </div>

          <button
            onClick={onChangePhoto}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform cursor-pointer"
          >
            <FiCamera size={14} />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-text-primary truncate">
              {user?.username || "Admin User"}
            </h3>
            {user?.isVerified && (
              <FiCheckCircle size={16} className="text-emerald-500 shrink-0" />
            )}
          </div>
          <p className="text-sm text-text-muted truncate">
            {user?.email || "admin@example.com"}
          </p>
          <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
            {user?.role || "customer"}
          </span>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={onViewDetails}
            title="View all details"
          className="w-10 h-10 rounded-[12px] bg-bg-surface border border-border/60 flex items-center justify-center text-text-muted hover:text-primary transition-colors shrink-0 cursor-pointer"
          >
            <FiInfo size={16} />
          </button>
          <button
            onClick={onEditProfile}
            title="Edit profile"
          className="w-10 h-10 rounded-[12px] bg-bg-surface border border-border/60 flex items-center justify-center text-text-muted hover:text-primary transition-colors shrink-0 cursor-pointer"
          >
            <FiEdit2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileCard);