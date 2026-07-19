import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
  Chip,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

// icons
import CloseIcon from "@mui/icons-material/Close";

const ProductFormDetails = ({
  loading,
  formData,
  formDataChange,
  errors,
  errorsChange,
  submitHandler,
  mode,
  onClose,
}) => {
  // Tag Input Field
  const [tagsInput, setTagsInput] = useState("");
  const Navigate = useNavigate();

  return (
    <div className="flex flex-col p-5 gap-6 bg-bg-card rounded-3xl shadow border border-border">
      {/* Product Name */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="Product_Name"
          className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
        >
          Product Name
        </label>
        <input
          type="text"
          required
          id="Product_Name"
          placeholder="iphone 16 Pro Max"
          value={formData.name}
          onChange={(e) => {
            formDataChange({ ...formData, name: e.target.value });
            errorsChange({ ...errors, name: "" });
          }}
          className="w-full bg-primary/4 py-2.5 px-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
        />
        {errors.name && (
          <p className="text-red-400 text-xs -mt-2">{errors.name}</p>
        )}
      </div>

      {/* Short Description */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="short_description"
          className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
        >
          Short Description
        </label>
        <input
          type="text"
          id="short_description"
          required
          value={formData.shortDescription}
          onChange={(e) => {
            formDataChange({
              ...formData,
              shortDescription: e.target.value,
            });
            errorsChange({ ...errors, shortDescription: "" });
          }}
          placeholder="Minimum 10 characters"
          className="w-full bg-primary/4 py-2.5 px-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
        />
        {errors.shortDescription && (
          <p className="text-red-400 text-xs -mt-2">
            {errors.shortDescription}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="description"
          className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
        >
          Description
        </label>
        <textarea
          type="text"
          id="description"
          required
          value={formData.description}
          onChange={(e) => {
            formDataChange({ ...formData, description: e.target.value });
            errorsChange({ ...errors, description: "" });
          }}
          placeholder="Minimum 20 characters"
          className="w-full bg-primary/4 py-2.5 px-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
          rows={5}
        />
        {errors.description && (
          <p className="text-red-400 text-xs -mt-2">{errors.description}</p>
        )}
      </div>

      {/* Price && Discount Price */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 justify-between">
        {/* Price */}
        <div className="flex flex-col gap-3 grow">
          <label
            htmlFor="price"
            className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
          >
            Price
          </label>
          <div className="relative">
            <input
              type="number"
              id="price"
              required
              value={formData.price}
              onChange={(e) => {
                formDataChange({ ...formData, price: e.target.value });
                errorsChange({ ...errors, price: "" });
              }}
              placeholder="e.g. 199.99"
              className="w-full bg-primary/4 py-2.5 pl-3 pr-10 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration- [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
            />

            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
              <button
                type="button"
                onClick={() =>
                  formDataChange({
                    ...formData,
                    price: Number(formData.price || 0) + 1,
                  })
                }
                className="flex h-3 w-6 sm:h-4 text-[11px] sm:text-xs items-center justify-center text-text-muted hover:text-primary transition-colors"
              >
                ▲
              </button>

              <button
                type="button"
                onClick={() =>
                  formDataChange({
                    ...formData,
                    price: Math.max(0, Number(formData.price || 0) - 1),
                  })
                }
                className="flex h-3 w-6 sm:h-4 text-[11px] sm:text-xs items-center justify-center text-text-muted hover:text-primary transition-colors"
              >
                ▼
              </button>
            </div>
          </div>
          {errors.price && (
            <p className="text-red-400 text-xs -mt-2">{errors.price}</p>
          )}
        </div>

        {/* Discount Price */}
        <div className="flex flex-col gap-3 grow">
          <label
            htmlFor="discount_price"
            className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
          >
            Discount Price
          </label>
          <div className="relative">
            <input
              type="number"
              id="discount_price"
              required
              value={formData.discountPrice}
              onChange={(e) => {
                formDataChange({
                  ...formData,
                  discountPrice: e.target.value,
                });
                errorsChange({
                  ...errors,
                  discountPrice: "",
                });
              }}
              placeholder="e.g. 99.99"
              className="w-full bg-primary/4 py-2.5 pl-3 pr-10 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200              [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
            />

            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
              <button
                type="button"
                onClick={() =>
                  formDataChange({
                    ...formData,
                    discountPrice: Number(formData.discountPrice || 0) + 1,
                  })
                }
                className="flex h-3 w-6 sm:h-4 text-[11px] sm:text-xs items-center justify-center text-text-muted hover:text-primary transition-colors"
              >
                ▲
              </button>

              <button
                type="button"
                onClick={() =>
                  formDataChange({
                    ...formData,
                    discountPrice: Math.max(
                      0,
                      Number(formData.discountPrice || 0) - 1,
                    ),
                  })
                }
                className="flex h-3 w-6 sm:h-4 text-[11px] sm:text-xs items-center justify-center text-text-muted hover:text-primary transition-colors"
              >
                ▼
              </button>
            </div>
          </div>
          {errors.discountPrice && (
            <p className="text-red-400 text-xs -mt-2">{errors.discountPrice}</p>
          )}
        </div>
      </div>

      {/* Stock && SKU */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 justify-between">
        {/* Stock */}
        <div className="flex flex-col gap-3 grow">
          <label
            htmlFor="stock"
            className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
          >
            Stock
          </label>
          <div className="relative">
            <input
              type="number"
              id="stock"
              required
              value={formData.stock}
              onChange={(e) => {
                formDataChange({
                  ...formData,
                  stock: e.target.value,
                });
                errorsChange({
                  ...errors,
                  stock: "",
                });
              }}
              placeholder="e.g. 50"
              className="w-full bg-primary/4 py-2.5 pl-3 pr-10 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
            />

            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
              <button
                type="button"
                onClick={() =>
                  formDataChange({
                    ...formData,
                    stock: Number(formData.stock || 0) + 1,
                  })
                }
                className="flex h-3 w-6 sm:h-4 text-[11px] sm:text-xs items-center justify-center text-text-muted hover:text-primary transition-colors"
              >
                ▲
              </button>

              <button
                type="button"
                onClick={() =>
                  formDataChange({
                    ...formData,
                    stock: Math.max(0, Number(formData.stock || 0) - 1),
                  })
                }
                className="flex h-3 w-6 sm:h-4 text-[11px] sm:text-xs items-center justify-center text-text-muted hover:text-primary transition-colors"
              >
                ▼
              </button>
            </div>
          </div>
          {errors.stock && (
            <p className="text-red-400 text-xs -mt-2">{errors.stock}</p>
          )}
        </div>

        {/* SKU */}
        <div className="flex flex-col gap-3 grow">
          <label
            htmlFor="sku"
            className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
          >
            SKU
          </label>
          <input
            type="text"
            id="sku"
            required
            value={formData.sku}
            onChange={(e) => {
              formDataChange({ ...formData, sku: e.target.value });
              errorsChange({ ...errors, sku: "" });
            }}
            placeholder="e.g. IPH15-BLK-128"
            className="w-full bg-primary/4 py-2.5 px-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
          />
          {errors.sku && (
            <p className="text-red-400 text-xs -mt-2">{errors.sku}</p>
          )}
        </div>
      </div>

      {/* Category && Subcategory */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 justify-between">
        {/* Category */}
        <div className="flex flex-col gap-3 grow">
          <label
            htmlFor="category"
            className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
          >
            Category
          </label>

          <Select
            id="category"
            value={formData.category}
            onChange={(e) => {
              formDataChange({
                ...formData,
                category: e.target.value,
              });

              errorsChange({
                ...errors,
                category: "",
              });
            }}
            displayEmpty
            className={`!w-full !h-10.5 !bg-primary/4 !text-sm ${formData.category ? "!text-text-primary" : "!text-text-muted/50"} !rounded-md !outline-0 !transition-all !duration-200 [&_.MuiOutlinedInput-notchedOutline]:!border-1 [&_.MuiOutlinedInput-notchedOutline]:!border-border [&.Mui-focused_.MuiOutlinedInput-notchedOutline]:!border-0 [&.Mui-focused_.MuiOutlinedInput-notchedOutline]:!ring-2 [&.Mui-focused_.MuiOutlinedInput-notchedOutline]:!ring-primary/30 dark:[&.Mui-focused_.MuiOutlinedInput-notchedOutline]:!ring-primary/70 [&_.MuiSelect-icon]:!text-text-primary/60`}
            MenuProps={{
              slotProps: {
                paper: {
                  className:
                    "!bg-bg-hover !text-text-primary !border !border-border !rounded-lg",
                },
              },
            }}
          >
            <MenuItem
              value=""
              disabled
              className="!text-text-muted/50 !text-sm"
            >
              Select category
            </MenuItem>

            <MenuItem
              value="electronics"
              className="hover:!bg-bg-card/25 !transition !duration-100 !text-sm"
            >
              Electronics
            </MenuItem>

            <MenuItem
              value="fashion"
              className="hover:!bg-bg-card/25 !transition !duration-100 !text-sm"
            >
              Fashion
            </MenuItem>

            <MenuItem
              value="accessories"
              className="hover:!bg-bg-card/25 !transition !duration-100 !text-sm"
            >
              Accessories
            </MenuItem>
          </Select>

          {errors.category && (
            <p className="text-red-400 text-xs -mt-2">{errors.category}</p>
          )}
        </div>

        {/* Subcategory */}
        <div className="flex flex-col gap-3 grow">
          <label
            htmlFor="subcategory"
            className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
          >
            Subcategory
          </label>
          <input
            type="text"
            id="subcategory"
            required
            value={formData.subcategory}
            onChange={(e) => {
              formDataChange({ ...formData, subcategory: e.target.value });
              errorsChange({ ...errors, subcategory: "" });
            }}
            placeholder="e.g. IPH15-BLK-128"
            className="w-full bg-primary/4 py-2.5 px-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
          />
          {errors.subcategory && (
            <p className="text-red-400 text-xs -mt-2">{errors.subcategory}</p>
          )}
        </div>
      </div>

      {/* Brand */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="brand"
          className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
        >
          Brand
        </label>
        <input
          type="text"
          id="brand"
          required
          value={formData.brand}
          onChange={(e) => {
            formDataChange({ ...formData, brand: e.target.value });
            errorsChange({ ...errors, brand: "" });
          }}
          placeholder="e.g. Apple"
          className="w-full bg-primary/4 py-2.5 px-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
        />
        {errors.brand && (
          <p className="text-red-400 text-xs -mt-2">{errors.brand}</p>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-3 w-full bg-primary/4 py-2.5 px-4 border border-border rounded-md">
        <label
          htmlFor="tags"
          className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
        >
          Tags
        </label>
        <div className="flex gap-4 justify-between items-center">
          <input
            type="text"
            id="tags"
            required
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. electronics"
            className="w-full bg-white/40 dark:bg-white/3 py-2 sm:py-3.5 px-3 text-sm text-text-primary placeholder:text-text-muted/50 border border-border/70 rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
          />
          <Button
            variant="contained"
            onClick={() => {
              if (tagsInput.length > 3) {
                formDataChange({
                  ...formData,
                  tags: [...formData.tags, tagsInput],
                });
                setTagsInput("");
                errorsChange({ ...errors, tags: "" });
              }
            }}
            className=" !min-w-0 !rounded-md !px-2.5 sm:!px-3.5 !py-1.5 sm:!py-3 !bg-primary/80 hover:!bg-primary-hover/70 isActive:!bg-primary-isActive !text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus-icon lucide-plus "
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </Button>
        </div>

        {formData?.tags?.length > 0 ? (
          <div className="flex gap-2 flex-wrap mt-2">
            {formData.tags.map((tag, index) => (
              <Chip
                key={tag + index}
                // sx={{ boxShadow: "0 0 0" }}
                deleteIcon={
                  <IconButton className="!flex !items-center !justify-center !bg-secondary/12 dark:!bg-secondary/22 hover:!bg-secondary/20 !text-white !size-3 sm:!size-4.75">
                    <CloseIcon className="!text-[11px] sm:!text-[14px] !text-white" />
                  </IconButton>
                }
                className="!bg-secondary/8 !text-[11px] max-sm:!h-6.5 sm:!text-xs dark:!bg-secondary/15 !font-semibold !text-text-primary/85 backdrop-blur-xl border border-white/30 shadow-[1px_1px_2px] shadow-secondary/25"
                label={tag}
                onDelete={() =>
                  formDataChange({
                    ...formData,
                    tags: formData.tags.filter((e) => tag !== e),
                  })
                }
              />
            ))}
          </div>
        ) : (
          <span className="text-xs text-text-primary/60">
            Add one or more tags to organize the product.
          </span>
        )}
        {errors.tags && (
          <p className="text-red-400 text-xs -mt-2">{errors.tags}</p>
        )}
      </div>

      {/* Featured && isActive */}
      <div className="flex justify-center md:justify-start gap-4">
        {/* Featured */}
        <div className="flex items-center rounded-2xl border border-border bg-primary/4 px-3 py-1.5">
          <FormControlLabel
            checked={formData.featured}
            onChange={(e) =>
              formDataChange({ ...formData, featured: e.target.checked })
            }
            control={
              <Checkbox
                size="small"
                className="!text-primary [&.Mui-checked]:!text-primary [&_.MuiSvgIcon-root]:!text-[16px] sm:[&_.MuiSvgIcon-root]:!text-[18px] !p-0 !mr-2"
              />
            }
            label="Featured"
            slotProps={{
              typography: {
                className: "!text-xs sm:!text-sm !text-text-primary",
              },
            }}
            className="!m-0 flex justify-center"
          />
        </div>

        {/* isActive */}
        <div className="flex items-center rounded-2xl border border-border bg-primary/4 px-3 py-1.5">
          <FormControlLabel
            checked={formData.isActive}
            onChange={(e) =>
              formDataChange({ ...formData, isActive: e.target.checked })
            }
            control={
              <Checkbox
                size="small"
                className="!text-primary [&.Mui-checked]:!text-primary [&_.MuiSvgIcon-root]:!text-[16px] sm:[&_.MuiSvgIcon-root]:!text-[18px] !p-0 !mr-2"
              />
            }
            label="isActive"
            slotProps={{
              typography: {
                className: "!text-xs sm:!text-sm !text-text-primary",
              },
            }}
            className="!m-0 flex justify-center"
          />
        </div>
      </div>

      <hr className="border-0 border-t border-t-border" />

      <div className="flex justify-end items-center gap-3">
        <Button
          variant="outlined"
          type="button"
          className="!text-xs sm:!text-sm !capitalize !rounded-md !px-2 sm:!px-4 !py-2 sm:!py-2.5 !border-border !text-text-secondary hover:!bg-bg-hover hover:!border-secondary/40 transition-all"
          onClick={() => {
            if (mode === "quick-edit") {
              onClose();
            } else {
              Navigate("/products", { replace: true });
            }
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          onClick={submitHandler}
          className="!text-xs sm:!text-sm !capitalize !font-semibold !rounded-md !px-2 sm:!px-4 !py-2 sm:!py-2.5 !bg-primary/80 hover:!bg-primary-hover/70 disabled:!opacity-70 !text-white !flex !items-center !gap-2"
        >
          {loading && <CircularProgress size={15} className="!text-white" />}

          {mode === "add"
            ? loading
              ? "Creating..."
              : "Create Product"
            : loading
              ? "Saving..."
              : "Save Change"}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ProductFormDetails);
