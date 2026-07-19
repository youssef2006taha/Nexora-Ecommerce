import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import Logo from '../../../assets/hero.png';
import SearchInput from "./searchInput";
import { IoMoonOutline } from "react-icons/io5";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

const linksList = [
  {
    id: 1,
    name: 'home',
    link: '/home'
  },
  {
    id: 2,
    name: 'shop',
    link: "/shop"
  },
  {
    id: 3,
    name: 'my orders',
    link: "/orders"
  },
  {
    id: 4,
    name: 'wishlist',
    link: "/wishlist"
  }
]


const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const activeDark = savedTheme === "dark";
    setDarkMode(activeDark);
    // document.documentElement.classList.toggle("dark", activeDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : "light")
  }, [darkMode])

  const handleChangeTheme = () => {
    setDarkMode(prev => !prev);
  }

  return (
    <header className="flex items-center justify-between py-2 px-30 shadow-sm dark:bg-black">
      <div className="h-x20 w-25">
        <img
          src={Logo}
          alt="Logo"
          className="w-full"
        />
      </div>

      <div className="px-3 py-2 flex items-center gap-4  rounded-4xl shadow">
        {linksList.map((link) => (
          <NavLink
            key={link.id}
            to={link.link}
            className={({ isActive }) =>
              `text-sm px-4 py-2 rounded-full transition-colors duration-300 capitalize shadow-md ${isActive
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
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
          className="rounded-full p-2 text-black border border-slate-200 shadow bg-slate-50 hover:bg-white hover:text-indigo-500  transition"
        >
          <IoMoonOutline />
        </button >

        <Link
          to={'/wishlist'}
          className="rounded-full p-2 text-black border border-slate-300 shadow bg-slate-50 hover:bg-white hover:text-indigo-500  transition"
        >
          <FaRegHeart />
        </Link>

        <Link
          to={'/cart'}
          className="rounded-full p-2 text-black  border border-slate-300 shadow bg-slate-50 hover:bg-white hover:text-indigo-500  transition"
        >
          <MdOutlineShoppingCart />
        </Link>

        <Link
          to={'/profile'}
          className="flex items-center gap-1 rounded-full p-2 text-black  border border-slate-300 shadow bg-slate-50 hover:bg-white hover:text-indigo-500  transition"
        >
          <FaRegUser />
          user
        </Link>
      </div>
    </header>
  );
};

export default React.memo(Header);
