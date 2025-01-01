'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { rayBold } from '@/next-persian-fonts/ray'

 const Page = () => {
    const [transactionType, setTransactionType] = useState<'income' | 'outcome'>('income')
    const [formData, setFormData] = useState({
      amount: '',
      category: '',
      bankAccount: '',
      description: ''
    })
  
    const formatNumber = (value: string) => {
      const numberOnly = value.replace(/\D/g, '')
      return numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatNumber(e.target.value)
      setFormData(prev => ({
        ...prev,
        amount: formattedValue
      }))
    }
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
            

  return (
    <div className={`${rayBold.variable} font-ray min-h-screen bg-white p-4`} dir="rtl">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">ثبت تراکنش جدید</h1>
        
        <div className="bg-gray-100 p-1 rounded-xl mb-6">
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setTransactionType('income')}
              className={`py-3 rounded-lg text-center ${
                transactionType === 'income' 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'bg-transparent text-gray-600'
              }`}
            >
              دریافتی
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setTransactionType('outcome')} 
              className={`py-3 rounded-lg text-center ${
                transactionType === 'outcome'
                  ? 'bg-[#ff6961] text-white shadow-lg'
                  : 'bg-transparent text-gray-600'
              }`}
            >
              پرداختی
            </motion.button>
          </div>
        </div>

        <form className="space-y-4">
        <div className="relative">
          <input
            type="text"
            name="amount"
            inputMode="numeric"
            placeholder="مبلغ"
            value={formData.amount}
            onChange={handleAmountChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-right"
          />
          <span className="absolute left-4 top-3 text-gray-400">تومان</span>
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
            <option className='w-fit' value="">انتخاب حساب بانکی</option>
            <option className='w-fit' value="melli">بانک ملی</option>
            <option className='w-fit' value="mellat">بانک ملت</option>
            <option className='w-fit' value="saderat">بانک صادرات</option>
            <option className='w-fit' value="tejarat">بانک تجارت</option>
          </select>

          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0"
            />
            <div className="space-y-2">
              <i className="fas fa-cloud-upload-alt text-2xl text-gray-400"></i>
              <p className="text-sm text-gray-500">آپلود تصویر رسید</p>
            </div>
          </div>

          <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="توضیحات (اختیاری)"
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          rows={3}
        />

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full py-4 rounded-lg text-white font-medium shadow-lg ${
              transactionType === 'income' ? 'bg-green-500' : 'bg-[#ff6961]'
            }`}
          >
            ثبت تراکنش
          </motion.button>
        </form>
      </div>
    </div>
  )
}
    export default Page
