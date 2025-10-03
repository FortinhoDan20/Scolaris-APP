import React, { useRef, useEffect } from 'react';
import { useThemeProvider } from '../utils/ThemeContext';
import { chartColors } from './ChartjsConfig';
import {
  Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';
import { adjustColorOpacity, getCssVariable, formatValue } from '../utils/Utils';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);

function RealtimeChart({ data, width, height }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const chartValue = useRef(null);
  const chartDeviation = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === 'dark';

  const { textColor, gridColor, tooltipTitleColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors;

  // Création du chart une seule fois
  useEffect(() => {
    if (!canvasRef.current) return;

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: data,
      options: {
        layout: { padding: 20 },
        scales: {
          y: {
            border: { display: false },
            suggestedMin: 30,
            suggestedMax: 80,
            ticks: {
              maxTicksLimit: 5,
              callback: (value) => formatValue(value),
              color: darkMode ? textColor.dark : textColor.light,
            },
            grid: { color: darkMode ? gridColor.dark : gridColor.light },
          },
          x: {
            type: 'time',
            time: {
              parser: 'hh:mm:ss',
              unit: 'second',
              tooltipFormat: 'MMM DD, H:mm:ss a',
              displayFormats: { second: 'H:mm:ss' },
            },
            border: { display: false },
            grid: { display: false },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
              color: darkMode ? textColor.dark : textColor.light,
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            titleFont: { weight: 600 },
            callbacks: { label: (context) => formatValue(context.parsed.y) },
            titleColor: darkMode ? tooltipTitleColor.dark : tooltipTitleColor.light,
            bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
            backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
            borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,
          },
        },
        interaction: { intersect: false, mode: 'nearest' },
        animation: false,
        maintainAspectRatio: false,
      },
    });

    return () => chartRef.current?.destroy();
  }, []); // Une seule fois

  // Mise à jour des données
  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.data = data;
    chartRef.current.update('none');
  }, [data]);

  // Mise à jour dark/light mode
  useEffect(() => {
    if (!chartRef.current) return;

    const chart = chartRef.current;

    chart.options.scales.x.ticks.color = darkMode ? textColor.dark : textColor.light;
    chart.options.scales.y.ticks.color = darkMode ? textColor.dark : textColor.light;
    chart.options.scales.y.grid.color = darkMode ? gridColor.dark : gridColor.light;
    chart.options.plugins.tooltip.titleColor = darkMode ? tooltipTitleColor.dark : tooltipTitleColor.light;
    chart.options.plugins.tooltip.bodyColor = darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light;
    chart.options.plugins.tooltip.backgroundColor = darkMode ? tooltipBgColor.dark : tooltipBgColor.light;
    chart.options.plugins.tooltip.borderColor = darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light;

    chart.update('none');
  }, [currentTheme]);

  // Mise à jour des valeurs affichées
  useEffect(() => {
    const points = data.datasets?.[0]?.data;
    if (!points || points.length === 0) return;

    const currentValue = points[points.length - 1];
    const previousValue = points[points.length - 2] ?? currentValue;
    const diff = previousValue !== 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0;

    if (chartValue.current) chartValue.current.innerHTML = currentValue;
    if (chartDeviation.current) {
      chartDeviation.current.innerHTML = `${diff > 0 ? '+' : ''}${diff.toFixed(2)}%`;
      if (diff < 0) {
        chartDeviation.current.style.backgroundColor = adjustColorOpacity(getCssVariable('--color-red-500'), 0.2);
        chartDeviation.current.style.color = getCssVariable('--color-red-700');
      } else {
        chartDeviation.current.style.backgroundColor = adjustColorOpacity(getCssVariable('--color-green-500'), 0.2);
        chartDeviation.current.style.color = getCssVariable('--color-green-700');
      }
    }
  }, [data]);

  return (
    <>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2 tabular-nums">
            $<span ref={chartValue}>0</span>
          </div>
          <div ref={chartDeviation} className="text-sm font-medium px-1.5 rounded-full"></div>
        </div>
      </div>
      <div className="grow">
        <canvas ref={canvasRef} width={width} height={height}></canvas>
      </div>
    </>
  );
}

export default RealtimeChart;
