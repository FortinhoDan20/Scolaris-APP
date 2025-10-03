import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Users, UserPlus, School, BarChart2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded") === "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded);

  const submenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  // Ferme le sidebar si clic en dehors
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen]);

  // Ferme sidebar avec ESC
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]);

  // Stocke l'état du sidebar et applique la classe body
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    document.body.classList.toggle("sidebar-expanded", sidebarExpanded);
  }, [sidebarExpanded]);

  // Composant SidebarItem
  const SidebarItem = ({ icon: Icon, label, children, activeCondition }) => (
    <SidebarLinkGroup activecondition={activeCondition}>
      {(handleClick, open) => (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClick();
              setSidebarExpanded(true);
            }}
            aria-expanded={open}
            className={`flex items-center w-full p-2 rounded-xl text-gray-800 dark:text-gray-100 hover:bg-gradient-to-r hover:from-purple-400 hover:to-violet-600 transition-all ${
              open ? "bg-gradient-to-r from-purple-400 to-violet-600 text-white" : ""
            }`}
          >
            <Icon className="w-5 h-5" />
            {sidebarExpanded && <span className="ml-4 flex-1 text-left">{label}</span>}
            <svg
              className={`w-3 h-3 fill-current transform transition-transform ${
                open ? "rotate-180" : ""
              } ${!sidebarExpanded ? "hidden" : ""}`}
              viewBox="0 0 12 12"
            >
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </button>

          {/* Tooltip si sidebar réduit */}
          {!sidebarExpanded && (
            <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-xs rounded-md shadow-md bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              {label}
            </div>
          )}

          {/* Sous-menus */}
          <AnimatePresence>
            {open && sidebarExpanded && children && (
              <motion.ul
                variants={submenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="pl-12 mt-1 space-y-1 bg-white/10 dark:bg-gray-800/20 rounded-md"
              >
                {React.Children.map(children, (child) => (
                  <li>{child}</li> // <-- valide HTML: NavLink enfant d'un <li> à l'intérieur du <ul>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      )}
    </SidebarLinkGroup>
  );

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Sidebar */}
      <div
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:translate-x-0 h-[100dvh] overflow-y-auto no-scrollbar
          w-64 lg:w-20 lg:sidebar-expanded:!w-64 shrink-0 bg-white/70 dark:bg-gray-900/70 p-4 transition-all duration-300 ease-in-out rounded-r-2xl shadow-xl ${
            sidebarOpen ? "translate-x-0" : "-translate-x-64"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>

          {/* Logo */}
          <NavLink end to="/" className="block">
            <svg className="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
              <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          <div>
            {sidebarExpanded && (
              <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">Pages</h3>
            )}
            <ul className="mt-3">
              {/* Dashboard */}
              <li className="relative group">
                <NavLink
                  to="/"
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-400 hover:to-violet-600 text-gray-800 dark:text-gray-100 transition-all ${
                      isActive ? "bg-gradient-to-r from-purple-400 to-violet-600 text-white" : ""
                    }`
                  }
                >
                  <Home className="w-5 h-5" />
                  {sidebarExpanded && <span className="ml-4">Dashboard</span>}
                </NavLink>
                {!sidebarExpanded && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-xs rounded-md shadow-md bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    Dashboard
                  </div>
                )}
              </li>

              {/* Utilisateur */}
              <SidebarItem icon={Users} label="Utilisateur" activeCondition={pathname.includes("owner")}>
                <NavLink
                  to="/list-users"
                  className="block p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Liste Utilisateur
                </NavLink>
                <NavLink
                  to="/new-owner"
                  className="block p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Ajouter Utilisateur
                </NavLink>
              </SidebarItem>

              {/* Promoteur */}
              <SidebarItem icon={UserPlus} label="Promoteur" activeCondition={pathname.includes("promoter")}>
                <NavLink
                  to="/list-promoter"
                  className="block p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Liste Promoteur
                </NavLink>
                <NavLink
                  to="/new-promoter"
                  className="block p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Ajouter Promoteur
                </NavLink>
              </SidebarItem>

              {/* École */}
              <SidebarItem icon={School} label="École" activeCondition={pathname.includes("school")}>
                <NavLink
                  to="/list-school"
                  className="block p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Liste écoles
                </NavLink>
              </SidebarItem>

              {/* Finance */}
              <SidebarItem icon={BarChart2} label="Finance" activeCondition={pathname.includes("finance")}>
                <NavLink
                  to="/finance-report"
                  className="block p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Rapport financier
                </NavLink>
                <NavLink
                  to="/finance-registration"
                  className="block p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Rapport d'inscription
                </NavLink>
                <NavLink
                  to="/finance-statistics"
                  className="block p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Rapport statistique
                </NavLink>
              </SidebarItem>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
