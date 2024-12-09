import React from 'react';
import { Line } from 'react-chartjs-2'; 
import { Chart as ChartJS } from 'chart.js/auto';  // Required for Chart.js

const LineChart = ({ data, label, title }) => {

  const chartData = {
     labels: data?.map(item => item._id) || [],
    datasets: [
      {
        label: label,
        data: data?.map(item => item.value) || [],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return <Line style={{padding: 20}} data={chartData} />;
};

export default LineChart;
