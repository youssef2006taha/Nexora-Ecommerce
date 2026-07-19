// import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";

const ProductGallerySection = ({
  formData,
  formDataChange,
  errors,
  errorsChange,
  removedImages,
  mode,
}) => {
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    const imageFiles = files.map((file) => ({
      id: uuidv4(),
      file,
      url: URL.createObjectURL(file),
      isNew: true,
    }));

    formDataChange({
      ...formData,
      images: [...formData.images, ...imageFiles],
    });

    errorsChange({ ...errors, images: "" });
  };

  const handleRemoveImage = (id) => {
    const image = formData.images.find((image) => image.id === id);

    if (mode !== "add" && image && !image.isNew) {
      removedImages.current.push(image.public_id);
    }

    formDataChange((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image.id !== id),
    }));
  };

  return (
    <div className="flex flex-col p-5 gap-6 bg-bg-card rounded-3xl shadow border border-border">
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-accent/15 text-accent backdrop-blur rounded-2xl shrink-0">
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
            className="lucide lucide-image-plus-icon lucide-image-plus size-7"
          >
            <path d="M16 5h6" />
            <path d="M19 2v6" />
            <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            <circle cx="9" cy="9" r="2" />
          </svg>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-text-primary text-lg">Gallery</h3>
          <p className="capitalize text-text-secondary text-sm">
            Upload multiple images and preview instantly.
          </p>
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
        {formData?.images?.length > 0 ? (
          formData.images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden relative group rounded-2xl border border-border bg-white/5 backdrop-blur-2xl"
            >
              <IconButton
                size="small"
                className="!opacity-0 group-hover:!opacity-100 !transition-opacity !duration-200 !absolute !top-2 !right-2 !bg-black/60 !text-white"
                onClick={() => handleRemoveImage(image.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              <img
                src={image.url}
                alt={`Image ${index + 1}`}
                className="h-28 w-full object-cover"
              />

              <p className="px-3 py-2 text-xs uppercase tracking-[0.2rem]">
                Image {index + 1}
              </p>
            </div>
          ))
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-white/5 backdrop-blur-2xl">
            <img
              src="/images.jpg"
              alt="Product"
              className="h-28 w-full object-cover"
            />

            <p className="px-3 py-2 text-xs uppercase tracking-[0.2rem]">
              Image 1
            </p>
          </div>
        )}
      </div>

      {/* Upload Image */}
      <label
        htmlFor="images"
        className=" flex flex-col gap-2.5 p-8 items-center justify-center text-center w-full rounded-3xl border-2 border-dashed border-accent/20 bg-accent/3 cursor-pointer transition-all duration-200 hover:border-accent/25 hover:bg-accent/5"
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
          className="lucide lucide-image-plus-icon lucide-image-plus text-accent"
        >
          <path d="M16 5h6" />
          <path d="M19 2v6" />
          <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          <circle cx="9" cy="9" r="2" />
        </svg>

        <h3 className="text-lg text-text-primary">Upload images</h3>

        <p className="text-sm text-text-secondary">
          PNG, JPG, WEBP • multiple files supported
        </p>

        <input
          id="images"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImagesChange}
        />
      </label>

      {errors.images && (
        <p className="text-red-400 text-xs -mt-2">{errors.images}</p>
      )}

      <div className="flex flex-col gap-1 p-4 bg-accent/7 border border-accent/15 rounded-3xl">
        <div className="flex gap-2 items-center text-accent/80">
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
            className="lucide lucide-sparkles-icon lucide-sparkles size-4"
          >
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            <path d="M20 2v4" />
            <path d="M22 4h-4" />
            <circle cx="4" cy="20" r="2" />
          </svg>
          <span className="font-semibold text-sm">Senior UX</span>
        </div>
        <p className="text-xs text-accent/85 dark:text-accent/70">
          Optimized product creation experience with responsive design and
          smooth interactions.
        </p>
      </div>
    </div>
  );
};

export default ProductGallerySection;
