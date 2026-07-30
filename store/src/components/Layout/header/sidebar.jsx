import React, { useState } from 'react';
import { BsBox2 } from 'react-icons/bs';
import { FaHome, FaLongArrowAltRight, FaRegHeart } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoLogOutOutline, IoSearch } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from "../../../features/auth/authSlice";
import { setFiltersProducts } from "../../../features/products/productsSlice";

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

  const { filters } = useSelector((store) => store.products);

  const handleToggleSideBar = () => {
    setOpenSideBar((prev) => !prev);
  };

  const handleCloseSideBar = () => {
    setOpenSideBar(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseSideBar();
    navigate('/login');
  };

  const submitSidebarSearch = () => {
    const trimmed = sidebarSearch.trim();
    if (!trimmed) return;

    dispatch(setFiltersProducts({ ...filters, inputSearch: trimmed }));
    
    navigate('/shop');
    setSidebarSearch('');
    handleCloseSideBar();
  };

  const handleSidebarSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitSidebarSearch();
    }
  };

  return (
    <div>
      <button
        onClick={handleToggleSideBar}
        aria-label="Open Navigation Menu"
        className="lg:hidden flex rounded-full p-2.5 transition items-center justify-center border"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border)',
          color: 'var(--text-primary)',
        }}
      >
        <GiHamburgerMenu size={18} />
      </button>

      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          openSideBar ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
        <div
          onClick={handleCloseSideBar}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            openSideBar ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <aside
          className={`relative w-[280px] sm:w-[320px] h-full p-5 flex flex-col gap-5 overflow-y-auto shadow-2xl border-r transition-transform duration-300 ease-in-out z-10 ${
            openSideBar ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{
            backgroundColor: 'var(--bg-sidebar)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold capitalize flex flex-col gap-0.5" style={{ color: 'var(--primary)' }}>
              Koda Store
              <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>
                welcome back
              </span>
            </h1>
            <button
              onClick={handleCloseSideBar}
              aria-label="Close Menu"
              className="cursor-pointer text-xl p-1.5 rounded-lg transition hover:opacity-80"
              style={{ color: 'var(--text-muted)' }}
            >
              <FaXmark />
            </button>
          </div>

          <div
            className="flex gap-3 items-center p-3 rounded-2xl border shadow-xs"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border)',
            }}
          >
            <span
              className="text-lg rounded-full w-10 h-10 flex items-center justify-center font-bold text-white shrink-0 shadow-sm"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              A
            </span>
            <div className="flex flex-col">
              <h2 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                John Doe
              </h2>
              <Link
                to={'/profile'}
                onClick={handleCloseSideBar}
                className="text-xs flex items-center gap-1.5 font-medium hover:underline mt-0.5"
                style={{ color: 'var(--primary)' }}
              >
                view profile
                <FaLongArrowAltRight />
              </Link>
            </div>
          </div>

          <div className="sm:hidden relative flex items-center w-full my-1">
            <input
              type="text"
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              onKeyDown={handleSidebarSearchKeyDown}
              placeholder="Search products..."
              className="w-full rounded-xl border text-sm py-2.5 pl-9 pr-9 outline-none transition"
              style={{
                backgroundColor: 'var(--bg-main)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            />
            <IoSearch
              className="absolute left-3 text-base pointer-events-none"
              style={{ color: 'var(--text-placeholder)' }}
            />
            {sidebarSearch && (
              <button
                type="button"
                onClick={submitSidebarSearch}
                className="absolute right-3 text-xs font-semibold px-2 py-1 rounded-full bg-[var(--primary)] text-white"
              >
                Go
              </button>
            )}
          </div>

          <nav className="flex flex-col gap-1.5 mt-1">
            {linksList.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.id}
                  to={link.link}
                  onClick={handleCloseSideBar}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 w-full rounded-xl p-3 transition-all font-medium text-sm ${
                      isActive ? 'shadow-xs' : ''
                    }`
                  }
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                  })}
                >
                  <span className="text-lg">{Icon}</span>
                  <span className="capitalize">{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto flex w-full items-center text-sm font-semibold transition justify-center gap-2 rounded-xl border py-3 hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--danger-bg)',
              borderColor: 'rgba(239, 68, 68, 0.2)',
              color: 'var(--danger)',
            }}
          >
            <IoLogOutOutline className="text-lg" />
            Log Out
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;