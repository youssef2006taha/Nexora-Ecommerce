import { GiMoebiusStar } from "react-icons/gi"
import { TbCategory2 } from "react-icons/tb";
import { TbShoppingCartSearch } from "react-icons/tb";
import { Link } from "react-router-dom"
export default function Hero() {
    return (
        <section className="w-full bg-linear-to-br from-blue-900 via-blue-800 to-blue-700 flex p-4 lg:p-32 items-center h-[75vh] ">
            <div className="w-[80vw] lg:w-[30vw] flex flex-col flex-nowrap gap-y-4 lg:gap-y-6">
                <p className="flex items-center text-sm gap-1 flex-nowrap text-gray-300 -mb-1"><GiMoebiusStar className="text-2xl" /><span>Premium Shopping Experience</span></p>
                <h1 className="text-6xl font-bold text-white">Shop the future, delivered today</h1>
                <p className="text-lg text-gray-300">Discover premium products at unbeatable prices. Fast delivery, easy returns, and exceptional quality.</p>
                <p className="flex gap-4 flex-wrap">
                    <Link to="/shop" className="gap-x-2 flex-nowrap hover:opacity-85 bg-white text-violet-900 px-8 py-3 rounded-[10px] font-bold text-md tracking-wide">
                        Shop Now <TbShoppingCartSearch className="inline" />
                    </Link> 
                    <a href="#" className="border border-white/30 text-white px-8 py-3 rounded-[10px] font-bold tracking-wide hover:bg-white/10 w-fit">View Categories <TbCategory2 className="inline"/></a>
                </p>
            </div>
        </section>
    )
}