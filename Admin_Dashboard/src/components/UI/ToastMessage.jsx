import React from 'react';

const Toast = ({ message, type = "success", onClose }) => {
  if (!message) return null;

  return (
    <div className="flex items-center w-full max-w-sm p-4 bg-bg-card text-text-primary rounded-md shadow-md border border-border transition-normal animate-fade-in" role="alert">
      
      {type === "success" && (
        <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-success bg-success/10 rounded-sm">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/>
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
      )}

      {type === "error" && (
        <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-danger bg-danger/10 rounded-sm">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
          </svg>
          <span className="sr-only">Error icon</span>
        </div>
      )}

      {type === "warning" && (
        <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-warning bg-warning/10 rounded-sm">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <span className="sr-only">Warning icon</span>
        </div>
      )}

      <div className="ms-3 text-sm font-normal text-text-secondary">
        {message}
      </div>

      {onClose && (
        <button 
          type="button" 
          onClick={onClose}
          className="ms-auto flex items-center justify-center text-text-muted hover:text-text-primary bg-transparent rounded-sm p-1 transition-fast cursor-pointer" 
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Toast;

