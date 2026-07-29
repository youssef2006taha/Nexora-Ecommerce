import React, { useState } from "react";
import { HiOutlineUsers, HiChevronRight } from "react-icons/hi2";

import Youssef_Taha from "../../../assets/TeamImages/Youssef_Taha.png";
import Hazem_Mahmoud from "../../../assets/TeamImages/Hazem_Mahmoud.png";
import Sara_Mahmoud from "../../../assets/TeamImages/Sara_Mahmoud.png";
import Mohamed_Maged from "../../../assets/TeamImages/Mohammed_Maged.png";
import Yehia_Mostafa from "../../../assets/TeamImages/Yehia_Mostafa.png";
import Ahmed_Abdellah from "../../../assets/TeamImages/Ahmed_Abdellah.png";
import Mahmoud_Ahmed from "../../../assets/TeamImages/Mahmoud_Ahmed.png";
import Mohamed_Ali from "../../../assets/TeamImages/Mohamed_Ali.png";
import Samar_Khaled from "../../../assets/TeamImages/Samar_Khaled.png";
import mem from "../../../assets/TeamImages/mem.png";

const teamMem = [
  {
    id: 1,
    image: Youssef_Taha,
    name: "Youssef Taha",
    linkedIn: "https://www.linkedin.com/in/youssef-taha-819982350/",
    gitHub: "https://github.com/youssef2006taha",
  },
  {
    id: 2,
    image: Hazem_Mahmoud,
    name: "Hazem Mahmoud",
    linkedIn: "https://www.linkedin.com/in/-hazemmahmoud/",
    gitHub: "https://github.com/Hazem-2002",
  },
  {
    id: 3,
    image: Sara_Mahmoud,
    name: "Sara Mahmoud",
    linkedIn: "https://www.linkedin.com/in/sara-mahmoud-493045290/",
    gitHub: "https://github.com/Sara962005",
  },
  {
    id: 4,
    image: Mohamed_Maged,
    name: "Mohamed Maged",
    linkedIn: "https://www.linkedin.com/in/mohamed-maged-mohamed-dev123/",
    gitHub: "https://github.com/Mohamed-jpg90",
  },
  {
    id: 5,
    image: Yehia_Mostafa,
    name: "Yehia Mostafa",
    linkedIn: "https://www.linkedin.com/in/yehia-mostafa-669a24384/",
    gitHub: "https://github.com/yahyamostafa1",
  },
  {
    id: 6,
    image: Ahmed_Abdellah,
    name: "Ahmed Abdellah",
    linkedIn: "https://www.linkedin.com/in/ahmed-abdellah-41867a349/",
    gitHub: "https://github.com/Ahmed-mo7",
  },
  {
    id: 7,
    image: Mahmoud_Ahmed,
    name: "Mahmoud Ahmed",
    linkedIn: "https://www.linkedin.com/in/mahmoud-ahmed-91np/",
    gitHub: "https://github.com/MahmoudNP91",
  },
  {
    id: 8,
    image: Mohamed_Ali,
    name: "Mohamed Ali",
    linkedIn: "https://www.linkedin.com/in/mohammed-ali-abdallah-a71337202",
    gitHub: "https://github.com/mohamed-ali-nemr",
  },
  {
    id: 9,
    image: Samar_Khaled,
    name: "Samar Khaled",
    linkedIn: "https://www.linkedin.com/in/samar-khaled-2a5a59364/",
    gitHub: "https://github.com/",
  },
  { id: 10, image: mem, name: "", linkedIn: "", gitHub: "https://github.com/" },
  { id: 11, image: mem, name: "", linkedIn: "", gitHub: "https://github.com/" },
  { id: 12, image: mem, name: "", linkedIn: "", gitHub: "https://github.com/" },
  { id: 13, image: mem, name: "", linkedIn: "", gitHub: "https://github.com/" },
  { id: 14, image: mem, name: "", linkedIn: "", gitHub: "https://github.com/" },
];

function TeamMem() {
  const [isOpen, setIsOpen] = useState(false);

  const renderCard = (member) => (
    <div
      key={member.id || member.name}
      className="relative w-full max-w-90 h-80 rounded-xl overflow-hidden shadow-xl bg-cover bg-center"
      style={{ backgroundImage: `url(${member.image})` }}
    >
      <div className="absolute inset-x-0 bottom-0 pt-4 pb-3 px-3 text-center bg-black/50 backdrop-blur-md rounded-b-xl">
        <p className="text-white font-bold text-sm mb-1">
          {member.name || "Team Member"}
        </p>
        <div className="flex justify-center gap-3 text-xs">
          {member.linkedIn && (
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="text-white/90 hover:text-white hover:underline font-medium"
            >
              LinkedIn
            </a>
          )}
          {member.gitHub && (
            <a
              href={member.gitHub}
              target="_blank"
              rel="noreferrer"
              className="text-white/90 hover:text-white hover:underline font-medium"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative z-20 inline-flex items-center gap-2 border px-6 py-3.5 rounded-xl font-bold tracking-wide backdrop-blur-md transition-all hover:bg-[var(--bg-hover)] cursor-pointer"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
        }}
      >
        <HiOutlineUsers
          className="text-xl transition-transform group-hover:scale-110"
          style={{ color: "var(--primary)" }}
        />
        <span>Meet Our Team</span>

        <HiChevronRight
          className={`text-lg transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[var(--primary)]" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`hidden lg:flex items-center gap-2 ml-3 transition-all duration-500 ease-out z-10 ${
          isOpen
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-12 pointer-events-none"
        }`}
      >
        {teamMem.map((mem) => (
          <div
            key={mem.id || mem.name}
            className="group relative w-2.5 h-2.5 rounded-full bg-secondary hover:bg-primary hover:scale-125 transition-all duration-200 cursor-pointer"
          >
            <div className="pointer-events-none group-hover:pointer-events-auto absolute bottom-full left-1/2 -translate-x-1/2 pb-2 w-65 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-50">
              {renderCard(mem)}
              <div className="w-0 h-0 mx-auto border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-black/30" />
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          
          <div className="container-noT relative w-full max-h-[70vh] flex flex-col rounded-2xl border bg-[var(--bg-main)] border-[var(--border)] shadow-2xl overflow-hidden">
            
            <div className="flex justify-between items-center px-5 py-4 border-b border-[var(--border)] bg-[var(--bg-main)] shrink-0 z-10">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Our Team
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto hide-scrollbar flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full justify-items-center">
                {teamMem.map((mem) => renderCard(mem))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default TeamMem;