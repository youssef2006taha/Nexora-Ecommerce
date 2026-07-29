import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import NumericStepper from "../../../components/UI/NumericStepper";
import Select from "../../../components/UI/Select";
import Button from "../../../components/UI/Button";

import {
  setFiltersProducts,
  resetFilters,
} from "../../../features/products/productsSlice";

export default function MobileFilterDrawer({
  open,
  setOpen,
  initialFilters,
  filters,
  setFilters,
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const dispatch = useDispatch();

  const { products } = useSelector((store) => store.products);

  // Categories
  const categories = [
    ...new Set(
      products
        ?.map((p) =>
          typeof p.category === "object" ? p.category?.name : p.category,
        )
        .filter(Boolean),
    ),
  ];

  return (
    <Drawer
      key={isDesktop ? "desktop" : "mobile"}
      anchor={isDesktop ? "left" : "right"}
      variant={isDesktop ? "permanent" : "temporary"}
      open={isDesktop ? true : open}
      onClose={() => setOpen(false)}
      slotProps={{
        paper: {
          className:
            "md:!relative sm:!z-1 !w-[280px] md:!h-fit !bg-bg-card !text-text-primary !p-5 !rounded-2xl border border-border",
        },
      }}
    >
      {/* Categories */}
      <div className="mb-8">
        <h3 className="mb-3 font-semibold text-[15px]">Categories</h3>

        <div className="space-y-3">
          <label className="text-[13px] flex items-center gap-2 cursor-pointer capitalize">
            <input
              type="radio"
              name="category"
              value="All Categories"
              checked={filters.category === "All Categories"}
              onChange={(e) => {
                const newValue = { ...filters, category: e.target.value };
                setFilters(newValue);
                dispatch(setFiltersProducts(newValue));
              }}
              className="accent-primary"
            />
            All Categories
          </label>

          {categories.map((cat) => (
            <label
              key={cat}
              className="text-[13px] flex items-center gap-2 cursor-pointer capitalize"
            >
              <input
                type="radio"
                name="category"
                value={cat}
                checked={filters.category === cat}
                onChange={(e) => {
                  const newValue = { ...filters, category: e.target.value };
                  setFilters(newValue);
                  dispatch(setFiltersProducts(newValue));
                }}
                className="accent-primary"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-8">
        <h3 className="mb-3 font-semibold text-[15px]">Price Range</h3>

        <div className="flex gap-2">
          <NumericStepper
            id="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            className="!h-9"
            onChange={(e) => {
              const newValue = {
                ...filters,
                minPrice: e.target.value >= 0 ? e.target.value : 0,
              };
              setFilters(newValue);
              dispatch(setFiltersProducts(newValue));
            }}
            incrementHandler={() => {
              const newValue = {
                ...filters,
                minPrice: Number(filters.minPrice || 0) + 1,
              };
              setFilters(newValue);
              dispatch(setFiltersProducts(newValue));
            }}
            decrementHandler={() => {
              const newValue = {
                ...filters,
                minPrice: Math.max(0, Number(filters.minPrice || 0) - 1),
              };
              setFilters(newValue);
              dispatch(setFiltersProducts(newValue));
            }}
          />

          <NumericStepper
            id="minPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            className="!h-9"
            onChange={(e) => {
              const newValue = {
                ...filters,
                maxPrice: e.target.value >= 0 ? e.target.value : 0,
              };
              setFilters(newValue);
              dispatch(setFiltersProducts(newValue));
            }}
            incrementHandler={() => {
              const newValue = {
                ...filters,
                maxPrice: Number(filters.maxPrice || 0) + 1,
              };
              setFilters(newValue);
              dispatch(setFiltersProducts(newValue));
            }}
            decrementHandler={() => {
              const newValue = {
                ...filters,
                maxPrice: Math.max(0, Number(filters.maxPrice || 0) - 1),
              };
              setFilters(newValue);
              dispatch(setFiltersProducts(newValue));
            }}
          />
        </div>
      </div>

      {/* Sort */}
      <div className="mb-8">
        <h3 className="mb-3 font-semibold text-[15px]">Sort By</h3>
        <Select
          value={filters.sortBy}
          onChange={(e) => {
            const newValue = { ...filters, sortBy: e.target.value };
            setFilters(newValue);
            dispatch(setFiltersProducts(newValue));
          }}
          menuItems={[
            "Default",
            "Price Low → High",
            "Price High → Low",
            "Name A-Z",
            "Name Z-A",
          ]}
        />
      </div>

      <Button
        variant="primary"
        text="Clear All Filters"
        className="!h-9 sm:!h-10 max-sm:!text-[12px]"
        onClick={() => {
          dispatch(resetFilters());
          setFilters(initialFilters);
        }}
      />
    </Drawer>
  );
}
