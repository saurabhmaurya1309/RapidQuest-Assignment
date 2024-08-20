import React, { useState, useEffect } from 'react';
import { getTotalSalesOverTime } from '../services/api';
import Chart from '../components/Chart';
import Spinner from '../components/Spinner';

const SalesOverTime = () => {
  const [salesData, setSalesData] = useState(null);
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTotalSalesOverTime();
        const data = {
          labels: response.data.map(item => `${item._id.year}-${item._id.month || '01'}`),
          datasets: [
            {
              label: 'Total Sales',
              data: response.data.map(item => item.totalSales),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
              borderWidth: 2,
            }
          ]
        };
        setSalesData(data);

        const chartOptions = {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time',
                color: '#333',
                font: {
                  size: 14,
                  weight: 'bold',
                },
              },
              grid: {
                color: '#e0e0e0',
              },
              ticks: {
                color: '#555',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Total Sales',
                color: '#333',
                font: {
                  size: 14,
                  weight: 'bold',
                },
              },
              grid: {
                color: '#e0e0e0',
              },
              ticks: {
                color: '#555', 
                callback: value => `$${value}`, 
              },
            }
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#333', 
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: tooltipItem => `$${tooltipItem.raw}`,
              },
            }
          }
        };
        setOptions(chartOptions);
      } catch (error) {
        setError('Failed to fetch sales data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Total Sales Over Time</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Spinner/>
        </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          salesData && options && (
            <Chart type="line" data={salesData} options={options} />
          )
        )}
      </div>
    </div>
  );
};

export default SalesOverTime;
