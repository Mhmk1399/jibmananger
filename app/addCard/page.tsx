
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import PriceInput from '../../components/priceInput'
import CardInput from '../../components/CardInput'
import { rayBold } from '@/next-persian-fonts/ray'
import { toast } from 'react-hot-toast'




const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    AccountBalance: 0, // Change to number type
    cardNumber: '',
    cvv2: '',
    expiryDate: '',
    shabaNumber: '',
  })


  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim()
    setFormData(prev => ({ ...prev, cardNumber: value }))

    // Detect bank
  }

  // Add a specific handler for AccountBalance
  const handleAccountBalanceChange = (value: string) => {
    // Remove commas and convert to number
    const numericValue = parseInt(value.replace(/,/g, '')) || 0
    setFormData(prev => ({
      ...prev,
      AccountBalance: numericValue
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const cleanFormData = {
      ...formData,
      
      AccountBalance: Number(formData.AccountBalance),
      cardNumber: formData.cardNumber.replace(/\s/g, '')
    }

    try {
      const response = await fetch('/api/banks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(cleanFormData)
      })
      if (response.ok) {
        toast.success('دسته‌بندی با موفقیت اضافه شد', {
          style: {
            direction: 'rtl',
            backgroundColor: '#10B981',
            color: 'white'
          }
        })
          setFormData({
          name: '',
          AccountBalance: 0,
          cardNumber: '',
          cvv2: '',
          expiryDate: '',
          shabaNumber: ''
        })
      } else {
        // Add this else block to handle non-ok responses
        const errorData = await response.json()
        toast.error(errorData.message || 'خطا در ثبت دسته‌بندی', {
          style: {
            direction: 'rtl',
            backgroundColor: '#EF4444',
            color: 'white'
          }
        })
      }
    } catch (error) {
      // Improve error handling by showing the actual error
      const errorMessage = error instanceof Error ? error.message : 'خطا در ثبت دسته‌بندی'
      toast.error(errorMessage, {
        style: {
          direction: 'rtl',
          backgroundColor: '#EF4444',
          color: 'white'
        }
      })
      console.error('Category creation error:', error)
    }
  }


  // Update the handleInputChange function to handle account balance formatting
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "AccountBalance") {
      // Remove any non-digit characters except commas
      const cleanValue = value.replace(/[^\d,]/g, '');
      handleAccountBalanceChange(cleanValue);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 4) {
      const formattedValue = value.replace(/(\d{2})(\d{2})/, '$1/$2')
      setFormData(prev => ({
        ...prev,
        expiryDate: formattedValue
      }))
    }
  }



  return (
    <div className={`${rayBold.variable} font-ray min-h-screen bg-purple-50 w-full pt-5 pb-20`} dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-6 lg:mb-10 text-center">افزودن حساب بانکی</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-purple-50 rounded-xl p-6">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="نام بانک"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />

            <div className="relative lg:mt-4">
            <PriceInput
              value={formData.AccountBalance.toString()}
              onChange={(e) => handleAccountBalanceChange(e.target.value)}
              name="موجودی حساب"
            />

            </div>

            <div className="relative">
              <CardInput value={formData.cardNumber} onChange={handleCardNumberChange} />

            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="cvv2"
                placeholder="CVV2"
                value={formData.cvv2}
                onChange={handleInputChange}
                maxLength={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />

              <input
                type="text"
                name="expiryDate"
                placeholder="تاریخ انقضا (ماه/سال)"
                value={formData.expiryDate}
                onChange={handleExpiryDateChange}
                maxLength={5}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />

            </div>

            <div className='relative'>
              <input
                type="number"
                name="shabaNumber"
                placeholder="شماره شبا"
                value={formData.shabaNumber}
                onChange={handleInputChange}
                maxLength={24}
                className="w-full px-4 py-3  rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              {formData.shabaNumber && <span className="absolute left-2 top-3 text-lg text-gray-400">IR</span>}

            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-4 rounded-lg text-white font-medium shadow-lg bg-purple-500 hover:bg-purple-600 transition-colors"
          >
            ثبت اطلاعات بانکی
          </motion.button>
        </form>
      </div>
    </div>
  )
}
export default Page;
