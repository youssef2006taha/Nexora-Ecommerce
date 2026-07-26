import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { showToast } from "../../../../features/Toast/toastSlice";

import { MapPin, Plus } from "lucide-react";

import Input from "../../../../components/UI/Input";
import Button from "../../../../components/UI/Button";

import { addressValidation } from "../../../../utils/validation/addressValidation";

const Address = () => {
  const dispatch = useDispatch();
  //   const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    postalCode: "",
  });

  const [formData, setFormData] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    postalCode: "",
  });

  const saveAddressHandler = (e) => {
    e.preventDefault();

    const validationErrors = addressValidation(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    dispatch(
      showToast({
        message: "Profile updated successfully.",
        severity: "success",
      }),
    );

    setFormData({
      country: "",
      city: "",
      street: "",
      building: "",
      postalCode: "",
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full mx-auto bg-bg-card p-6 rounded-2xl border border-border shadow">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
          <MapPin className="size-4.5 text-primary" />
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-[14px] sm:text-[16px] font-bold text-text-primary">
            Addresses
          </span>

          <span className="text-[12px] sm:text-xs font-medium text-text-muted/70">
            Manage your saved addresses
          </span>
        </div>
      </div>

      <form className="grid grid-cols-1 xs:grid-cols-2 gap-y-6 gap-x-5">
        {/* Country */}
        <div className="relative">
          <Input
            required={true}
            placeholder="Country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
          {errors.country && (
            <p className="absolute left-0 -bottom-5 text-[12px] text-red-400">
              {errors.country}
            </p>
          )}
        </div>

        {/* City */}
        <div className="relative">
          <Input
            required={true}
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          {errors.city && (
            <p className="absolute left-0 -bottom-5 text-[12px] text-red-400">
              {errors.city}
            </p>
          )}
        </div>

        {/* Street */}
        <div className="relative">
          <Input
            required={true}
            placeholder="Street"
            value={formData.street}
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
          />
          {errors.street && (
            <p className="absolute left-0 -bottom-5 text-[12px] text-red-400">
              {errors.street}
            </p>
          )}
        </div>

        {/* Building */}
        <div className="relative">
          <Input
            placeholder="Building"
            value={formData.building}
            onChange={(e) =>
              setFormData({ ...formData, building: e.target.value })
            }
          />
          {errors.building && (
            <p className="absolute left-0 -bottom-5 text-[12px] text-red-400">
              {errors.building}
            </p>
          )}
        </div>

        {/* Postal Code */}
        <div className="xs:col-span-2 relative">
          <Input
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
          />
          {errors.postalCode && (
            <p className="absolute left-0 -bottom-5 text-[12px] text-red-400">
              {errors.postalCode}
            </p>
          )}
        </div>

        <div className="flex justify-end xs:col-span-2">
          <Button
            type="submit"
            text="Add Address"
            variant="outlined"
            startIcon={<Plus className="size-3.5 sm:size-4" />}
            className="!h-9 sm:!h-10.5 max-sm:!text-sm !mt-2"
            onClick={saveAddressHandler}
          />
        </div>
      </form>
    </div>
  );
};

export default React.memo(Address);
