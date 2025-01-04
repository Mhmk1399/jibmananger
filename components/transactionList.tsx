"use client";
import { motion } from "framer-motion";
import { format } from "date-fns-jalali"; // For Persian date formatting

interface TransactionListProps {
  type: "income" | "outcome";
}

const TransactionList: React.FC<TransactionListProps> = ({ type }) => {
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
      <div className="bg-gray-100 rounded-xl shadow-lg p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white">
              <th className="text-right py-2">تاریخ</th>
              <th className="text-center py-2">توضیحات</th>
              <th className="text-left py-2">مبلغ</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((item) => (
              <tr key={item} className="border-b hover:bg-gray-50">
                <td className="py-3">{format(new Date(), "yyyy/MM/dd")}</td>
                <td className="py-3">توضیحات تراکنش {item}</td>
                <td
                  className={`py-3 text-left font-bold ${
                    type === "income" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {type === "income" ? "+" : "-"} {1000 * item} تومان
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TransactionList;
