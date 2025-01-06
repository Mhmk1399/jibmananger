"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { rayBold } from "@/next-persian-fonts/ray";
import PriceInput from "./priceInput";

const GroupTransactions = ({
  groupId,
  onClose,
}: {
  groupId: string;
  onClose: () => void;
}) => {
  const [transactionType, setTransactionType] = useState<"income" | "outcome">(
    "income"
  );
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString(),
    createdBy: "", // Will be set from localStorage token
    type: transactionType,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, type: transactionType }));
  }, [transactionType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const numericAmount = Number(formData.amount.replace(/,/g, ""));
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      // Decode token to get user ID
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      const response = await fetch(`/api/groups/${groupId}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: numericAmount,
          description: formData.description,
          date: new Date().toISOString(),
          createdBy: decodedToken.id,
          type: transactionType,
        }),
      });

      if (response.ok) {
        console.log("Transaction posted successfully");
        onClose();
      }
    } catch (error) {
      console.error("Error posting transaction:", error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        className={`${rayBold.variable} font-ray bg-white rounded-xl p-6 w-[90%] max-w-2xl`}
        dir="rtl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">ثبت تراکنش جدید</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="bg-gray-100 p-1 rounded-xl mb-6">
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setTransactionType("income")}
              className={`py-3 rounded-lg text-center ${
                transactionType === "income"
                  ? "bg-green-500 text-white"
                  : "bg-transparent"
              }`}
            >
              دریافتی
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setTransactionType("outcome")}
              className={`py-3 rounded-lg text-center ${
                transactionType === "outcome"
                  ? "bg-red-500 text-white"
                  : "bg-transparent"
              }`}
            >
              پرداختی
            </motion.button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PriceInput
            value={formData.amount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, amount: e.target.value }))
            }
            name="مبلغ"
          />

          <input
            type="text"
            placeholder="توضیحات"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-lg border-2"
          />

          <input
            type="text"
            placeholder="دسته‌بندی"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-lg border-2"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full py-4 rounded-lg text-white font-medium ${
              transactionType === "income" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            ثبت تراکنش
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default GroupTransactions;
