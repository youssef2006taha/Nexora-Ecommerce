import React from 'react';

const ApiStatusCard = () => {
  return (
    <div className="mt-auto bg-gradient-to-br from-primary to-accent border border-primary-hover rounded-[20px] p-5 text-white shadow-md shadow-primary/10">
      
      <div className="flex items-center gap-2 mb-1">
        
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>

        <p className="text-[10px] font-bold tracking-[0.25em] opacity-90 text-white">
          LIVE
        </p>
      </div>

      <p className="text-[14px] text-white/90 font-medium">
        Connected to the E-commerce API
      </p>
    </div>
  );
};

export default ApiStatusCard;