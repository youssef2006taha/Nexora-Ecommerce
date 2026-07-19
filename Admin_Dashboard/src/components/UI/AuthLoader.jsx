import React from 'react';
import "./AuthLoader.css";
import { DotWave } from "ldrs/react";
import "ldrs/react/DotWave.css";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-bg-main">
      <div className="flex flex-col justify-center items-center gap-8">
        
        <div className="loader border-3 border-border-light dark:border-border">
          <div className="loader-ring">
            <div className="loader-core" />
          </div>
        </div>
        
        <div>
          <h2 className="text-text-primary text-2xl text-center font-bold">
            Loading Session
          </h2>
          <p className="capitalize text-text-muted text-center mt-3 tracking-wide">
            verifying authentication
          </p>
        </div>
        
        <DotWave size={47} speed={1} color="var(--primary)" />
      </div>
    </div>
  );
};

export default Loader;