import React from 'react'
import { CiSearch } from 'react-icons/ci';
import { IoSearch } from 'react-icons/io5';
import { PiXBold } from 'react-icons/pi';

const SearchInput = () => {

    const [openInput, setOpenInput] = React.useState(false);



    const handleSearch = () => {
        setOpenInput(prev => !prev);
    }

    return (
        <>
            {
                openInput ? (
                    <div className="relative">
                        <input
                        autoFocus
                            type="text"
                            placeholder="Search..."
                            className="rounded-4xl border border-slate-300 shadow-xl bg-slate-50 py-2 px-4 outline-none"
                        />
                        <button
                        className='absolute top-2.5 right-2.5 text-black text-lg'
                        onClick={handleSearch}
                        >
                            <PiXBold />

                        </button>
                    </div>
                )
                    : (
                        <button
                            onClick={handleSearch}
                            className=" hidden md:block rounded-full p-2 text-black  border border-slate-300 shadow bg-slate-50 hover:bg-white hover:text-indigo-500 font-semibold transition dark:text-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-gray-800"
                        >
                          <IoSearch />
                        </button >
                    )

            }

        </>)
}

export default SearchInput