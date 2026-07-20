// import { GiMoebiusStar } from "react-icons/gi"
// import { TbCategory2 } from "react-icons/tb";
// import { TbShoppingCartSearch } from "react-icons/tb";
// import { Link } from "react-router-dom"
// export default function Hero() {
//     return (
//         <section className="w-full bg-linear-to-br from-blue-900 via-blue-800 to-blue-700 flex p-4 lg:p-32 items-center h-[75vh] ">
//             <div className="w-[80vw] lg:w-[30vw] flex flex-col flex-nowrap gap-y-4 lg:gap-y-6">
//                 <p className="flex items-center text-sm gap-1 flex-nowrap text-gray-300 -mb-1"><GiMoebiusStar className="text-2xl" /><span>Premium Shopping Experience</span></p>
//                 <h1 className="text-6xl font-bold text-white">Shop the future, delivered today</h1>
//                 <p className="text-lg text-gray-300">Discover premium products at unbeatable prices. Fast delivery, easy returns, and exceptional quality.</p>
//                 <p className="flex gap-4 flex-wrap">
//                     <Link to="/shop" className="gap-x-2 flex-nowrap hover:opacity-85 bg-white text-violet-900 px-8 py-3 rounded-[10px] font-bold text-md tracking-wide">
//                         Shop Now <TbShoppingCartSearch className="inline" />
//                     </Link> 
//                     <a href="#" className="border border-white/30 text-white px-8 py-3 rounded-[10px] font-bold tracking-wide hover:bg-white/10 w-fit">View Categories <TbCategory2 className="inline"/></a>
//                 </p>
//             </div>
//         </section>
//     )
// }



import { GiMoebiusStar } from "react-icons/gi"
import { TbCategory2 } from "react-icons/tb";
import { TbShoppingCartSearch } from "react-icons/tb";
import { Link } from "react-router-dom"

export default function Hero() {
    return (
        <section className="w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden flex items-center min-h-[75vh] px-6 py-20 lg:px-32">
            {/* subtle background accents */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-white/5 blur-3xl" />

            <div className="relative w-full lg:w-[36rem] flex flex-col gap-y-5">
                <p className="inline-flex items-center gap-2 w-fit text-sm font-medium text-blue-100/90 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                    <GiMoebiusStar className="text-lg text-blue-300" />
                    <span>Premium Shopping Experience</span>
                </p>

                <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight">
                    Shop the future,
                    <span className="block text-blue-300">delivered today</span>
                </h1>

                <p className="text-lg text-blue-100/80 leading-relaxed  ">
                    Discover premium products at unbeatable prices. Fast delivery, easy returns, and exceptional quality.
                </p>

                <div className="flex gap-4 flex-wrap pt-2">
                    <Link
                        to="/shop"
                        className="group inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-3.5 rounded-xl font-bold tracking-wide shadow-lg shadow-black/10 transition-all hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5"
                    >
                        Shop Now
                        <TbShoppingCartSearch className="text-xl transition-transform group-hover:translate-x-0.5" />
                    </Link>

                    <a
                        href="#"
                        className="group inline-flex items-center gap-2 border border-white/25 text-white px-8 py-3.5 rounded-xl font-bold tracking-wide backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40"
                    >
                        View Categories
                        <TbCategory2 className="text-xl transition-transform group-hover:rotate-12" />
                    </a>
                </div>
            </div>
        </section>
    )
}