"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import LoadingComponent from "@/components/loading";
import { useCallback } from "react";

interface Transaction {
  _id: string;
  amount: number;
  description: string;
  date: string;
  category?: {
    name: string;
    color: string;
    _id: string;
  };
  recipient?: {
    name: string;
    phoneNumber: number;
    _id: string;
  };
  bank?: {
    name: string;
    _id: string;
    cardNumber: number;
  };
}

export default function ManageTransactions() {
  const [loading, setLoading] = useState(true);
  const [transactionType, setTransactionType] = useState<
    "incomes" | "outcomes"
  >("incomes");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/transactions/${transactionType}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("خطا در دریافت تراکنش‌ها");
    }
  }, [transactionType]);

  // useEffect(() => {
  //   fetchTransactions();
  // }, [fetchTransactions]);
  useEffect(() => {
    fetchTransactions();
  }, [transactionType , fetchTransactions]);
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/transactions/${transactionType}s`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          id: id,
        },
      });
      if (response.ok) {
        toast.success("تراکنش با موفقیت حذف شد");
        fetchTransactions();
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("خطا در حذف تراکنش");
    }
  };

  const handleUpdate = async (transaction: Transaction) => {
    try {
      const response = await fetch(`/api/transactions/${transactionType}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          id: transaction._id,
        },
        body: JSON.stringify({
          amount: transaction.amount,
          description: transaction.description,
          date: transaction.date,
          category: transaction.category,
          recipient: transaction.recipient,
          bank: transaction.bank?._id,
        }),
      });
      if (response.ok) {
        toast.success("تراکنش با موفقیت ویرایش شد");
        setIsEditModalOpen(false);
        fetchTransactions();
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast.error("خطا در ویرایش تراکنش");
    }
  };
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <div className="min-h-screen bg-purple-50 p-4 mb-24" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        مدیریت تراکنش‌ها
      </h1>

      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setTransactionType("incomes")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              transactionType === "incomes"
                ? "bg-green-500 text-white"
                : "text-gray-600"
            }`}
          >
            دریافتی‌ها
          </button>
          <button
            onClick={() => setTransactionType("outcomes")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              transactionType === "outcomes"
                ? "bg-red-500 text-white"
                : "text-gray-600"
            }`}
          >
            پرداختی‌ها
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {transactions.map((transaction) => (
          <motion.div
            key={transaction._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-md"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">
                  {transaction.description}
                </h3>
                <p className="text-gray-600">
                  مبلغ: {transaction.amount.toLocaleString()} تومان
                </p>
                <p className="text-gray-600">
                  تاریخ:{" "}
                  {new Date(transaction.date).toLocaleDateString("fa-IR")}
                </p>
                {transaction.category && (
                  <span
                    className="inline-block px-2 py-1 rounded-full text-sm mt-2"
                    style={{
                      backgroundColor: transaction.category.color + "20",
                      color: transaction.category.color,
                    }}
                  >
                    {transaction.category.name}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingTransaction(transaction);
                    setIsEditModalOpen(true);
                  }}
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  <PencilIcon className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(transaction._id)}
                  className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                >
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isEditModalOpen && editingTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">ویرایش تراکنش</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editingTransaction);
              }}
              className="space-y-4"
            >
              <input
                type="number"
                value={editingTransaction.amount}
                onChange={(e) =>
                  setEditingTransaction({
                    ...editingTransaction,
                    amount: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="مبلغ"
              />
              <input
                type="text"
                value={editingTransaction.description}
                onChange={(e) =>
                  setEditingTransaction({
                    ...editingTransaction,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="توضیحات"
              />
              <input
                type="date"
                value={editingTransaction.date.split("T")[0]}
                onChange={(e) =>
                  setEditingTransaction({
                    ...editingTransaction,
                    date: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  ذخیره
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                >
                  انصراف
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
