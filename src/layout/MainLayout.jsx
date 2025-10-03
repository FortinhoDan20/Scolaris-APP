import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Banner from '../partials/Banner';

const MainLayout = () => {
  // Sidebar ouvert par défaut sur desktop
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // Ajustement automatique quand on redimensionne
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestion de la classe 'dark' sur body
  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      root.classList.contains('dark')
        ? document.body.classList.add('dark')
        : document.body.classList.remove('dark');
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenu principal */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden transition-all duration-300">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto transition-all duration-300">
            <Outlet />
          </div>
        </main>

        {/* Banner ou footer */}
        <Banner />
      </div>
    </div>
  );
};

export default MainLayout;
