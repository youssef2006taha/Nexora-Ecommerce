import React, { useState } from 'react';
import { BsBox2 } from 'react-icons/bs';
import { FaHome, FaLongArrowAltRight, FaRegHeart } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoLogOutOutline, IoSearch } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from "../../../features/auth/authSlice"

const linksList = [
  { id: 1, name: 'home', link: '/home', icon: <FaHome /> },
  { id: 2, name: 'shop', link: '/shop', icon: <MdOutlineShoppingCart /> },
  { id: 3, name: 'my orders', link: '/orders', icon: <BsBox2 /> },
  { id: 4, name: 'wishlist', link: '/wishlist', icon: <FaRegHeart /> },
];

const Sidebar = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleSideBar = () => {
    setOpenSideBar((prev) => !prev);
  };

  const handleCloseSideBar = () => {
    setOpenSideBar(false);
  };

  const handleLogout = () => {
    dispatch(logout())
    handleCloseSideBar();
    navigate('/login');
  };

  const handleSidebarSearchSubmit = (e) => {
    if (e.key === 'Enter' && sidebarSearch.trim()) {
      navigate(`/shop?search=${encodeURIComponent(sidebarSearch.trim())}`);
      setSidebarSearch('');
      handleCloseSideBar();
    }
  };

  return (
    <div>
      <button
        onClick={handleToggleSideBar}
        aria-label="Open Navigation Menu"
        className="lg:hidden flex rounded-full p-2 text-text-primary border border-border shadow bg-bg-surface hover:bg-bg-hover hover:text-primary transition"
      >
        <GiHamburgerMenu />
      </button>

      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          openSideBar ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={handleCloseSideBar}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            openSideBar ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Sidebar Panel — العرض هنا اتظبط لـ 280px للموبايل و 320px للشاشات الأكبر */}
        <aside
          className={`relative w-[280px] sm:w-[320px] h-full p-5 flex-col flex gap-5 bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-300 overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out z-10 ${
            openSideBar ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold capitalize flex flex-col gap-1">
              koda store
              <span className="text-sm text-gray-500 font-light">welcome</span>
            </h1>
            <button
              onClick={handleCloseSideBar}
              aria-label="Close Menu"
              className="cursor-pointer text-xl p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
            >
              <FaXmark />
            </button>
          </div>

          {/* Profile */}
          <div className="flex gap-2 items-center p-2 rounded-2xl bg-white dark:bg-slate-800 shadow-sm">
            <span className="text-xl bg-indigo-500 rounded-full py-1 px-3 text-white font-bold">
              A
            </span>
            <div className="flex flex-col p-1">
              <h2 className="font-semibold text-sm">John Doe</h2>
              <Link
                to={'/profile'}
                onClick={handleCloseSideBar}
                className="text-indigo-500 text-xs flex items-center gap-1.5"
              >
                view profile
                <FaLongArrowAltRight />
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="sm:hidden relative flex items-center w-full my-1">
            <input
              type="text"
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              onKeyDown={handleSidebarSearchSubmit}
              placeholder="Search products..."
              className="w-full rounded-xl border border-border shadow-inner bg-white dark:bg-slate-800 text-text-primary text-sm py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <IoSearch className="absolute left-3 text-gray-400 text-base pointer-events-none" />
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2 mt-2">
            {linksList.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.id}
                  to={link.link}
                  onClick={handleCloseSideBar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full rounded-xl p-3 transition-colors ${
                      isActive
                        ? 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/40 font-medium'
                        : 'hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <span className="text-lg">{Icon}</span>
                  <span className="capitalize text-sm">{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto flex w-full items-center text-sm font-semibold text-red-600 transition justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3 hover:bg-red-100 dark:border-red-800/40 dark:bg-red-900/10 dark:text-red-400"
          >
            <IoLogOutOutline className="text-lg" />
            log out
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;