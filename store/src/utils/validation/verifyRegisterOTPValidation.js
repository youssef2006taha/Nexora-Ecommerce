export const verifyRegisterOTPValidation = (otp) => {
  const errors = {};

  if (otp.includes("")) {
    errors.otp = "Please enter the complete 6-digit verification code.";
  }

  return errors;
};
