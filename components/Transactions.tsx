"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { formatDistance } from "date-fns";
import GroupTransactions from "./groupsTransactions";
import TransactionDetails from "./TransactionDetails";

interface Transaction {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: "income" | "outcome";
  createdBy: {
    name: string;
  };
}

const Transactions = ({ params }: { params: { id: string } }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showGroupTransactions, setShowGroupTransactions] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch(`/api/groups/${params.id}/transactions`);
      const data = await response.json();
      setTransactions(data.transactions);
    };

    fetchTransactions();
  }, [params.id]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount);
  };

  const handleEditClick = (transactionId: string) => {
    setSelectedTransaction(transactionId);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4" dir="rtl">
      <button
        onClick={() => setShowGroupTransactions(true)}
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
      >
        تراکنش جدید
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-4">
        {showGroupTransactions && (
          <GroupTransactions
            groupId={params.id}
            onClose={() => setShowGroupTransactions(false)}
          />
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                  توضیحات
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                  مبلغ
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                  دسته‌بندی
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                  نوع
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                  کاربر
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                  تاریخ
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                  تنظیمات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`flex items-center gap-1 ${
                        transaction.type === "income"
                          ? "text-purple-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpIcon className="w-4 h-4" />
                      ) : (
                        <ArrowDownIcon className="w-4 h-4" />
                      )}
                      {formatAmount(transaction.amount)} تومان
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.type === "income"
                          ? "bg-purple-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type === "income" ? "دریافتی" : "پرداختی"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDistance(new Date(transaction.date), new Date(), {
                      addSuffix: true,
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleEditClick(transaction._id)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Cog6ToothIcon className="w-5 h-5 text-gray-500 hover:text-purple-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && selectedTransaction && (
        <TransactionDetails
          transactionId={selectedTransaction}
          groupId={params.id}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedTransaction(null);
          }}
        />
      )}
    </div>
  );
};

export default Transactions;
