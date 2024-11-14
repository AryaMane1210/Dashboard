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
            totalPostExitCount: data.dashboard.contentMetrics.daily.totalPostExitCount || 0,
            totalPostBlocked: data.dashboard.contentMetrics.daily.totalPostBlocked || 0,
            totalPostDeleted: data.dashboard.contentMetrics.daily.totalPostDeleted || 0,
            
        },
        monthly: {
            totalPostExitCount: data.dashboard.contentMetrics.monthly.totalPostExitCount || 0,
            totalPostBlocked: data.dashboard.contentMetrics.monthly. totalPostBlocked || 0,
            totalPostDeleted: data.dashboard.contentMetrics.monthly. totalPostDeleted || 0,
            
        },
        allTime: {
            totalPostExitCount: data.dashboard.contentMetrics.allTime.totalPostExitCount || 0,
            totalPostBlocked: data.dashboard.contentMetrics.monthly. totalPostBlocked || 0,
            totalPostDeleted: data.dashboard.contentMetrics.monthly.totalPostDeleted || 0,
            
        },
      }
    : {
        daily: { totalPostExitCount: 0, totalPostBlocked:0,totalPostDeleted:0},
        monthly: { totalPostExitCount: 0,totalPostBlocked:0, totalPostDeleted:0},
        allTime: { totalPostExitCount: 0, totalPostBlocked:0, totalPostDeleted:0 },
      };

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-screen-lg space-y-10 mt-4">
      {/* // top box */}
        <div className="w-full text-center mb-8 py-6 p-9 px-6 bg-gray-100 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-purple-500">Exit Details</h1>
          <p className="text-lg text-gray-600 mt-4">
            Check out the exit count of your profile and their metrics. See how many oy your posts were blocked and deleted. Select a time period (Daily, Monthly, All-Time) to explore the data.
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

          <div className="w-full md:w-auto shadow-md p-6 rounded flex flex-col justify-center space-y-8">
            {loading ? (
              <p className="text-center text-xl text-gray-600">Loading...</p>
            ) : error ? (
              <p className="text-center text-xl text-red-500">Failed to load data</p>
            ) : (
              <>
              {/* single end boxes,blocked deleted and exit point */}
              <div className="space-y-2 w-full md:w-auto shadow-md p-6 rounded flex flex-col justify-center bg-white">
                <h2 className="text-lg font-semibold text-purple-400">Total Exits</h2>
                <p className="text-3xl font-bold text-yellow-400">
                  {metrics[selectedPeriod].totalPostExitCount || 0}
                </p>
                 </div>
                 <div className="space-y-2 w-full md:w-auto shadow-md p-6 rounded flex flex-col justify-center bg-white ">
             
                <h2 className="text-lg font-semibold text-purple-400 ">Total Blocked Posts</h2>
                <p className="text-3xl font-bold text-yellow-400">
                  {metrics[selectedPeriod].totalPostBlocked || 0}
                </p>
                 </div>
               <div className=" space-y-2  w-full md:w-auto shadow-md p-4 rounded flex flex-col justify-center bg-white">
               
                <h2 className="text-lg font-semibold text-purple-400">Total Deleted Posts</h2>
                <p className="text-3xl font-bold text-yellow-400">
                  {metrics[selectedPeriod].totalPostDeleted || 0}
                </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
