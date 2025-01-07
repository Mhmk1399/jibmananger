"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { rayBold } from "@/next-persian-fonts/ray";
import PriceInput from "../../components/priceInput";
import LoadingComponent from '../../components/loading'
interface Recipient {
  _id: string;
  name: string;
  phoneNumber: string;
  user: string;
}

const RecipientModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl w-[90%] max-w-2xl h-[80vh] overflow-hidden"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">افزودن گیرنده جدید</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <iframe src="/addRecipient" className="w-full h-[calc(100%-60px)]" />
      </motion.div>
    </motion.div>
  );
};
const CardModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl w-[90%] max-w-2xl h-[80vh] overflow-hidden"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">افزودن کارت بانکی جدید</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <iframe src="/addCard" className="w-full h-[calc(100%-60px)]" />
      </motion.div>
    </motion.div>
  );}
  const CategoryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-xl w-[90%] max-w-2xl h-[80vh] overflow-hidden"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-bold">افزودن دسته‌بندی جدید</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          <iframe src="/addCategory" className="w-full h-[calc(100%-60px)]" />
        </motion.div>
      </motion.div>
    );
  };
const Page = () => {
  const [transactionType, setTransactionType] = useState<"incomes" | "outcomes">(
    "incomes"
  );
  const [isRecipientModalOpen, setIsRecipientModalOpen] = useState(false);
  const [recipients, setRecipients] = useState<Recipient[]>([{
    name: "",
    phoneNumber: "",
    _id: "",
    user: "",
  }]);
  const [loading, setLoading] = useState(true);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: {
      _id: "",
      name: "",
      color: "",
      user: "",
    },
    bankAccount: {
      cardNumber: "",
      accountBalance: "",
      name: "",
      _id: "",
      user: "",
    },
    description: "",
    transactionType: transactionType,
    image: "",
    recipient: {
      _id: "",
      name: "",
      phoneNumber: "",
      user: "",
    },
    Date: Date.now(),
  });
  
  const [categories, setCategories] = useState<[{
    _id: string;
    name: string;
    color: string;
    user: string;
  }]>([{
    _id: "",
    name: "",
    color: "" ,
    user: "",

  }]);
  const [banks, setBanks] = useState<{
    cardNumber: string;
    accountBalance: string;
    name: string;
    _id: string;
    user: string;
  }[]>([
    {
     user: "",
      cardNumber: "",
      accountBalance: "",
      name: "",
      _id: "",
    },
  ]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const postTransaction = async () => {
      // Find the selected recipient from recipients array
      const selectedRecipient = recipients.find(r => r._id === formData.recipient._id);
      const selectedBank = banks.find(b => b._id === formData.bankAccount._id);
      // Convert amount string "1,234,567" to number 1234567
      const numericAmount = Number(formData.amount.replace(/,/g, ''));
      
      const transactionData = {
        amount: numericAmount,
        description: formData.description,
        category: formData.category,
        date: new Date(),
        recipient: {
          _id: selectedRecipient ? selectedRecipient._id : "",
          name: selectedRecipient ? selectedRecipient.name : "",
          phoneNumber: selectedRecipient ? selectedRecipient.phoneNumber : "",
          user: selectedRecipient ? selectedRecipient.user : "",
        } , // Send full recipient object
        bank: selectedBank,
        image: formData.image
      };
      console.log('transactionData',transactionData);
      
      try {
        const response = await fetch(`/api/transactions/${transactionType}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(transactionData),
        });
        if (response.ok) {
          console.log("Transaction posted successfully");
        }
      } catch (error) {
        console.error("Error posting transaction:", error);
      }
    };
    postTransaction();
  };
  
  
  
  const formatNumber = (value: string) => {
    const numberOnly = value.replace(/\D/g, "");
    return numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const fetchRecipients = async () => {
    try {
      const response = await fetch('/api/recipients', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRecipients(data.recipients);
      }
    } catch (error) {
      console.error('Error fetching recipients:', error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
        
      }
    } catch (error) {
      console.log('Error fetching categories:', error);
      
    }
  };
  const fetchBanks = async () => {
    try {
      const response = await fetch('/api/banks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBanks(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
   
    const loading = async () => {
      await fetchCategories();
      await fetchRecipients();
      await fetchBanks();
      setLoading(false);
    }
    loading();
  }, []);
  useEffect(() => {
    fetchRecipients();
  }, [isRecipientModalOpen]);
  useEffect(() => {
    fetchBanks();
  }, [isCardModalOpen]);
  useEffect(() => {
    fetchCategories();
  }, [isCategoryModalOpen]);
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      amount: formattedValue,
    }));
  };
  console.log(categories);

// Update the handleInputChange function to handle objects
const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  
  if (name === "category") {
    const selectedCategory = categories.find(cat => cat._id === value);
    setFormData(prev => ({
      ...prev,
      category: {
        user: selectedCategory?._id || "",
        name: selectedCategory?.name || "",
        color: selectedCategory?.color || "",
        _id: selectedCategory?._id || ""
      }
    }));
  }
  else if (name === "recipient") {
    const selectedRecipient = recipients.find(rec => rec._id === value);
    setFormData(prev => ({
      ...prev,
      recipient: {
        name: selectedRecipient?.name || "",
        phoneNumber: selectedRecipient?.phoneNumber || "",
        _id: selectedRecipient?._id || "",
        user: selectedRecipient?.user || ""
      }
    }));
  }

  
  else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }  
  console.log(formData);
};

  if (loading) {
    return <LoadingComponent />;
  }
  if (!loading) {
    return (
      <div
        className={`${rayBold.variable} font-ray min-h-screen bg-white p-4 lg:p-8 w-full mb-24`}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-6 lg:mb-10 text-center">
            ثبت تراکنش جدید
          </h1>

          <div className="bg-gray-100 p-1 rounded-xl mb-6 max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setTransactionType("incomes")}
                className={`py-3 rounded-lg text-center ${transactionType === "incomes"
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-transparent text-gray-600"
                  }`}
              >
                دریافتی
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setTransactionType("outcomes")}
                className={`py-3 rounded-lg text-center ${transactionType === "outcomes"
                  ? "bg-[#ff6961] text-white shadow-lg"
                  : "bg-transparent text-gray-600"
                  }`}
              >
                پرداختی
              </motion.button>
            </div>
          </div>

          <form className="space-y-4 lg:space-y-6 max-w-6xl mx-auto">
            <div className="lg:grid lg:grid-cols-2 lg:gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="relative lg:mt-4">
                  <PriceInput
                    value={formData.amount}
                    onChange={handleAmountChange}
                    name="مبلغ"
                  />
                </div>
                <div className="flex justify-between items-center">
  <select
    name="category"
    value={formData.category._id}
    onChange={handleInputChange}
    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
  >
    <option value="">انتخاب دسته بندی</option>
    {categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ))}
  </select>
  <button 
    type="button"
    onClick={() => setIsCategoryModalOpen(true)} 
    className="bg-green-500 text-white px-3 py-3 text-2xl rounded-full w-fit mx-2"
  >
    +
  </button>
</div>

<CategoryModal 
  isOpen={isCategoryModalOpen} 
  onClose={() => setIsCategoryModalOpen(false)} 
/>

                <div className="flex justify-between items-center">
  <select
    name="bankAccount"
    value={formData.bankAccount._id}
    onChange={handleInputChange}
    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
  >
    <option value="">انتخاب حساب بانکی</option>
    {banks.map((bank) => (
      <option key={bank._id} value={bank._id} className="flex justify-between items-center">
        {bank.name}({bank.cardNumber})
      </option>
    ))}
  </select>
  <button 
    type="button"
    onClick={() => setIsCardModalOpen(true)} 
    className="bg-green-500 text-white px-3 py-3 text-2xl rounded-full w-fit mx-2"
  >
    +
  </button>
</div>

<CardModal 
  isOpen={isCardModalOpen} 
  onClose={() => setIsCardModalOpen(false)} 
/>
                <div className="flex justify-between items-center">
  <select
    name="recipient"
    value={formData.recipient._id}
    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
    onChange={handleInputChange}
  >
    <option value="">انتخاب گیرنده</option>
    {recipients.map((recipient) => (
      <option key={recipient._id} value={recipient._id}>
        {recipient.name}
      </option>
    ))}
  </select>
  <button 
    type="button"
    onClick={() => setIsRecipientModalOpen(true)} 
    className="bg-green-500 text-white px-3 py-3 text-2xl rounded-full w-fit mx-2"
  >
    +
  </button>
</div>

<RecipientModal 
  isOpen={isRecipientModalOpen} 
  onClose={() => setIsRecipientModalOpen(false)} 
/>

              </div>

              {/* Full-width textarea and submit button */}
              <div className="lg:max-w-full mt-4">
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6 text-center lg:h-[80px] flex items-center justify-center ">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setFormData((prev) => ({
                            ...prev,
                            image: reader.result as string,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <div className="space-y-2 ">
                    <i className="fas fa-cloud-upload-alt text-2xl text-gray-400"></i>
                    <p className="text-sm text-gray-500">آپلود تصویر رسید</p>
                  </div>
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="توضیحات (اختیاری)"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all mb-5 "
                  rows={2}
                />

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`w-full lg:w-full lg:mx-auto block py-4 rounded-lg text-white font-medium shadow-lg ${transactionType === "incomes" ? "bg-green-500" : "bg-[#ff6961]"
                    }`}
                  onClick={handleSubmit}
                >
                  ثبت تراکنش
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Page;
