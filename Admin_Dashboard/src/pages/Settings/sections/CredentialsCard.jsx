import React from "react";
import { FiMail, FiPhone, FiLock } from "react-icons/fi";

const CredentialsCard = ({ user, onChangePassword }) => {
  return (
    <div
      className="bg-bg-card/60 backdrop-blur-md rounded-[24px] p-6 border-t-4 border-text-muted/60 shadow-xs w-full"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="text-[12px] font-bold text-text-muted tracking-wide mb-5">
        CREDENTIALS
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-[10px] bg-bg-surface flex items-center justify-center text-text-muted shrink-0 border border-border/40">
              <FiMail size={15} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-text-muted font-medium">Email</p>
              <p className="text-sm font-semibold text-text-primary truncate">
                {user?.email || "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-border/60" />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-[10px] bg-bg-surface flex items-center justify-center text-text-muted shrink-0 border border-border/40">
              <FiPhone size={15} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-text-muted font-medium">Phone</p>
              <p className="text-sm font-semibold text-text-primary truncate">
                {user?.phone || "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-border/60" />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-[10px] bg-bg-surface flex items-center justify-center text-text-muted shrink-0 border border-border/40">
              <FiLock size={15} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-text-muted font-medium">Password</p>
              <p className="text-sm font-semibold text-text-primary tracking-widest">
                ••••••••
              </p>
            </div>
          </div>
          <button
            onClick={onChangePassword}
            className="text-xs font-bold text-primary hover:underline shrink-0 cursor-pointer"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CredentialsCard);