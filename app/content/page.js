'use client';
import React from 'react';
import Link from 'next/link'; 

const MetricCard = ({ title, value, image, onClick }) => {
  const linkPath = () => {
    switch (title) {
      case 'Shares':
        return '/content/share'; 
      case 'Comments':
        return '/content/comment'; 
      case 'Exits':
        return '/content/exit'; 
      default:
        return '/content/view'; 
    }
  };

  return (
    <div className=" items-center m-2 flex flex-col ">
      <div className="mb-2 text-purple-400 font-medium">{title}</div>
      <Link href={linkPath()} className="block w-64 h-80 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="h-full object-cover">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
    </div>
  );
};

const CardMain = ({ postId }) => {
  const metrics = [
    { title: 'Views', value: '328', image: '/images/View.jpg' },
    { title: 'Shares', value: '100', image: '/images/Share.png' },
    { title: 'Comments', value: '50', image: '/images/Comment.png' },
    { title: 'Exits', value: '20', image: '/images/Exit.png' },
  ];

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">Post Metrics Dashboard</h1>
        <p className="text-white mt-2">Monitor daily views, shares, comments, and exits below.</p>
      </div>

      <div className="h-10"></div>
      <div className=" justify-center flex flex-wrap  gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            image={metric.image}
          />
        ))}
      </div>
    </div>
  );
};

export default CardMain;
































