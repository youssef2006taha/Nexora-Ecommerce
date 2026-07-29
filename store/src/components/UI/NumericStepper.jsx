import React from "react";

const NumberInput = ({
  id,
  value,
  onChange,
  incrementHandler,
  decrementHandler,
  placeholder,
  className = "",
  ...props
}) => {
  return (
    <div className="relative">
      <input
        type="number"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-primary/4 py-2.5 pl-3 pr-10 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield] ${className}`}
        {...props}
      />

      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
        <button
          type="button"
          onClick={incrementHandler}
          className="flex h-3 w-6 items-center justify-center text-[11px] sm:text-[12px] text-text-muted transition-colors hover:text-primary cursor-pointer"
        >
          ▲
        </button>

        <button
          type="button"
          onClick={decrementHandler}
          className="flex h-3 w-6 items-center justify-center text-[11px] sm:text-[12px] text-text-muted transition-colors hover:text-primary cursor-pointer"
        >
          ▼
        </button>
      </div>
    </div>
  );
};

export default React.memo(NumberInput);
