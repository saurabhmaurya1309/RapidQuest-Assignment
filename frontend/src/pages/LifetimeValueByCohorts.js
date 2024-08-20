import React, { useState, useEffect } from 'react';
import { getCustomerLifetimeValueByCohorts } from '../services/api';
import Chart from '../components/Chart';
import Spinner from '../components/Spinner';

const CustomerLifetimeValueByCohorts = () => {
  const [lifetimeValueData, setLifetimeValueData] = useState({});
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCustomerLifetimeValueByCohorts();
        const data = {
          labels: response.data.map(item => item._id),
          datasets: [
            {
              label: 'Cohort Lifetime Value',
              data: response.data.map(item => item.cohortLifetimeValue),
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1,
            }
          ]
        };
        setLifetimeValueData(data);

        const chartOptions = {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Cohort Period',
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
                text: 'Lifetime Value',
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
                  return `${tooltipItem.dataset.label}: $${tooltipItem.raw.toFixed(2)}`;
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
        console.error('Error fetching customer lifetime value data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Customer Lifetime Value by Cohorts</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center h-64">
             <Spinner/>
            </div>
          ) : (
            <Chart type="line" data={lifetimeValueData} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerLifetimeValueByCohorts;
