"use client";
import {
  BellIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const Notification = () => {


  return (
    <div className="flex flex-row items-center gap-4 relative" dir="ltr">
      {/* Notification Bell */}
      <div className="relative">
        <BellIcon className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
        <span className="absolute -top-1 -right-1">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </div>

      {/* Income Alert */}
      <div className="relative">
        <BanknotesIcon className="h-6 w-6 text-emerald-600 hover:text-emerald-800 cursor-pointer" />
        <span className="absolute -top-1 -right-1">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      </div>

      {/* Warning Alert */}
      <div className="relative">
        <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 hover:text-amber-800 cursor-pointer" />
        <span className="absolute -top-1 -right-1">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
      </div>
    </div>
  );
};

export default Notification;
