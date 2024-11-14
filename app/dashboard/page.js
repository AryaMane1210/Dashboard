
'use client';
import { useState } from 'react';
import useSWR from 'swr';
// API
const fetcher = (url) => fetch(url).then((res) => res.json());
const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('daily');
  const { data, error } = useSWR('/api/admin/dashboard', fetcher);

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;
  const userData = data
    ? {
        daily: {
          totalPosts: data.dashboard.contentMetrics.daily.totalPosts || 0,
          totalCategories:data.dashboard.contentMetrics.daily.totalCategory || 0,
        },
        monthly: {
          totalPosts: data.dashboard.contentMetrics.monthly.totalPosts || 0,
          totalCategories: data.dashboard.contentMetrics.monthly.totalCategory || 0,
        },
        allTime: {
          totalPosts: data.dashboard.contentMetrics.allTime.totalPosts || 0,
          totalCategories: data.dashboard.contentMetrics.allTime.totalCategory || 0,
        },
      }
    : {
        daily: { totalPosts: 0, totalCategory: 0 },
        monthly: { totalPosts: 0, totalCategory: 0 },
        allTime: { totalPosts: 0, totalCategory: 0 },
      };

  
  const metrics = userData[timeRange] || { totalPosts: 0, totalCategories: 0 };
  console.log(metrics); 
  const TimeChange = (range) => {
    setTimeRange(range);
  };

  return (
    <div>
      {/* Left div */}
      <div className="text-center text-3xl font-semibold my-5">Profile</div>
      <div className="flex flex-col sm:flex-row min-h-screen">
        <div className="w-full sm:w-2/4 flex flex-col items-center p-8 h-auto justify-between sm:h-auto">
          <div className="relative flex flex-col items-center bg-purple-400 p-8 sm:h-96 max-h-96 rounded-xl">
            <div className="w-40 h-40 sm:w-60 sm:h-60 mb-2">
              <img
                src="/images/andiebell.png" 
                alt="Profile"
                className="w-full h-full rounded-full object-cover bg-white mb-2"
              />
            </div>
            <small className="text-xs text-gray-600 mt-2">@andie.bell</small>
          </div>
        </div>
        {/* Right div */}

    <div className="w-full sm:w-3/4 p-6 sm:mt-0 mt-4 overflow-auto ">
    <div className="dashboard-content  p-6 bg-purple-400 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold mb-4 text-white">Posts and Categories</h3>

    <div className="mb-6 flex flex-wrap justify-center gap-4">
      {/* Buttons */}
      <button
        className={`w-24 sm:w-auto px-6 py-2 rounded-lg ${timeRange === 'daily' ? 'bg-yellow-500 text-white' : 'bg-gray-400 text-white'}`}
        onClick={() => TimeChange('daily')}
      >
        Daily
      </button>
      <button
        className={` w-24 sm:w-auto px-6 py-2 rounded-lg ${timeRange === 'monthly' ? 'bg-yellow-500 text-white' : 'bg-gray-400 text-white'}`}
        onClick={() => TimeChange('monthly')}
      >
        Monthly
      </button>
      <button
        className={` w-24 sm:w-auto px-6 py-2 rounded-lg ${timeRange === 'allTime' ? 'bg-yellow-500 text-white' : 'bg-gray-400 text-white'}`}
        onClick={() => TimeChange('allTime')}
      >
        All Time
      </button>
    </div>
    {/* Boxes to display posts and categories */}

    <div className="flex flex-col sm:flex-row justify-between items-center p-6 space-x-4 mb-6">
      <div className="flex-1 bg-white p-4 rounded-lg text-center  mb-4 sm:mb-0">
        <p className="font-medium text-orange-600">Total Posts</p>
        <p className="font-semibold text-orange-400 text-2xl">{metrics.totalPosts}</p>
      </div>

      <div className="flex-1 bg-white p-4 rounded-lg text-center">
        <p className="font-medium text-orange-600">Total Categories</p>
        <p className="font-semibold text-orange-400 text-2xl">{metrics.totalCategories}</p>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default Dashboard;
