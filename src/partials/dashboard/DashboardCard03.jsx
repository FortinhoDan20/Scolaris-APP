import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowDown } from 'lucide-react';
import CountUp from 'react-countup';
import EditMenu from '../../components/DropdownEditMenu';

function DashboardCard03() {
  const currentEnrollments = 9962; // valeur dynamique possible
  const growth = 49;                // valeur dynamique possible

  const [showCard, setShowCard] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const isPositive = growth >= 0;

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 100);
    const arrowTimer = setTimeout(() => setShowArrow(true), 700);
    return () => {
      clearTimeout(timer);
      clearTimeout(arrowTimer);
    };
  }, []);

  const getBadgeColor = () => {
    if (growth > 0) return 'text-green-700 bg-green-500/20';
    if (growth === 0) return 'text-gray-600 bg-gray-300/20';
    return 'text-red-700 bg-red-500/20';
  };

  return (
    <div className={`flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow rounded-xl p-4 sm:p-5 transform transition-all duration-700 ${showCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

      {/* Header */}
      <header className="flex justify-between items-start mb-2">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
          INSCRIPTION EN COURS
        </h2>
        <EditMenu align="right" className="relative inline-flex">
          <li>
            <Link className="font-medium text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-2 sm:px-3" to="#0">
              Option 1
            </Link>
          </li>
          <li>
            <Link className="font-medium text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-2 sm:px-3" to="#0">
              Option 2
            </Link>
          </li>
          <li>
            <Link className="font-medium text-xs sm:text-sm text-red-500 hover:text-red-600 flex py-1 px-2 sm:px-3" to="#0">
              Remove
            </Link>
          </li>
        </EditMenu>
      </header>

      {/* Stats */}
      <div className="text-xs sm:text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Statistiques</div>
      <div className="flex items-center">
        <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mr-3">
          <CountUp start={0} end={currentEnrollments} duration={2.5} separator="," />
        </div>
        {showArrow && (
          <div className={`flex items-center text-xs sm:text-sm font-medium px-2 py-1 rounded-full transition-all duration-500 ${getBadgeColor()} transform`}>
            {isPositive ? <ArrowUp className="w-3 h-3 mr-1 animate-bounce" /> : <ArrowDown className="w-3 h-3 mr-1 animate-bounce" />}
            {isPositive ? `+${growth}%` : `${growth}%`}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center">
        <span className="mr-1">🕒</span> Données mises à jour récemment
      </div>
    </div>
  );
}

export default DashboardCard03;
