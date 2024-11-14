'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2'; 
import 'chart.js/auto';

// API
const fetcher = (url) => fetch(url).then((res) => res.json());
const DataVisualization = () => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('daily'); 
  const [selectedMetric, setSelectedMetric] = useState('contentMetrics'); 
  const apiUrl = '/api/admin/dashboard'; 
  const { data, error } = useSWR(apiUrl, fetcher);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  const metricData = data.dashboard[selectedMetric]?.[selectedTimePeriod];
  const chartData = metricData?.chartData || [];

  if (!chartData.length) {
    return <div>No data available for the selected period and metric</div>;
  }

// chart details
  const NewchartData = {
    labels: chartData.map(item => new Date(item.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: `${selectedMetric} - ${selectedTimePeriod}`,
        data: chartData.map(item => item.count),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  return (
    // Buttons select 2 at a time
    <div className="container mx-auto p-4">
      <div className="text-center p-6"> You can view data by selecting the metric and time period</div>
      <div className="flex justify-center space-x-4 mb-4">
        {['contentMetrics', 'engagementMetrics'].map(metric => (
          <button
            key={metric}
            onClick={() => setSelectedMetric(metric)}
            className={`px-4 py-2 rounded-lg text-white ${selectedMetric === metric ? 'bg-purple-500' : 'bg-gray-400'}`}
          >
            {metric === 'contentMetrics' ? 'Content' : 'Engagement'}
          </button>
        ))}
      </div>

      
      <div className="flex justify-center space-x-4 mb-4">
        {['daily', 'monthly'].map(period => (
          <button
            key={period}
            onClick={() => setSelectedTimePeriod(period)}
            className={`px-4 py-2 rounded-lg text-white ${selectedTimePeriod === period ? 'bg-purple-500' : 'bg-gray-400'}`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

    
      <div className="flex flex-wrap justify-between gap-4">

        {/* Line Chart*/}
        <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 h-full mb-4 sm:h-[400px]">
          <div className="chart-container h-full">
            <Line data={NewchartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 h-full mb-4 sm:h-[400px]">
          <div className="chart-container h-full">
            <Bar data={NewchartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Area Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 h-full mb-4 sm:h-[400px]">
          <div className="chart-container h-full">
            <Line
              data={{
                labels: chartData.map(item => new Date(item.timestamp).toLocaleDateString()),
                datasets: [
                  {
                    label: `${selectedMetric} - ${selectedTimePeriod}`,
                    data: chartData.map(item => item.count),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', 
                    borderWidth: 2,
                    fill: true, 
                  },
                ],
              }}
              options={{
                responsive: true,
                elements: { line: { tension: 0.4, 
                  },
                },
              }}
            />
          </div>
        </div>

       
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:w-1/3 sm:w-full h-64 sm:h-80 flex items-center justify-center ">
            <Pie data={NewchartData} options={{ responsive: true }} />
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:w-1/3 sm:w-full h-64 sm:h-80 flex items-center justify-center">
            <Doughnut data={NewchartData} options={{ responsive: true }} />
          </div>
        
      </div>
    </div>
  );
};

export default DataVisualization;









































