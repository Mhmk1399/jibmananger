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
}


const Page = () => {
  const [transactionType, setTransactionType] = useState<"incomes" | "outcomes">(
    "incomes"
  );
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    amount: "",
    category: {
      _id: "",
      name: "",
      color: "",
      user: "",
    },
    bankAccount: "123456789",
    description: "",
    transactionType: transactionType,
    image: "",
    recipient: {
      _id: "",
      name: "",
      phoneNumber: ""
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
      // Convert amount string "1,234,567" to number 1234567
      const numericAmount = Number(formData.amount.replace(/,/g, ''));
      
      const transactionData = {
        ...formData,
        amount: numericAmount
      };
      
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
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/recipients', {
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
        const response = await fetch('http://localhost:3000/api/categories', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories);
          
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    const fetchBanks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/banks', {
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
    const loading = async () => {
      await fetchCategories();
      await fetchRecipients();
      await fetchBanks();
      setLoading(false);
    }
    loading();
  }, []);

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
        user: selectedRecipient?._id || "",
        name: selectedRecipient?.name || "",
        phoneNumber: selectedRecipient?.phoneNumber || "",
        _id: selectedRecipient?._id || ""
      }
    }));
  }
  else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
};

  if (loading) {
    return <LoadingComponent />;
  }
  if (!loading) {
    return (
      <div
        className={`${rayBold.variable} font-ray min-h-screen bg-white p-4 lg:p-8 w-full mb-20`}
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

                <select
                  name="bankAccount"
                  value={formData.bankAccount}
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
                <div className="space-y-4">
                  <select
                    name="recipient"
                    value={formData.recipient._id}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    onChange={handleInputChange}
                  >
                    <option value="">انتخاب گیرنده</option>
                    {recipients.map((recipient) => (
                      <option key={recipient._id} value={recipient._id} >
                        {recipient.name},({recipient.phoneNumber})
                      </option>
                    ))}
                  </select>

                </div>
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
  };
}
export default Page;
