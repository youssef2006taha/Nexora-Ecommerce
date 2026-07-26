import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Lock } from "lucide-react";

import { Collapse } from "@mui/material";
import Button from "../../../../components/UI/Button";
import Label from "../../../../components/UI/Label";
import Input from "../../../../components/UI/Input";

import VerifyOTP from "./verifyOTP";

import { showToast } from "../../../../features/Toast/toastSlice";
import { sendOTPThunk } from "../../../../features/auth/Thunks/SendOTPThunk";

import { forgotPasswordValidation } from "../../../../utils/validation/forgotPasswordValidation";

const ChangePassword = () => {
  const { user } = useSelector((store) => store.auth);
  const [email, setEmail] = useState(user?.email);
  const [openEmailCollapse, setOpenEmailCollapse] = useState(false);
  const [openResetCollapse, setOpenResetCollapse] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const sendOTPHandler = async (e) => {
    e.preventDefault();

    const validationErrors = forgotPasswordValidation(email);

    setEmailValidationError(validationErrors);

    if (validationErrors) return;

    if (email.trim().toLowerCase() !== user?.email?.toLowerCase()) {
      setEmailValidationError("This email doesn't match your account email.");
      return;
    }

    try {
      setLoading(true);
      await dispatch(sendOTPThunk({ email })).unwrap();

      setOpenEmailCollapse(false);
      setOpenResetCollapse(true);

      dispatch(
        showToast({
          message: "OTP sent successfully.",
          severity: "success",
        }),
      );
    } catch (error) {
      dispatch(
        showToast({
          message: error,
          severity: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full mx-auto bg-bg-card !p-6 rounded-2xl border border-border shadow">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
          <Lock className="size-4.5 text-primary" />
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-[14px] sm:text-[16px] font-bold text-text-primary">
            Change Password
          </span>

          <span className="text-[12px] sm:text-xs font-medium text-text-muted/70">
            Update your account password
          </span>
        </div>
      </div>

      <div>
        <Collapse in={!openEmailCollapse && !openResetCollapse} timeout={250}>
          <Button
            text="Change Password"
            variant="outlined"
            className="!w-full !h-9 max-sm:!text-sm sm:!h-10.5"
            onClick={() => setOpenEmailCollapse(true)}
          />
        </Collapse>

        <Collapse in={openEmailCollapse} timeout={300}>
          <form className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label value="Email" htmlFor="email" />
              <div className="relative">
                <Input
                  id="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailValidationError && (
                  <p className="absolute -bottom-6 text-[12px] text-red-400 mt-1.5 min-h-[20px]">
                    {emailValidationError || ""}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 items-center justify-end">
              <Button
                text="Cancel"
                variant="secondary"
                className="!h-8 sm:!h-9 max-sm:!text-sm !px-4"
                onClick={() => setOpenEmailCollapse(false)}
              />
              <Button
                text="Send OTP"
                variant="primary"
                loading={loading}
                className="!h-8 sm:!h-9 max-sm:!text-sm !px-4"
                onClick={sendOTPHandler}
              />
            </div>
          </form>
        </Collapse>

        <Collapse in={openResetCollapse} timeout={300}>
          <VerifyOTP setOpenResetCollapse={setOpenResetCollapse} />
        </Collapse>
      </div>
    </div>
  );
};

export default React.memo(ChangePassword);
