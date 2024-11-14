
'use client';
import { useState } from "react";
import { Line } from "react-chartjs-2";
import useSWR from "swr";
import {
  Chart as ChartJS,  CategoryScale,   LinearScale,   PointElement,   LineElement,   Title,   Tooltip,   Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//API
const fetcher = (url) => fetch(url).then((res) => res.json());
const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState("daily");
  const { data, error } = useSWR('/api/admin/dashboard', fetcher); 

  if (error) return <div>Error loading data...</div>;
  if (!data) return <div>Loading...</div>;

  
  const userData = data ? {
    daily: {
            totalViews: data.dashboard.engagementMetrics.daily.totalViews || 0,
            totalLikes: data.dashboard.engagementMetrics.daily.totalLikes || 0,
            totalPostShares: data.dashboard.contentMetrics.daily.totalPostShares || 0,
            totalMessages: data.dashboard.engagementMetrics.daily.totalMessages || 0,
            privateChats: data.dashboard.engagementMetrics.daily.privateChats || 0,
          },
      monthly: {
            totalViews: data.dashboard.engagementMetrics.monthly.totalViews || 0,
            totalLikes: data.dashboard.engagementMetrics.monthly.totalLikes || 0,
            totalPostShares: data.dashboard.contentMetrics.monthly.totalPostShares || 0,
            totalMessages: data.dashboard.engagementMetrics.monthly.totalMessages || 0,
            privateChats: data.dashboard.engagementMetrics.monthly.privateChats || 0,
          },
      allTime: {
            totalViews: data.dashboard.engagementMetrics.allTime.totalViews || 0,
            totalLikes: data.dashboard.engagementMetrics.allTime.totalLikes || 0,
            totalPostShares: data.dashboard.contentMetrics.allTime.totalPostShares|| 0,
            totalMessages: data.dashboard.engagementMetrics.allTime.totalMessages || 0,
            privateChats: data.dashboard.engagementMetrics.allTime.privateChats || 0,
          },
        } : {
          daily: { totalViews: 0, totalLikes: 0,  totalPostShares: 0, totalMessages: 0, privateChats: 0 },
          monthly: { totalViews: 0, totalLikes: 0,  totalPostShares: 0, totalMessages: 0, privateChats: 0 },
          allTime: { totalViews: 0, totalLikes: 0,  totalPostShares: 0, totalMessages: 0, privateChats: 0 },
        };
  
        const selectedData = userData[timePeriod];
        // chart details
        const chartData = {
          labels: ['Views', 'Likes', 'Shares',  'Private Chats'], 
          datasets: [
            {
              label: `Engagement for ${timePeriod}`,
              data: [
                selectedData.totalViews,
                selectedData.totalLikes,
                selectedData. totalPostShares,
                selectedData.privateChats,
              ],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
            },
          ],
        };
        

        const chartOptions = {
          responsive: true,
          scales: {
            x: {title: { display: true,text: 'Metrics',
              },
            },
            y: {title: {display: true,text: 'Values', 
              },
              beginAtZero: true,ticks: {stepSize: 10, 
              },
            },
          },
          plugins: {legend: {display: true,position: 'top',
            },
          },
        };
        return(
          <div>
            <div className=" p-6 text-white text-center "> Get relevant details about your posts through various metrics and their progress</div>
         {/* Buttons */}
      <div className="flex justify-center p-4 space-x-4 mt-4 h-15">
      <button
       onClick={() => setTimePeriod("daily")}
       className={`px-4 py-2 text-white ${timePeriod === "daily" ? "bg-purple-500" : "bg-gray-400"}`}
      >
      Daily
      </button>
     <button
       onClick={() => setTimePeriod("monthly")}
       className={`px-4 py-2 text-white ${timePeriod === "monthly" ? "bg-purple-500" : "bg-gray-400"}`}
      >
      Monthly
     </button>
     <button
      onClick={() => setTimePeriod("allTime")}
      className={`px-4 py-2 text-white ${timePeriod === "allTime" ? "bg-purple-500" : "bg-gray-400"}`}
     >
      All Time
     </button>
    </div>

 {/* Chart */}
   <div className="flex justify-center items-center pt-6">
     <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full h-65">
       <Line data={chartData} options={chartOptions} />
     </div>
   </div>

  {/* //End Boxes */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 p-6">
      <div className="bg-blue-100 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700">Total Views</h3>
        <p className="text-2xl font-bold text-yellow-600">{selectedData?.totalViews}</p>
      </div>
      <div className="bg-purple-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Total Likes</h3>
        <p className="text-2xl font-bold text-purple-600">{selectedData?.totalLikes}</p>
      </div>
      <div className="bg-orange-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">Total Shares</h3>
      <p className="text-2xl font-bold text-orange-600">{selectedData?. totalPostShares}</p>
    </div>
     <div className="bg-red-100 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700">Private Chats</h3>
       <p className="text-2xl font-bold text-red-600">{selectedData?.privateChats}</p>
     </div>
   </div>
 </div>
  );
};

export default Dashboard;

      
