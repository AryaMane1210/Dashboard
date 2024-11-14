'use client';
import useSWR from 'swr';
import { useState } from 'react';
// API
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function ViewPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const API_ENDPOINT = '/api/admin/dashboard';
  const { data, error } = useSWR(API_ENDPOINT, fetcher);
  const loading = !data && !error;

  const metrics = data
    ? {
        daily: {
          totalPostShares: data.dashboard.contentMetrics.daily.totalPostShares || 0,
        },
        monthly: {
          totalPostShares: data.dashboard.contentMetrics.monthly.totalPostShares || 0,
        },
        allTime: {
          totalPostShares: data.dashboard.contentMetrics.allTime.totalPostShares || 0,
        },
      }
    : {
        daily: { totalPostShares: 0 },
        monthly: { totalPostShares: 0 },
        allTime: { totalPostShares: 0 },
      };

  return (
   
    <div className="min-h-screen flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-screen-lg space-y-10 mt-4">
      {/* // top box */}
        <div className="w-full text-center mb-8 py-6 p-9 px-6 bg-gray-100 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-purple-500">Share Details</h1>
          <p className="text-lg text-gray-600 mt-4">
          Check out the number of times your post has been shared and their metrics. Select a time period (Daily, Monthly, All-Time) to explore the data.
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-6 md:space-y-6 ">
          {/* Buttons */}
          <div className="w-full  flex flex-row gap-4 justify-center">
            <button
              className={`px-4 py-3 rounded ${selectedPeriod === 'daily' ? 'bg-purple-500 text-white' : 'bg-gray-400'}`}
              onClick={() => setSelectedPeriod('daily')}
            >
              Daily
            </button>
            <button
              className={`px-4 py-3 rounded ${selectedPeriod === 'monthly' ? 'bg-purple-500 text-white' : 'bg-gray-400'}`}
              onClick={() => setSelectedPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-3 rounded ${selectedPeriod === 'allTime' ? 'bg-purple-500 text-white' : 'bg-gray-400'}`}
              onClick={() => setSelectedPeriod('allTime')}
            >
              All Time
            </button>
          </div>

          <div className="w-full md:w-auto bg-white shadow-md p-6 rounded flex flex-col justify-center">
            {loading ? (
              <p className="text-center text-xl text-gray-600">Loading...</p>
            ) : error ? (
              <p className="text-center text-xl text-red-500">Failed to load data</p>
            ) : (
              <>
              {/* End box */}
                <h2 className="text-lg font-semibold text-purple-400">Total Shares</h2>
                <p className="text-3xl font-bold text-yellow-400">
                  {metrics[selectedPeriod].totalPostShares || 0}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
