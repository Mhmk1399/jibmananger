import React from "react";
import { Bar } from "react-chartjs-2";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import moment from "moment-jalaali";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TransactionChartProps {
  incomes: number[];
  outcomes: number[];
}

const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const TransactionChart: React.FC<TransactionChartProps> = ({
  incomes,
  outcomes,
}) => {
  const currentJalaliYear = moment().jYear();

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
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
          label: function (context: TooltipItem<"bar">) {
            return `${
              context.dataset.label
            }: ${context.parsed.y.toLocaleString()} تومان`;
          },
          title: function (tooltipItems: TooltipItem<"bar">[]) {
            const monthIndex = tooltipItems[0].dataIndex;
            return `${persianMonths[monthIndex]} ${currentJalaliYear}`;
          },
        },
      },
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Vazirmatn",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          callback: function (tickValue: string | number) {
            return Number(tickValue).toLocaleString() + " تومان";
          },
        },
      },
    },
  };

  const data = {
    labels: persianMonths,
    datasets: [
      {
        label: "دریافتی",
        data: incomes,
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 1,
        borderRadius: 1,
        hoverBackgroundColor: "rgba(34, 197, 94, 0.8)",
      },
      {
        label: "پرداختی",
        data: outcomes,
        backgroundColor: "rgba(239, 68, 68, 0.6)",
        borderColor: "rgb(239, 68, 68)",
        borderWidth: 1,
        borderRadius: 1,
        hoverBackgroundColor: "rgba(239, 68, 68, 0.8)",
      },
    ],
  };

  const totalIncomes = incomes.reduce((sum, value) => sum + value, 0);
  const totalOutcomes = outcomes.reduce((sum, value) => sum + value, 0);

  return (
    <motion.div
      className="w-full lg:p-6 p-3 overflow-x-auto touch-pan-x bg-white/10 backdrop-blur-lg mt-8 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-bold mb-6 text-purple-500 text-center">
        نمودار تراکنش‌های مالی سال {currentJalaliYear}
      </h2>
      <div className="min-w-[310px] h-[200px] md:h-[400px]">
        <Bar options={options} data={data} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4" dir="rtl">
        <div className="bg-green-500/80 p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <ArrowTrendingUpIcon className="w-5 h-5 text-green-100" />
            <p className="text-green-100 text-sm">مجموع دریافتی‌ها</p>
          </div>
          <p className="text-white text-md font-bold">
            {totalIncomes.toLocaleString()} تومان
          </p>
        </div>

        <div className="bg-red-500/80 p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <ArrowTrendingDownIcon className="w-5 h-5 text-red-100" />
            <p className="text-red-100 text-sm">مجموع پرداختی‌ها</p>
          </div>
          <p className="text-white text-md font-bold">
            {totalOutcomes.toLocaleString()} تومان
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionChart;
