import React, { useEffect, useRef } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const Chart = ({ type, data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current?.chartInstance;
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  switch (type) {
    case 'line':
      return <Line ref={chartRef} data={data} options={options} />;
    case 'bar':
      return <Bar ref={chartRef} data={data} options={options} />;
    case 'pie':
      return <Pie ref={chartRef} data={data} options={options} />;
    default:
      return null;
  }
};

export default Chart;
