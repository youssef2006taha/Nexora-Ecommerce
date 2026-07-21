import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { PiXBold } from 'react-icons/pi';

const SearchInput = () => {
  const [openInput, setOpenInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const toggleSearch = () => {
    setOpenInput((prev) => !prev);
    if (openInput) setSearchTerm('');
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setOpenInput(false);
    } else if (e.key === 'Escape') {
      setOpenInput(false);
    }
  };

  return (
    <div className="relative hidden sm:flex items-center">
      <div
        className={`absolute top-full right-0 mt-3 lg:mt-0 lg:static flex flex-shrink items-center overflow-hidden transition-all duration-300 ease-in-out z-50 ${
          openInput
            ? 'w-64 lg:w-auto max-w-64 opacity-100 lg:mr-2 pointer-events-auto'
            : 'w-0 opacity-0 mr-0 pointer-events-none'
        }`}
      >
        <input
          autoFocus={openInput}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchSubmit}
          placeholder="Search products..."
          className="w-full rounded-full border border-border shadow-lg bg-bg-surface text-text-primary text-sm py-2 pl-4 pr-9 outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300"
        />
      </div>

      <button
        type="button"
        onClick={toggleSearch}
        aria-label="Open search"
        className="rounded-full p-2 text-text-primary border border-border shadow-sm bg-bg-surface hover:bg-bg-hover hover:text-primary transition-all duration-300 shrink-0"
      >
        <IoSearch />
      </button>
    </div>
  );
};

export default SearchInput;