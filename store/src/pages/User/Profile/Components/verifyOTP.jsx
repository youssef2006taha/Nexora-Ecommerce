import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyResetOTPThunk } from "../../../../features/auth/Thunks/verifyResetOTPThunk";
import { verifyOTPValidation } from "../../../../utils/validation/verifyOTPValidation.js";
import { showToast } from "../../../../features/Toast/toastSlice.js";
import OTPField from "../../../User/Login/OTPField.jsx";
import Password from "../../../../components/UI/Password.jsx";
import Button from "../../../../components/UI/Button.jsx";

const VerifyOTP = ({ setOpenResetCollapse }) => {
  const otpLength = 6;
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [formData, setFormData] = useState({ input1: "", input2: "" });
  const [errors, setErrors] = useState({ input1: "", input2: "", otp: "" });
  const { email } = useSelector((store) => store.auth);
  const toastDispatch = useDispatch();
  const verifyOTPDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const closeCollapseHandler = () => {
    setErrors({
      input1: "",
      input2: "",
      otp: "",
    });

    setFormData({
      input1: "",
      input2: "",
    });

    setOtp(Array(otpLength).fill(""));
    setOpenResetCollapse(false);
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const validationErrors = verifyOTPValidation({ ...formData, otp });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      await verifyOTPDispatch(
        verifyResetOTPThunk({
          email: email.trim(),
          otp: otp.join(""),
          newPassword: formData.input1.trim(),
        }),
      ).unwrap();

      toastDispatch(
        showToast({
          message: "Password reset successfully.",
          severity: "success",
        }),
      );

      closeCollapseHandler();
    } catch (error) {
      toastDispatch(
        showToast({
          message: error || "Failed to reset password.",
          severity: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* OTP */}
      <div>
        <OTPField otp={otp} setOtp={setOtp} />
        {errors.otp && (
          <p className="text-[12px] text-red-400 min-h-[20px] !mt-2">
            {errors.otp || ""}
          </p>
        )}
      </div>

      {/* New Password */}
      <div>
        <Password
          placeholder="New Password"
          value={formData.input1}
          onChange={(e) => setFormData({ ...formData, input1: e.target.value })}
        />
        {errors.input1 && (
          <p className="text-[12px] text-red-400 min-h-[20px] !mt-2">
            {errors.input1 || ""}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <Password
          placeholder="Confirm Password"
          value={formData.input2}
          onChange={(e) => setFormData({ ...formData, input2: e.target.value })}
        />
        {errors.input2 && (
          <p className="text-[12px] text-red-400 min-h-[20px] !mt-2">
            {errors.input2 || ""}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button
          text="Cancel"
          variant="secondary"
          disabled={loading}
          className="!h-8 sm:!h-9 max-sm:!text-sm !px-4"
          onClick={closeCollapseHandler}
        />
        <Button
          type="submit"
          text="Reset Password"
          loadingText="Resetting"
          variant="primary"
          disabled={loading}
          loading={loading}
          className="!h-8 sm:!h-9 max-sm:!text-sm !px-4"
          onClick={resetPasswordHandler}
        />
      </div>
    </div>
  );
};

export default React.memo(VerifyOTP);
