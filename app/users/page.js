'use client';
import {  useState } from 'react';
import useSWR from 'swr'; 

// API
const fetcher = (url) => fetch(url).then((res) => res.json());
const UsersPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const { data, error } = useSWR('/api/admin/dashboard', fetcher);

  const userData = data ? {
    daily: {
      totalUsers: data.dashboard.userMetrics.daily.totalUser || 0,
      activeUsers: data.dashboard.userMetrics.daily.activeUser || 0,
      totalReferrals: data.dashboard.userMetrics.daily.totalReferral || 0,
      creators: data.dashboard.userMetrics.daily.creator || 0,
    },
    monthly: {
      totalUsers: data.dashboard.userMetrics.monthly.totalUser || 0,
      activeUsers: data.dashboard.userMetrics.monthly.activeUser || 0,
      totalReferrals: data.dashboard.userMetrics.monthly.totalReferral || 0,
      creators: data.dashboard.userMetrics.monthly.creator || 0,
    },
    allTime: {
      totalUsers: data.dashboard.userMetrics.allTime.totalUser || 0,
      activeUsers: data.dashboard.userMetrics.allTime.activeUser || 0,
      totalReferrals: data.dashboard.userMetrics.allTime.totalReferral || 0,
      creators: data.dashboard.userMetrics.allTime.creator || 0,
    },
  } : {
    daily: { totalUsers: 0, activeUsers: 0, totalReferrals: 0, creators: 0 },
    monthly: { totalUsers: 0, activeUsers: 0, totalReferrals: 0, creators: 0 },
    allTime: { totalUsers: 0, activeUsers: 0, totalReferrals: 0, creators: 0 },
  };

  const selectedData = userData[selectedPeriod];
  return (
    // top box
    <div className="min-h-screen flex flex-col items-center justify-start p-6"> 
      <div className="w-full max-w-screen-xl space-y-10 mt-4"> 
        <div className="w-full text-center mb-8 py-6 px-6 bg-gray-100 rounded-lg shadow-md"> 
          <h1 className="text-3xl font-bold text-purple-500">User Management Overview</h1>
          <p className="text-lg text-gray-600 mt-4">View detailed metrics for users, referrals, and creators. Select a time period (Daily, Monthly, All-Time) to explore the data.</p>
        </div>
        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/6 flex flex-col items-center justify-center space-y-4 p-4">
            <button
              className={`w-3/4 px-4 py-4 rounded ${selectedPeriod === 'daily' ? 'bg-purple-500 text-white' : 'bg-gray-400'}`}
              onClick={() => setSelectedPeriod('daily')}
            >
              Daily
            </button>
            <button
              className={`w-3/4 px-4 py-4 rounded ${selectedPeriod === 'monthly' ? 'bg-purple-500 text-white' : 'bg-gray-400'}`}
              onClick={() => setSelectedPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`w-3/4 px-4 py-4 rounded ${selectedPeriod === 'allTime' ? 'bg-purple-500 text-white' : 'bg-gray-400'}`}
              onClick={() => setSelectedPeriod('allTime')}
            >
              All Time
            </button>
          </div>
          {/* SIngle end box */}
          <div className="w-full md:w-3/6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white shadow-md p-4 rounded h-32 flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-purple-400">Total Users</h2>
              <p className="text-3xl font-bold text-yellow-400">{selectedData?.totalUsers || 0}</p>
            </div>
            <div className="bg-white shadow-md p-4 rounded h-32 flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-purple-400">Active Users</h2>
              <p className="text-3xl font-bold text-yellow-400">{selectedData?.activeUsers || 0}</p>
            </div>
            <div className="bg-white shadow-md p-4 rounded h-32 flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-purple-400">Total Referrals</h2>
              <p className="text-3xl font-bold text-yellow-400">{selectedData?.totalReferrals || 0}</p>
            </div>
            <div className="bg-white shadow-md p-4 rounded h-32 flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-purple-400">Creators</h2>
              <p className="text-3xl font-bold text-yellow-400">{selectedData?.creators || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;





