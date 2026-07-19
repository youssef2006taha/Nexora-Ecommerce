import React from 'react'
import { BsBox2 } from 'react-icons/bs';
import { FaHome, FaLongArrowAltRight, FaRegHeart } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';


const linksList = [
    {
        id: 1,
        name: 'home',
        link: '/home',
        icon: <FaHome />
    },
    {
        id: 2,
        name: 'shop',
        link: "/shop",
        icon: <MdOutlineShoppingCart />
    },
    {
        id: 3,
        name: 'my orders',
        link: "/orders",
        icon: <BsBox2 />

    },
    {
        id: 4,
        name: 'wishlist',
        link: "/wishlist",
        icon: <FaRegHeart />

    }
]



const Sidebar = () => {

    const [openSideBar, setOpenSideBar] = React.useState(false)

    const handleOpenSideBar = () => {
        setOpenSideBar(prev => !prev)
    }

    return (
        <div>
            <button
                onClick={handleOpenSideBar}
                className=" md:hidden flex rounded-full p-2 text-black border border-slate-200 shadow bg-slate-50 hover:bg-white hover:text-indigo-500  transition dark:text-slate-300 dark:bg-slate-900 dark:border-slate-800  dark:hover:bg-gray-800"
            >
                <GiHamburgerMenu />
            </button >

            {
                openSideBar && (<div className="absolute top-0 left-0 w-full h-[100vh] bg-black/50">
                    <div className="w-2/3 h-full p-5 flex-col flex gap-5 bg-slate-200 text-slate-900 dark:bg-slate-900 dark:text-slate-300">
                        <div className="flex  items-center justify-between w-full">
                            <h1 className='text-2xl font-bold capitalize flex flex-col gap-1'>
                                koda store
                                <span className='text-sm text-gray-500 font-light'>welcome</span>
                            </h1>
                            <span
                                className="cursor-pointer"
                                onClick={handleOpenSideBar}
                            >
                                <FaXmark />
                            </span>
                        </div>

                        <div
                            className="flex gap-1 items-center p-1 rounded-2xl bg-white dark:bg-indigo-800"
                        >
                            <span
                                className='text-2xl bg-indigo-500 rounded-full py-1 px-3 text-white'
                            >
                                A
                            </span>
                            <div className="flex flex-col  items-center  p-2 ">
                                <h2 className="font-semibold text-sm">John Doe</h2>
                                <Link
                                    to={'/profile'}
                                    className=" text-indigo-500 text-xs flex items-center gap-1.5">
                                    view profile
                                    <FaLongArrowAltRight />
                                </Link>
                            </div>
                        </div>

                        <nav className="flex flex-col gap-3 mt-5">

                            {linksList.map((link) =>{
                                const icon = link.icon
                           return (
                                <NavLink
                                id={link.id}
                                    to={link.link}
                                    className={({ isActive }) =>
                                        `flex items-center gap-1 w-full rounded-2xl p-2 dark:text-slate-300 hover:text-indigo-500 hover:bg-indigo-200 dark:hover:text-indigo-500 ${isActive
                                            ?
                                            "text-indigo-500 bg-indigo-200/60 dark:bg-indigo-600"
                                            :
                                            ""
                                        }`
                                    }
                                >
                                    {icon}
                                    {link.name}
                                </NavLink>
                            )})}


                        </nav>

                        <button
                            // onClick={handleLogout}
                            className="flex w-full items-center
                             text-sm font-semibold text-red-600
                              transition justify-center gap-2 rounded-2xl
                               border border-red-200 bg-red-50 py-3 
                                hover:bg-red-100
                                 dark:border-red-800/40 dark:bg-red-900/10
                                  dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                            <IoLogOutOutline />
                            log out
                        </button>
                    </div>
                </div>)
            }

        </div >
    )
}

export default Sidebar