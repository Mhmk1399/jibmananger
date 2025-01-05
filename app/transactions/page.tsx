"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { rayBold } from "@/next-persian-fonts/ray";
import PriceInput from "../../components/priceInput";

const Page = () => {
  const [transactionType, setTransactionType] = useState<"income" | "outcome">(
    "income"
  );
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    bankAccount: "",
    description: "",
    transactionType: transactionType,
    image: "",
    recipient: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const cleanFormData = {
    ...formData,
    accountBalance: formData.amount.replace(/,/g, ""),
  };
  const formatNumber = (value: string) => {
    const numberOnly = value.replace(/\D/g, "");
    return numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      amount: formattedValue,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              onClick={() => setTransactionType("income")}
              className={`py-3 rounded-lg text-center ${
                transactionType === "income"
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-transparent text-gray-600"
              }`}
            >
              دریافتی
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setTransactionType("outcome")}
              className={`py-3 rounded-lg text-center ${
                transactionType === "outcome"
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
                />
              </div>

              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="">دسته‌بندی</option>
                <option value="salary">حقوق</option>
                <option value="food">غذا</option>
                <option value="transport">حمل و نقل</option>
                <option value="shopping">خرید</option>
                <option value="bills">قبوض</option>
              </select>

              <select
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option className="w-fit" value="">
                  انتخاب حساب بانکی
                </option>
                <option className="w-fit" value="melli">
                  بانک ملی
                </option>
                <option className="w-fit" value="mellat">
                  بانک ملت
                </option>
                <option className="w-fit" value="saderat">
                  بانک صادرات
                </option>
                <option className="w-fit" value="tejarat">
                  بانک تجارت
                </option>
              </select>
              <div className="space-y-4">
                <select
                  name="recipient"
                  value={formData.recipient}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  onChange={handleInputChange}
                >
                  <option value="">انتخاب گیرنده</option>
                  <option value="ali">علی</option>
                  <option value="reza">رضا</option>
                  <option value="sara">سارا</option>
                  <option value="maryam">مریم</option>
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
                className={`w-full lg:w-full lg:mx-auto block py-4 rounded-lg text-white font-medium shadow-lg ${
                  transactionType === "income" ? "bg-green-500" : "bg-[#ff6961]"
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
export default Page;
