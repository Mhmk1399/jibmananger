import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PriceInput from "./priceInput";

const TransactionDetails = ({ transactionId, groupId, onClose }: { transactionId: string; groupId: string; onClose: () => void }) => {
    const [transaction, setTransaction] = useState<{
      amount: string;
      description: string;
      type: string;
      date: string;
    } | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      amount: "",
      description: "",
      type: "",
      date: ""
    });
  
    useEffect(() => {
      const fetchTransaction = async () => {
        const response = await fetch(`/api/groups/${groupId}/transactions/${transactionId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setTransaction(data);
        setFormData(data);
      };
      fetchTransaction();
    }, [transactionId, groupId]);
  
    const handleUpdate = async () => {
      const response = await fetch(`/api/groups/${groupId}/transactions/${transactionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsEditing(false);
        setTransaction(formData);
      }
    };
  
    return (
      <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-[90%] max-w-2xl" dir="rtl">
          {!isEditing ? (
            <div>
              <h2>جزئیات تراکنش</h2>
              <p>مبلغ: {transaction?.amount}</p>
              <p>توضیحات: {transaction?.description}</p>
              <p>نوع: {transaction?.type === 'income' ? 'دریافتی' : 'پرداختی'}</p>
              <button onClick={() => setIsEditing(true)}>ویرایش</button>
            </div>
          ) : (
            <form onSubmit={handleUpdate}>
              <PriceInput
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({...prev, amount: e.target.value}))}
                name="مبلغ"
              />
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
              />
              <button type="submit">ذخیره تغییرات</button>
            </form>
          )}
        </div>
      </motion.div>
    );
  };

  export default TransactionDetails;
  