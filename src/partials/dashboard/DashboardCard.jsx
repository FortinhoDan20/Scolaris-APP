import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import CountUp from 'react-countup';
import EditMenu from '../../components/DropdownEditMenu';

const dashboardCardsData = [
  { id: 1, title: "NOMBRE D'ÉCOLES", value: 24780, growth: 49 },
  { id: 2, title: "EFFECTIF GLOBAL ÉLÈVES", value: 17489, growth: -14 },
  { id: 3, title: "INSCRIPTION EN COURS", value: 9962, growth: 49 },
];


const DashboardCard = () => {
    const [visibleCards, setVisibleCards] = useState([]);
  const [showBadges, setShowBadges] = useState([]);

  useEffect(() => {
    dashboardCardsData.forEach((card, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, card.id]);
        setTimeout(() => {
          setShowBadges(prev => [...prev, card.id]);
        }, 500); // délai pour l’animation du badge
      }, index * 300);
    });
  }, []);

  const getBadgeColor = (growth) => {
    if (growth > 0) return 'text-green-700 bg-green-500/20';
    if (growth === 0) return 'text-gray-600 bg-gray-300/20';
    return 'text-red-700 bg-red-500/20';
  };
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {dashboardCardsData.map(card => {
        const isVisible = visibleCards.includes(card.id);
        const showBadge = showBadges.includes(card.id);
        const isPositive = card.growth >= 0;

        return (
          <div
            key={card.id}
            className={`flex flex-col bg-white dark:bg-gray-800 shadow rounded-xl p-4 sm:p-5 
                        transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 scale-105 animate-bounce-slow' : 'opacity-0 translate-y-6 scale-95'}`}
          >
            {/* Header */}
            <header className="flex justify-between items-start mb-2">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                {card.title}
              </h2>
              <EditMenu align="right" className="relative inline-flex">
                <li>
                  <a className="font-medium text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-2 sm:px-3" href="#0">Option 1</a>
                </li>
                <li>
                  <a className="font-medium text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-2 sm:px-3" href="#0">Option 2</a>
                </li>
                <li>
                  <a className="font-medium text-xs sm:text-sm text-red-500 hover:text-red-600 flex py-1 px-2 sm:px-3" href="#0">Remove</a>
                </li>
              </EditMenu>
            </header>

            {/* Stats */}
            <div className="text-xs sm:text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Statistiques</div>
            <div className="flex items-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mr-3">
                <CountUp start={0} end={card.value} duration={2.5} separator="," />
              </div>
              {showBadge && (
                <div className={`flex items-center text-xs sm:text-sm font-medium px-2 py-1 rounded-full transition-all duration-700 ${getBadgeColor(card.growth)} transform
                  ${isPositive ? 'translate-y-0 animate-badge-up' : 'translate-y-0 animate-badge-down'}`}>
                  {isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                  {isPositive ? `+${card.growth}%` : `${card.growth}%`}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <span className="mr-1">🕒</span> Données mises à jour récemment
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardCard