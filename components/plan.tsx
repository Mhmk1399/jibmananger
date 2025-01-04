"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import TransactionList from "../components/transactionList"; // We'll create this next
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

const Plan: React.FC = () => {
  const scrollToList = (type: "income" | "outcome") => {
    document.getElementById(`${type}-list`)?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <>
      <div
        className="flex flex-row p-6 max-w-xl gap-2 mx-auto w-full"
        dir="rtl"
      >
        <motion.div
          className="flex-1 bg-gradient-to-br from-emerald-300 w-[50%] to-emerald-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => scrollToList("income")}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-full group-hover:bg-emerald-600 transition-colors">
              <ArrowTrendingUpIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">دریافتی</h3>
              <p className="text-lg font-bold text-emerald-600">6,240.00</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-emerald-200 rounded-full">
              <motion.div
                className="h-full bg-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">70% از بودجه ماهیانه</p>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 bg-gradient-to-br from-rose-300 to-rose-100 p-4  w-[50%] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => scrollToList("outcome")}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-500 rounded-full group-hover:bg-rose-600 transition-colors">
              <ArrowTrendingDownIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">پرداختی</h3>
              <p className="text-lg font-bold text-rose-600">3,240.00</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-rose-200 rounded-full">
              <motion.div
                className="h-full bg-rose-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "45%" }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">45% از بودجه ماهیانه</p>
          </div>
        </motion.div>
      </div>
      <div className="space-y-4">
        <div id="income-list">
          <TransactionList type="income" />
        </div>
        <div id="outcome-list">
          <TransactionList type="outcome" />
        </div>
      </div>
    </>
  );
};

export default Plan;
