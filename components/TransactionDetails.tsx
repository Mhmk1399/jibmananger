import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PriceInput from "./priceInput";

const TransactionDetails = ({
  transactionId,
  groupId,
  onClose,
}: {
  transactionId: string;
  groupId: string;
  onClose: () => void;
}) => {
  const [transaction, setTransaction] = useState<{
    amount: number;
    description: string;
    type: string;
    date: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    type: "",
    date: "",
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(
          `/api/groups/${groupId}/transactions/${transactionId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        setTransaction(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };
    fetchTransaction();
  }, [transactionId, groupId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Using the props directly in the fetch URL
      const response = await fetch(
        `/api/groups/${groupId}/transactions/${transactionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            // previousAmount: transaction?.amount,
            amount: Number(formData.amount), // Calculate the difference
            description: formData.description,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setIsEditing(false);
        // Update local state with the updated transaction
        const updatedTransaction = result.updatedGroup.transactions.find(
          (t: any) => t._id === transactionId
        );
        setTransaction(updatedTransaction);
        onClose();
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-purple-50 rounded-xl p-6 w-[90%] max-w-2xl" dir="rtl">
        {!isEditing ? (
          <div>
            <h2 className="text-xl font-bold mb-4">جزئیات تراکنش</h2>
            <p className="mb-2">مبلغ: {transaction?.amount}</p>
            <p className="mb-2">توضیحات: {transaction?.description}</p>
            <p className="mb-4">
              نوع: {transaction?.type === "income" ? "دریافتی" : "پرداختی"}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
              >
                ویرایش
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                بستن
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <PriceInput
              value={formData.amount}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, amount: e.target.value }))
              }
              name="مبلغ"
            />
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full p-2 border rounded-lg"
              placeholder="توضیحات"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                ذخیره تغییرات
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                انصراف
              </button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default TransactionDetails;
