export const verifyOTPValidation = (formData) => {
  const errors = {};

  if (formData.otp.includes("")) {
    errors.otp = "Please enter the complete 6-digit verification code.";
  }

  if (!formData.input1.trim()) {
    errors.input1 = "Password is required.";
  } else if (formData.input1.length < 6) {
    errors.input1 = "Password must be at least 6 characters.";
  }

  if (!formData.input2.trim()) {
    errors.input2 = "Confirm password is required.";
  } else if (formData.input1 !== formData.input2) {
    errors.input2 = "Passwords do not match.";
  }
  return errors;
};
