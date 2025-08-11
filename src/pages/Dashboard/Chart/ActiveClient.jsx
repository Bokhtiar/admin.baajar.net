import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const ActiveClient = () => {
  const labels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const dataValues = [230, 248, 255, 275, 277, 273, 273, 285, 137, 193, 188, 223];
  const colors = [
    "#60a5fa", "#3b82f6", "#34d399", "#34d399", "#9ca3af", "#3b82f6",
    "#f59e0b", "#f43f5e", "#f59e0b", "#34d399", "#fbbf24", "#fbbf24"
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Active Clients",
        data: dataValues,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
    
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Company Performance (Active Client)",
        font: { size: 18 },
        align: 'start',
        color: '#000000',
        
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#000",
        offset: -25,
        font: {
          weight: "bold",
          size: 12,
        },
        formatter: (value) => {
          if (value === 0) return null; 
          return value;
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 50 },
      },
    },
  };

  return (
    <div className="bg-white shadow-md p-4 " >
      <Bar data={data} options={options}  />
    </div>
  );
};

export default ActiveClient;
