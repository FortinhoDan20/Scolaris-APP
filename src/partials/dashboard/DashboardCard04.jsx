import React, { useRef, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getCssVariable = (variable) =>
  getComputedStyle(document.documentElement).getPropertyValue(variable) || variable;

function DashboardCard04() {
  const containerRef = useRef(null);
  const [height, setHeight] = useState(300); // Hauteur par défaut

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // Ratio hauteur/largeur = 0.4 par exemple
        setHeight(width * 0.4);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const chartData = {
    labels: [
      '12-01-2022', '01-01-2023', '02-01-2023',
      '03-01-2023', '04-01-2023', '05-01-2023',
    ],
    datasets: [
      {
        label: 'Direct',
        data: [800, 1600, 900, 1300, 1950, 1700],
        backgroundColor: getCssVariable('--color-sky-500'),
        hoverBackgroundColor: getCssVariable('--color-sky-600'),
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.7,
      },
      {
        label: 'Indirect',
        data: [4900, 2600, 5350, 4800, 5200, 4800],
        backgroundColor: getCssVariable('--color-violet-500'),
        hoverBackgroundColor: getCssVariable('--color-violet-600'),
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 14 } } },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { drawBorder: false }, beginAtZero: true },
    },
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl p-5"
    >
      <header className="pb-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Direct VS Indirect</h2>
      </header>
      <div className="mt-4 w-full" style={{ height }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default DashboardCard04;
