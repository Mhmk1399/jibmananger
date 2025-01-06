import React from "react";
import { Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// interface TransactionChartProps {
//   incomes: string[];
//   outcomes: string[];
// }

const PieChart: React.FC = ({
  
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            family: "Vazirmatn",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.parsed.toLocaleString()} تومان`;
          },
        },
      },
    },
    cutout: "50%", // This makes it a doughnut chart. Remove for regular pie
  };

  const data = {
    labels: ["دریافتی", "پرداختی"],
    datasets: [
      {
        data: [495000, 396000],
        backgroundColor: ["rgba(34, 197, 94, 0.6)", "rgba(239, 68, 68, 0.6)"],
        borderColor: ["rgb(34, 197, 94)", "rgb(239, 68, 68)"],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
      },
    ],
  };

  return (
    <motion.div
      className="w-full p-6 bg-white/10 backdrop-blur-lg mt-8 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-bold mb-6 text-purple-500 text-center">
        نمودار تراکنش‌های مالی
      </h2>
      <div className="p-4">
        <Pie options={options} data={data} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4" dir="rtl">
        <div className="bg-green-500/80 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <ArrowTrendingUpIcon className="w-5 h-5 text-green-100" />
            <p className="text-green-100 text-sm">مجموع دریافتی‌ها</p>
          </div>
          <p className="text-white text-lg font-bold">495,000 تومان</p>
        </div>

        <div className="bg-red-500/80 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <ArrowTrendingDownIcon className="w-5 h-5 text-red-100" />
            <p className="text-red-100 text-sm">مجموع پرداختی‌ها</p>
          </div>
          <p className="text-white text-lg font-bold">396,000 تومان</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PieChart;
