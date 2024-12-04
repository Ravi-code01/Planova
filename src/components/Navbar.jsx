import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navOverlayStyles, setNavOverlayStyles] = useState({});
  const [expandedMenuItem, setExpandedMenuItem] = useState(null);

  const navLinkClass = ({ isActive }) =>
    `block py-2 pr-4 pl-3 duration-100 ${
      isActive ? "text-yellow-500" : "text-gray-300"
    } hover:text-gray-200 lg:p-0`;

  const menuItems = [
    {
      to: "/learn",
      label: "Learn",
      content: [
        "Operating Systems",
        "Database Management Systems",
        "Data Structures",
        "Object Oriented Programming",
        "Software Lifecycles",
      ],
    },
    { to: "/practice", label: "Practice" },
    { to: "/problems", label: "Problems" },
    { to: "/ide", label: "Compiler" },
    { to: "/events", label: "Events" },
    { to: "/alumni", label: "Alumni" },
    { to: "/openings", label: "Openings" },
  ];

  const toggleNav = () => {
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

  const handleMenuItemClick = (to, hasContent) => {
    if (hasContent) {
      if (expandedMenuItem === to) {
        window.location.href = to;
      } else {
        setExpandedMenuItem(to);
      }
    } else {
      window.location.href = to;
    }
  };

  const isActivePage = (path) => window.location.pathname === path;

  useEffect(() => {
    resizeNav();
    window.addEventListener("resize", resizeNav);
    return () => window.removeEventListener("resize", resizeNav);
  }, []);

  return (
    <header
      style={{ zIndex: 10010 }}
      className="Geist fixed top-0 w-full h-16 bg-[#0a0a0a] border-b border-[#1e1e1e] flex justify-center"
    >
      <nav className="w-full xl:w-[1280px] 2xl:w-[1440px] flex flex-col items-center h-full">
        <div className="flex justify-between items-center w-full h-full">
          <div className="h-6 hidden lg:block ml-3">
            <Link to="/">
              <img src={logo} className="h-6" alt="Coderoom" />
            </Link>
          </div>
          <button
            style={{ zIndex: 1010 }}
            onClick={toggleNav}
            className="lg:hidden relative w-8 h-8 ml-3 flex flex-col items-center justify-center"
          >
            {isOpen ? (
              <IoClose
                style={{ zIndex: 1010 }}
                className="text-white w-7 h-7"
              />
            ) : (
              <HiMenuAlt2
                style={{ zIndex: 1010 }}
                className="text-white w-7 h-7"
              />
            )}
          </button>
          <ul className="hidden lg:flex lg:space-x-8 p-6">
            {menuItems.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={navLinkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="h-6 lg:hidden">
            <Link to="/">
              <img src={logo} className="h-6 lg:hidden" alt="Coderoom" />
            </Link>
          </div>
          <div className="w-8 h-8 mr-3 lg:hidden"></div>
        </div>
        <div
          className={`fixed inset-0 bg-gradient-to-b m-3 from-black to-[#212121] transition-transform transform ${
            isOpen ? "scale-100 p-6 m-4" : "scale-0"
          }`}
          style={{
            borderRadius: "50%",
            zIndex: isOpen ? 1000 : -1,
            transitionDuration: "0.5s",
            ...navOverlayStyles,
          }}
        ></div>

        <ul
          style={{ zIndex: 1001 }}
          className={`fixed inset-0 flex flex-col items-start p-8 py-20 justify-start space-y-4 text-gray-100 text-2xl transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {menuItems.map(({ to, label, content }) => (
            <li key={to} className="w-full">
              <button
                onClick={() => handleMenuItemClick(to, !!content)}
                className="flex justify-between items-center w-full hover:text-gray-300 Geist"
              >
                <span
                  className={`${isActivePage(to) ? "text-yellow-500" : "text-gray-500"}`}
                >
                  {label}
                </span>
                {content && (
                  <span className="text-gray-500">
                    {expandedMenuItem === to ? "-" : "+"}
                  </span>
                )}
              </button>
              {expandedMenuItem === to && content && (
                <ul className="space-y-1 mt-2 text-base">
                  {content.map((item, index) => (
                    <li key={index} className="text-gray-500">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
