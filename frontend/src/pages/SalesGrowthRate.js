import React, { useState, useEffect } from 'react';
import { getSalesGrowthRateOverTime } from '../services/api';
import Chart from '../components/Chart';
import Spinner from '../components/Spinner';

const SalesGrowthRate = () => {
  const [growthData, setGrowthData] = useState(null);
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSalesGrowthRateOverTime();
        const data = {
          labels: response.data.map(item => `${item._id.year}-${item._id.month || '01'}`),
          datasets: [
            {
              label: 'Sales Growth Rate (%)',
              data: response.data.map(item => item.growthRate * 100), // Convert to percentage
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1, // Smoothing of the line
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
            }
          ]
        };
        setGrowthData(data);

        const chartOptions = {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time',
                color: '#333',
                font: {
                  size: 14,
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Growth Rate (%)',
                color: '#333',
                font: {
                  size: 14,
                }
              },
              ticks: {
                callback: function(value) {
                  return `${value}%`;
                },
                color: '#333',
                font: {
                  size: 12,
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)}%`;
                }
              },
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
            },
            legend: {
              labels: {
                color: '#333'
              }
            }
          }
        };
        setOptions(chartOptions);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching sales growth rate data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Sales Growth Rate Over Time</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Spinner/>
            </div>
          ) : (
            <Chart type="line" data={growthData} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesGrowthRate;
