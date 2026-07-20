import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../features/theme/themeSlice";

import Sidebar from "./sidebar";

import Logo from "../../../assets/logo1.png";
import SearchInput from "./searchInput";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

const linksList = [
  {
    id: 1,
    name: "home",
    link: "/home",
  },
  {
    id: 2,
    name: "shop",
    link: "/shop",
  },
  {
    id: 3,
    name: "my orders",
    link: "/orders",
  },
  {
    id: 4,
    name: "wishlist",
    link: "/wishlist",
  },
];

const Header = () => {
  const [wishlistItemsCount, setWishlistItemsCount] = useState(3);
  const [cartItemsCount, setCartItemsCount] = useState(2);
  const { theme } = useSelector((store) => store.theme);
  const themeDispatch = useDispatch();

  const handleChangeTheme = () => {
    themeDispatch(toggleTheme());
  };

  return (
    <header className="flex items-center h-16 justify-between fixed top-0 right-0 left-0 border-b border-divider shadow-xs bg-bg-navbar z-sticky transition-all duration-300">
      <Link to={"/home"} className="w-20 p-1 md:w-25">
        <img src={Logo} alt="Logo" className="w-full" />
      </Link>

      <div className=" hidden  px-3 py-2 md:flex items-center gap-4 dark:bg-slate-900/90 rounded-4xl shadow">
        {linksList.map((link) => (
          <NavLink
            key={link.id}
            to={link.link}
            className={({ isActive }) =>
              `text-sm px-4 py-2 rounded-full dark:text-slate-200 transition-colors duration-300 capitalize shadow-md ${
                isActive
                  ? "bg-indigo-600 text-white "
                  : "text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-2 ">
        <SearchInput />

        <button
          onClick={handleChangeTheme}
          className="rounded-full p-2 text-black border border-slate-200 shadow bg-slate-50 hover:bg-white hover:text-indigo-500  transition dark:text-slate-300 dark:bg-slate-900 dark:border-slate-800  dark:hover:bg-gray-800"
        >
          {theme === "light" ? <IoMoonOutline /> : <IoSunnyOutline />}
        </button>

        <Link
          to={"/wishlist"}
          className="relative rounded-full p-2 text-black border border-slate-300 shadow bg-slate-50 hover:bg-white hover:text-indigo-500  transition dark:text-slate-300 dark:bg-slate-900 dark:border-slate-800  dark:hover:bg-gray-800"
        >
          <span className="absolute -top-2 text-xs -right-1 text-white  px-1.5 flex items-center justify-center rounded-full bg-indigo-500">
            {wishlistItemsCount}
          </span>
          <FaRegHeart />
        </Link>

        <Link
          to={"/cart"}
          className="relative rounded-full p-2 text-black  border border-slate-300 shadow bg-slate-50 hover:bg-white hover:text-indigo-500  transition dark:text-slate-300 dark:bg-slate-900 dark:border-slate-800  dark:hover:bg-gray-800"
        >
          <span className="absolute -top-2 text-xs -right-1 text-white  px-1.5 flex items-center justify-center rounded-full bg-indigo-500">
            {cartItemsCount}
          </span>
          <MdOutlineShoppingCart />
        </Link>

        <Link
          to={"/cart"}
          className="hidden md:flex items-center gap-1 rounded-full p-2 text-black  border border-slate-300 shadow bg-slate-50 hover:bg-white hover:text-indigo-500  transition dark:text-slate-300 dark:bg-slate-900 dark:border-slate-800  dark:hover:bg-gray-800"
        >
          <FaRegUser />
          user
        </Link>

        <Sidebar />
      </div>
    </header>
  );
};

export default React.memo(Header);
