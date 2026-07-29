import { useEffect, memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../features/theme/themeSlice";

import Sidebar from "./sidebar";
import Logo from "../../../assets/logo1.png";
import SearchInput from "./searchInput";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

import { GetMyCartThunk } from "../../../features/cart/Thunks/GetMyCartThunk";
import { GetWishlistThunk } from "../../../features/wishlist/Thunks/GetWishlistThunk";

const linksList = [
  { id: 1, name: "home", link: "/home" },
  { id: 2, name: "shop", link: "/shop" },
  { id: 3, name: "my orders", link: "/orders" },
  { id: 4, name: "wishlist", link: "/wishlist" },
];

const Header = () => {
  const dispatch = useDispatch();

  const { theme } = useSelector((store) => store.theme);
  const { totalQuantity } = useSelector((store) => store.cart);
  const { totalItems } = useSelector((store) => store.wishlist);

  const handleChangeTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    dispatch(GetMyCartThunk());
    dispatch(GetWishlistThunk());
  }, [dispatch]);

  return (
    <header className="flex items-center h-20 px-5 lg:px-20 justify-between fixed top-0 right-0 left-0 border-b border-divider shadow-xs bg-bg-navbar z-50 transition-all duration-300">
      <Link to={"/home"} className="w-32 sm:w-35 p-1">
        <img src={Logo} alt="Logo" className="w-full" />
      </Link>

      <div className="hidden px-3 py-2 lg:flex items-center gap-4 bg-bg-surface rounded-4xl shadow">
        {linksList.map((link) => (
          <NavLink
            key={link.id}
            to={link.link}
            className={({ isActive }) =>
              `text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 capitalize whitespace-nowrap ${
                isActive
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className="relative flex items-center gap-2">
        <SearchInput />

        <button
          onClick={handleChangeTheme}
          aria-label="Toggle Theme"
          className="rounded-full p-2 text-text-primary border border-border shadow bg-bg-surface hover:bg-bg-hover hover:text-primary transition"
        >
          {theme === "light" ? <IoMoonOutline /> : <IoSunnyOutline />}
        </button>

        <Link
          to={"/wishlist"}
          aria-label="Wishlist"
          className="relative rounded-full p-2 text-text-primary border border-border shadow bg-bg-surface hover:bg-bg-hover hover:text-primary transition"
        >
          {totalItems > 0 && (
            <span className="absolute -top-2 text-xs -right-1 text-white px-1.5 flex items-center justify-center rounded-full bg-indigo-500">
              {totalItems}
            </span>
          )}
          <FaRegHeart />
        </Link>

        <Link
          to={"/cart"}
          aria-label="Cart"
          className="relative rounded-full p-2 text-text-primary border border-border shadow bg-bg-surface hover:bg-bg-hover hover:text-primary transition"
        >
          {totalQuantity > 0 && (
            <span className="absolute -top-2 text-xs -right-1 text-white px-1.5 flex items-center justify-center rounded-full bg-indigo-500">
              {totalQuantity}
            </span>
          )}
          <MdOutlineShoppingCart />
        </Link>

        <Link
          to={"/profile"}
          className="hidden lg:flex items-center gap-1 rounded-full p-2 text-text-primary border border-border shadow bg-bg-surface hover:bg-bg-hover hover:text-primary transition text-sm"
        >
          <FaRegUser />
          user
        </Link>

        <Sidebar />
      </div>
    </header>
  );
};

export default memo(Header);