import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import { LuHome } from "react-icons/lu";
import { TbClipboardList } from "react-icons/tb";
import { LuCalendarDays } from "react-icons/lu";
import { LuBarChartBig } from "react-icons/lu";
import { id } from "date-fns/locale";
import { FaCircle } from "react-icons/fa";
import { RiSettings2Line } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navOverlayStyles, setNavOverlayStyles] = useState({});
  const [expandedMenuItem, setExpandedMenuItem] = useState(null);

  const menuItems = [
    { id: 1, label: "Home", icon: <LuHome size={16} /> },
    { id: 2, label: "My Tasks", icon: <TbClipboardList size={16} /> },
    { id: 3, label: "Calendar", icon: <LuCalendarDays size={16} /> },
    { id: 4, label: "Analytics", icon: <LuBarChartBig size={16} /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const resizeNav = () => {
    const radius = Math.sqrt(window.innerHeight ** 2 + window.innerWidth ** 2);
    const diameter = radius * 2;
    setNavOverlayStyles({
      width: diameter,
      height: diameter,
      marginTop: -radius,
      marginLeft: -radius,
    });
  };

  useEffect(() => {
    resizeNav();
    window.addEventListener("resize", resizeNav);
    return () => window.removeEventListener("resize", resizeNav);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 text-[#2a2a2a] border-2 border-[#e6e4e4] bg-gray-50 rounded-full p-2 xl:hidden"
      >
        {isOpen ? <IoClose size={24} /> : <HiMenuAlt2 size={24} />}
      </button>
      <aside
        className={`fixed flex flex-col justify-between top-0 left-0 h-full bg-white border-2 border-[#EDEDEE] text-[#2e2e2e] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 w-[240px] transition-transform duration-300 z-40`}
      >
        <div>
          <div className="p-3">
            <div className="h-14 w-full py-2 rounded-[8px] border-2 border-[#EDEDEE] flex items-center">
              <div className="h-8 w-8 rounded-full ml-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-purple-500"></div>
              <div className="h-full flex flex-col items-start">
                <div className="text-gray-700 text-sm ml-3 font-medium">
                  Raviraj Wandhekar
                </div>
                <div className="text-gray-500 text-[10px] ml-3 flex items-center">
                  <FaCircle className="text-[6px] text-green-500 mr-1" />
                  Online
                </div>
              </div>
            </div>
          </div>
          <nav className="">
            <ul className="p-3 pt-1">
              {menuItems.map(({ id, label, icon }) => (
                <div key={id}>
                  <button
                    className={`w-full text-left flex items-center px-4 py-2 border border-purple-100 mb-2 rounded-md ${
                      label === "Home" ? "bg-purple-50" : "hover:bg-purple-50"
                    }`}
                  >
                    <span
                      className={`mr-2 ${
                        label === "Home" ? "text-purple-600" : "text-gray-700"
                      }`}
                    >
                      {icon}
                    </span>
                    <span
                      className={`text-sm mt-1 ${
                        label === "Home" ? "text-purple-600" : "text-gray-700"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                </div>
              ))}
            </ul>
          </nav>
        </div>
        <div className="p-3">
          <div className="h-40 w-full rounded-lg bg-gradient-45 flex flex-col items-start justify-center text-white text-base font-medium p-3">
            Organization is the key to efficiency; when everything has its
            place, productivity follows.
            <button className="mt-1 py-1 px-2 bg-white text-cyan-500 rounded-md text-xs border flex border-gray-100">
              Try now&nbsp;
              <span className="h-full flex items-center justify-center">
                <FaArrowRight />
              </span>
            </button>
          </div>
          <ul className="pt-1 mt-4">
            <button
              className={`w-full text-left flex items-center px-4 py-2 border border-purple-100 mb-2 rounded-md hover:bg-purple-50"}`}
            >
              <span className={`mr-2 text-gray-700`}>
                <RiSettings2Line />
              </span>
              <span className={`text-sm mt-1 text-gray-700 `}>Settings</span>
            </button>
          </ul>
        </div>
      </aside>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
