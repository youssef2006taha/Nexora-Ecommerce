import React from "react";
import { useRef } from "react";
import { InputBase } from "@mui/material";

const OTPField = ({ otp, setOtp }) => {
  const inputRefs = useRef([]);
  const length = otp.length;

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];

    setOtp(newOtp);

    if (index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      return;
    }

    if (e.key !== "Backspace") return;

    const newOtp = [...otp];

    if (newOtp[index]) {
      newOtp[index] = "";
      setOtp(newOtp);
    } else if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    const newOtp = Array(length).fill("");

    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const lastIndex = Math.min(pasted.length - 1, length - 1);
    inputRefs.current[lastIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-3">
      {otp.map((digit, index) => (
        <InputBase
          key={index}
          value={digit}
          inputRef={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          inputProps={{
            maxLength: 1,
            inputMode: "numeric",
            pattern: "[0-9]*",
            className:
              "!text-center !text-[22px] !font-bold !text-text-primary",
          }}
          className="!size-8 sm:!size-12 !rounded-xl !border !border-primary/15 dark:!border-primary/30 !bg-primary/4 focus-within:!ring-2 focus-within:!ring-primary/40"
        />
      ))}
    </div>
  );
};

export default React.memo(OTPField);
