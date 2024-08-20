import React, { useState, useEffect } from 'react';
import { getGeographicalDistribution } from '../services/api';
import Chart from '../components/Chart';
import Spinner from '../components/Spinner';

const GeographicalDistribution = () => {
  const [geoData, setGeoData] = useState(null);
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getGeographicalDistribution();
        const data = {
          labels: response.data.map(item => item._id), 
          datasets: [
            {
              label: 'Customers by City',
              data: response.data.map(item => item.count),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            }
          ]
        };
        setGeoData(data);

        const chartOptions = {
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#333',
                font: {
                  size: 14,
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
              },
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
            }
          }
        };
        setOptions(chartOptions);
      } catch (error) {
        console.error('Error fetching geographical distribution data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Geographical Distribution of Customers</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              {/* <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 4V1L6 7l6 6V8c2.21 0 4 1.79 4 4h3c0-4.42-3.58-8-8-8zm-4 8H1c0 4.42 3.58 8 8 8v-3c-2.21 0-4-1.79-4-4zm12 4v3c4.42 0 8-3.58 8-8h-3c0 2.21-1.79 4-4 4zM12 20v3l6-6-6-6v5c-2.21 0-4 1.79-4 4h-3c0 4.42 3.58 8 8 8z" fill="currentColor"/>
              </svg> */}
              <Spinner/>
            </div>
          ) : geoData && geoData.labels.length > 0 ? (
            <Chart type="pie" data={geoData} options={options} />
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeographicalDistribution;
