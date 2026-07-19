import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BackgroundCircle from "../UI/BackgroundCircle";

const Layout = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <main className="relative min-h-screen bg-bg-main text-text-primary overflow-hidden">
      
      <BackgroundCircle 
        size={580} 
        color="var(--Background-Circle-color-1)" 
        opacity="var(--Background-Circle-opacity-1)" 
        blur={110} 
        top="-12%" 
        left="-6%" 
        zIndex={1}
        className="fixed animate-corner-green" 
      />

      <BackgroundCircle 
        size={580} 
        color="var(--Background-Circle-color-2)" 
        opacity="var(--Background-Circle-opacity-2)" 
        blur={110} 
        bottom="-12%" 
        right="-6%" 
        zIndex={1}
        className="fixed animate-corner-red" 
      />

      <BackgroundCircle 
        size={480} 
        color="var(--Background-Circle-color-3)" 
        opacity="var(--Background-Circle-opacity-3)" 
        blur={120} 
        bottom="-8%" 
        left="-2%" 
        zIndex={1}
        className="fixed animate-triple-blue" 
      />

      {/* Sidebar */}
      <div className="relative z-20">
        <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 ml-0 lg:ml-54 xl:ml-72 min-h-screen flex flex-col">
        <Header handleDrawerToggle={handleDrawerToggle} />

        <section className="relative z-10 flex-1 p-4 md:p-6 pt-[80px] md:pt-[88px]">
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default React.memo(Layout);












// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import BackgroundCircle from "../UI/BackgroundCircle";

// const Layout = () => {
//   const [open, setOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setOpen((prev) => !prev);
//   };

//   return (
//     <main className="relative min-h-screen bg-bg-main text-text-primary overflow-hidden">
      
//       {/* 🟢 الأخضر الليموني (مستقر ومنعزل في مكانه فوق شمال) */}
//       <BackgroundCircle 
//         size={580} 
//         color="#84cc16" 
//         opacity={0.16} 
//         blur={110} 
//         top="-12%" 
//         left="-6%" 
//         zIndex={1}
//         className="fixed animate-corner-green" 
//       />

//       {/* 🔴 الأحمر النيون (مستقر ومنعزل تحت يمين) */}
//       <BackgroundCircle 
//         size={580} 
//         color="#f43f5e" 
//         opacity={0.15} 
//         blur={110} 
//         bottom="-12%" 
//         right="-6%" 
//         zIndex={1}
//         className="fixed animate-corner-red" 
//       />

//       {/* 🔵 الأزرق السماوي (يتحرك في ممر آمن بعيداً عن الأخضر) */}
//       {/* بيبدأ من تحت شمال، ويتحرك أفقياً لليمين ثم يصعد لليمين فوق، متجنباً الـ Left Top تماماً */}
//       <BackgroundCircle 
//         size={480} 
//         color="#0ea5e9" 
//         opacity={0.14} 
//         blur={120} 
//         bottom="-8%" 
//         left="-2%" 
//         zIndex={1}
//         className="fixed animate-triple-blue" 
//       />

//       {/* Sidebar */}
//       <div className="relative z-20">
//         <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 ml-0 lg:ml-54 xl:ml-72 min-h-screen flex flex-col">
//         <Header handleDrawerToggle={handleDrawerToggle} />

//         <section className="relative z-10 flex-1 p-4 md:p-6">
//           <Outlet />
//         </section>
//       </div>
//     </main>
//   );
// };

// export default React.memo(Layout);