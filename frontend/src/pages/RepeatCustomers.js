import React, { useState, useEffect } from 'react';
import { getRepeatCustomers } from '../services/api';
import Chart from '../components/Chart';
import Spinner from '../components/Spinner';

const RepeatCustomers = () => {
  const [repeatCustomersData, setRepeatCustomersData] = useState({});
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRepeatCustomers();
        const data = {
          labels: response.data.map(item => `${item._id.year}-${item._id.month || '01'}`),
          datasets: [
            {
              label: 'Repeat Customers',
              data: response.data.map(item => item.customerCount),
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(153, 102, 255, 0.3)',
              hoverBorderColor: 'rgba(153, 102, 255, 1)',
            }
          ]
        };
        setRepeatCustomersData(data);

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
                text: 'Number of Repeat Customers',
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
                color: 'rgba(0, 0, 0, 0.1)'
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
                color: '#333'
              }
            }
          }
        };
        setOptions(chartOptions);
      } catch (error) {
        console.error("Error fetching repeat customers data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Number of Repeat Customers</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Spinner/>
            </div>
          ) : (
            <Chart type="bar" data={repeatCustomersData} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RepeatCustomers;
