import React from "react";

const CircularProgress = () => {
  return (
    <div className="flex flex-col items-center w-fit mx-auto justify-center mt-4 border  border-gray-800 rounded-lg p-4">
      <div className="relative ">
        {/* Circular Progress Background */}
        <svg className="w-40 h-40" viewBox="0 0 36 36">
          <circle
            className="text-purple-500"
            stroke="currentColor"
            fill="transparent"
            strokeWidth="3"
            cx="18"
            cy="18"
            r="15.91549431"
          />
          <circle
            className="text-purple-500"
            stroke="currentColor"
            fill="transparent"
            strokeWidth="3"
            strokeDasharray="25,100"
            cx="18"
            cy="18"
            r="15.91549431"
          />
          <circle
            className="text-purple-500"
            stroke="currentColor"
            fill="transparent"
            strokeWidth="3"
            strokeDasharray="25,100"
            strokeDashoffset="-25"
            cx="18"
            cy="18"
            r="15.91549431"
          />
          <circle
            className="text-purple-500"
            stroke="currentColor"
            fill="transparent"
            strokeWidth="3"
            strokeDasharray="25,100"
            strokeDashoffset="-50"
            cx="18"
            cy="18"
            r="15.91549431"
          />
          <circle
            className="text-purple-500"
            stroke="currentColor"
            fill="transparent"
            strokeWidth="3"
            strokeDasharray="25,100"
            strokeDashoffset="-75"
            cx="18"
            cy="18"
            r="15.91549431"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-500">پرداخت‌های انجام</p>
          <p className="text-sm text-gray-500">نشده</p>
          <p className="text-lg text-blue-500 mt-2">۰%</p>
        </div>
      </div>

      {/* Footer Text */}
      <p className="mt-6 text-gray-400">شما هنوز هیچ پرداختی ثبت نکرده‌اید.</p>
    </div>
  );
};

export default CircularProgress;
