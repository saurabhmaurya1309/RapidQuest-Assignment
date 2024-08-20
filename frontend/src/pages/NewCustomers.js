import React, { useState, useEffect } from 'react';
import { getNewCustomersOverTime } from '../services/api';
import Chart from '../components/Chart';
import Spinner from '../components/Spinner';

const NewCustomers = () => {
  const [newCustomersData, setNewCustomersData] = useState({});
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNewCustomersOverTime();
        const data = {
          labels: response.data.map(item => `${item._id.year}-${item._id.month || '01'}`),
          datasets: [
            {
              label: 'New Customers',
              data: response.data.map(item => item.count),
              fill: false,
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              tension: 0.1,
            }
          ]
        };
        setNewCustomersData(data);

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
                color: 'rgba(0, 0, 0, 0.1)',
              }
            },
            y: {
              title: {
                display: true,
                text: 'New Customers',
                color: '#333',
                font: {
                  size: 14,
                }
              },
              ticks: {
                color: '#333',
                font: {
                  size: 12,
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                }
              },
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
            },
            legend: {
              labels: {
                color: '#333',
              }
            }
          }
        };
        setOptions(chartOptions);
      } catch (error) {
        console.error("Error fetching new customers data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">New Customers Over Time</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center h-64">
            <Spinner/>
            </div>
          ) : (
            <Chart type="line" data={newCustomersData} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCustomers;
