"use client";
import { motion } from "framer-motion";
import { format } from "date-fns-jalali"; // For Persian date formatting
import { useEffect, useState } from "react";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

interface TransactionListProps {
  type: "income" | "outcome";
}
interface Transaction {
  _id: string;
  amount: number;
  description: string;
  date: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ type }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const [isNameModalOpen, setNameModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{ day: number; month: number; year: number } | null>(null);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/transactions/${type}s`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [type]);

  const handleFilterByDate = () => {
    // Implement filtering logic by selectedDate
    setDateModalOpen(false);
  };

  const handleFilterByName = () => {
    // Implement filtering logic by filterName
    setNameModalOpen(false);
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-10">
      <svg
        className={`w-32 h-32 ${
          type === "income" ? "text-emerald-200" : "text-rose-200"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        {type === "income" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        )}
      </svg>
      <p
        className={`mt-4 text-lg font-medium ${
          type === "income" ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {type === "income" ? "هنوز دریافتی ثبت نشده" : "هنوز پرداختی ثبت نشده"}
      </p>
    </div>
  );

  return (
    <motion.div
      className="max-w-xl mx-auto p-6 mb-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className={`text-xl font-bold px-4 mb-4 text-right ${
          type === "income"
            ? "text-emerald-600 border-r-4 border-emerald-500"
            : "text-rose-600 border-r-4 border-rose-500"
        }`}
      >
        {type === "income" ? "لیست دریافتی‌ها" : "لیست پرداختی‌ها"}
      </h2>

      <div className="flex justify-between mb-4">
        <button
          onClick={() => setDateModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          فیلتر بر اساس تاریخ
        </button>
        <button
          onClick={() => setNameModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          فیلتر بر اساس نام
        </button>
      </div>

      <div className="bg-gray-100 rounded-xl shadow-lg p-4">
        {transactions.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white">
                <th className="text-right py-2">تاریخ</th>
                <th className="text-center py-2">توضیحات</th>
                <th className="text-left py-2">مبلغ</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b hover:bg-gray-50">
                  <td className="py-3">
                    {format(new Date(transaction.date), "yyyy/MM/dd")}
                  </td>
                  <td className="py-3">{transaction.description}</td>
                  <td
                    className={`py-3 text-left font-bold ${
                      type === "income" ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {type === "income" ? "+" : "-"} {transaction.amount} تومان
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Custom Date Filter Modal */}
      {isDateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">فیلتر بر اساس تاریخ</h2>
            <Calendar
              // value={selectedDate}
              // onChange={(value) => setSelectedDate(value || null)}
              shouldHighlightWeekends
              locale="fa"
              calendarClassName="custom-calendar w-full"
              colorPrimary="#673ab7"
              colorPrimaryLight="#ede7f6"
            />
            <div className="flex justify-between">
              <button
                onClick={handleFilterByDate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                اعمال فیلتر
              </button>
              <button
                onClick={() => setDateModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Name Filter Modal */}
      {isNameModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">فیلتر بر اساس نام</h2>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="نام را وارد کنید"
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-between">
              <button
                onClick={handleFilterByName}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                اعمال فیلتر
              </button>
              <button
                onClick={() => setNameModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TransactionList;
