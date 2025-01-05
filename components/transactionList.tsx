"use client";
import { motion } from "framer-motion";
import { format } from "date-fns-jalali"; // For Persian date formatting
import { useEffect, useState } from "react";
import Calendar from "react-modern-calendar-datepicker";
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
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);

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

    let mounted = true;
    if (mounted) {
      fetchTransactions();
    }

    return () => {
      mounted = false;
    };
  }, [type]);

  const handleCalanderChange = (
    selectedDate: { day: number; month: number; year: number } | null
  ) => {
    setSelectedDate(selectedDate);
  };

  const handleFilterByDate = () => {
    // Implement filtering logic by selectedDate
    // Clear the selected date after applying the filter
    // setSelectedDate();
    setDateModalOpen(false);
  };

  const handleFilterByName = () => {
    // Implement filtering logic by filterName
    // Clear the filterName after applying the filter
    setFilterName("");
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
      <div className="flex flex-row-reverse justify-between items-center mb-4">
        <h2
          className={`text-xl font-bold px-4 mb-4 text-right ${
            type === "income"
              ? "text-emerald-600 border-r-4 border-emerald-500"
              : "text-rose-600 border-r-4 border-rose-500"
          }`}
        >
          {type === "income" ? "لیست دریافتی‌ها" : "لیست پرداختی‌ها"}
        </h2>

        <div className="flex gap-2 justify-between mb-4">
          <button
            onClick={() => setDateModalOpen(true)}
            className="bg-gray-200 text-white px-4 py-2 rounded"
          >
            <svg
              width="15"
              height="15px"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M0 3H16V1H0V3Z" fill="#000000"></path>{" "}
                <path d="M2 7H14V5H2V7Z" fill="#000000"></path>{" "}
                <path d="M4 11H12V9H4V11Z" fill="#000000"></path>{" "}
                <path d="M10 15H6V13H10V15Z" fill="#000000"></path>{" "}
              </g>
            </svg>
          </button>
          <button
            onClick={() => setNameModalOpen(true)}
            className="bg-gray-200 text-white px-4 py-2 rounded"
          >
            <svg
              width="15px"
              height="15px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 10.5A3.502 3.502 0 0 0 18.355 8H21a1 1 0 1 0 0-2h-2.645a3.502 3.502 0 0 0-6.71 0H3a1 1 0 0 0 0 2h8.645A3.502 3.502 0 0 0 15 10.5zM3 16a1 1 0 1 0 0 2h2.145a3.502 3.502 0 0 0 6.71 0H21a1 1 0 1 0 0-2h-9.145a3.502 3.502 0 0 0-6.71 0H3z"
                  fill="#000000"
                ></path>
              </g>
            </svg>
          </button>
        </div>
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
          <div className="bg-white rounded-lg p-6 w-96">
            {" "}
            {/* Increased width for better calendar display */}
            <h2 className="text-xl font-bold mb-4 text-right">
              فیلتر بر اساس تاریخ
            </h2>
            <Calendar
              value={selectedDate}
              onChange={handleCalanderChange}
              shouldHighlightWeekends
              locale="fa"
              calendarClassName="responsive-calendar" // Add custom class for styling
              colorPrimary="#673ab7"
              colorPrimaryLight="#ede7f6"
            />
            <div className="flex justify-between mt-4">
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="fixed inset-0 flex items-center justify-center bg-purple-900 bg-opacity-50"
          dir="rtl"
        >
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold text-white pb-3 border-b-2 border-gray-200 mb-4">
              فیلتر بر اساس نام
            </h2>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="نام را وارد کنید"
              className="border p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-purple-500 focus:ring-1"
              dir="rtl"
            />
            {filterName && (
              <div
                className="flex items-center bg-purple-100 p-1 rounded-xl justify-between mb-4"
                dir="rtl"
              >
                <span className="text-gray-400 text-sm">
                  فیلتر شده بر اساس: {filterName}
                </span>
                <button
                  onClick={() => setFilterName("")} // Clear the filterName
                  className="text-red-500 font-bold ml-2"
                >
                  X
                </button>
              </div>
            )}
            <div className="flex justify-between">
              <button
                onClick={handleFilterByName}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                اعمال فیلتر
              </button>
              <button
                onClick={() => {
                  setFilterName(""); // Clear filterName on close
                  setNameModalOpen(false);
                }}
                className="bg-rose-500 text-white px-4 py-2 rounded"
              >
                بستن
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
export default TransactionList;
