import React from "react";

import { MapPin } from "lucide-react";

import Label from "../../../components/UI/Label";
import Input from "../../../components/UI/Input";

const ShippingAddress = ({ formData, setFormData, errors, setErrors }) => {
  return (
    <div className="flex flex-col gap-6 p-6 rounded-3xl bg-bg-card border border-border shadow">
      {/* Header */}
      <div className="flex gap-3 items-center">
        <MapPin className="size-4.5 xs:size-5.5 text-primary/85" />
        <span className="font-semibold text-text-primary text-[14px] xs:text-[16px]">
          Shipping Address
        </span>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col gap-2 xs:col-span-2 relative">
          <Label value="Full Name" htmlFor="fullName" asterisk={true} />
          <Input
            id="fullName"
            placeholder="Enter Your Full Name"
            required={true}
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              errors.fullName && setErrors({ ...errors, fullName: "" });
            }}
          />
          {errors.fullName && (
            <p className="absolute left-0 -bottom-5 text-[11.5px] text-red-400">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2 relative">
          <Label value="Phone" htmlFor="phone" asterisk={true} />
          <Input
            id="phone"
            placeholder="Enter Your Phone"
            required={true}
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              errors.phone && setErrors({ ...errors, phone: "" });
            }}
          />
          {errors.phone && (
            <p className="absolute left-0 -bottom-5 text-[11.5px] text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Country */}
        <div className="flex flex-col gap-2 relative">
          <Label value="Country" htmlFor="country" asterisk={true} />
          <Input
            id="country"
            placeholder="Enter Your Country"
            required={true}
            value={formData.country}
            onChange={(e) => {
              setFormData({ ...formData, country: e.target.value });
              errors.country && setErrors({ ...errors, country: "" });
            }}
          />
          {errors.country && (
            <p className="absolute left-0 -bottom-5 text-[11.5px] text-red-400">
              {errors.country}
            </p>
          )}
        </div>

        {/* City */}
        <div className="flex flex-col gap-2 relative">
          <Label value="City" htmlFor="city" asterisk={true} />
          <Input
            id="city"
            placeholder="Enter Your City"
            required={true}
            value={formData.city}
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
              errors.city && setErrors({ ...errors, city: "" });
            }}
          />
          {errors.city && (
            <p className="absolute left-0 -bottom-5 text-[11.5px] text-red-400">
              {errors.city}
            </p>
          )}
        </div>

        {/* Postal Code */}
        <div className="flex flex-col gap-2 relative">
          <Label value="Postal Code" htmlFor="postalCode" asterisk={true} />
          <Input
            id="postalCode"
            placeholder="Enter Your Postal Code"
            required={true}
            value={formData.postalCode}
            onChange={(e) => {
              setFormData({ ...formData, postalCode: e.target.value });
              errors.postalCode && setErrors({ ...errors, postalCode: "" });
            }}
          />
          {errors.postalCode && (
            <p className="absolute left-0 -bottom-5 text-[11.5px] text-red-400">
              {errors.postalCode}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2 xs:col-span-2">
          <Label value="Address" htmlFor="address" asterisk={true} />
          <Input
            id="address"
            placeholder="Enter Your Address"
            required={true}
            value={formData.address}
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
              errors.address && setErrors({ ...errors, address: "" });
            }}
          />
          {errors.address && (
            <p className="-mt-1 text-[11.5px] text-red-400">{errors.address}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ShippingAddress);
