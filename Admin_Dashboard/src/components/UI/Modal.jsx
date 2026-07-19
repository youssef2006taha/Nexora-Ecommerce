import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-text-primary/40 dark:bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div  
        className="bg-bg-surface border border-border rounded-[var(--radius-lg-value)] p-8 mt-9 shadow-lg relative min-w-[320px] sm:min-w-[500px] md:min-w-[600px] max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
        >
          <FiX size={18} />
        </button>

        {title && (
          <h4 className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-2">
            {title}
          </h4>
        )}
        
        {subtitle && (
          <p className="text-text-secondary text-sm mb-6">
            {subtitle}
          </p>
        )}

        <div className="text-text-primary">
          {children}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);