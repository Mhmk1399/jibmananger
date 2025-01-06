'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import CardInput from '../../components/CardInput'
import { rayBold } from '@/next-persian-fonts/ray'

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    cvv2: '',
    expiryDate: '',
    shabaNumber: '',
    recipientName: '',
    recipientPhoneNumber: '',
  })


  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim()
    setFormData(prev => ({ ...prev, cardNumber: value }))

    // Detect bank
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const cleanFormData = {
      ...formData,
      cardNumber: formData.cardNumber.replace(/\s/g, '')
    }
    console.log(cleanFormData);

    try {
      const response = await fetch('/api/recipients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(cleanFormData)
      })
      if (response.ok) {
        setFormData({
          name: '',
          cardNumber: '',
          cvv2: '',
          expiryDate: '',
          shabaNumber: '',
          recipientName: '',
          recipientPhoneNumber: '',
        })
      }
    } catch (error) {
      console.error('Error adding recipient:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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
    <div className={`${rayBold.variable} font-ray  bg-white w-full mt-5 mb-20`} dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-2 lg:mb-10 text-center">افزودن گیرنده</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl p-6">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="نام بانک"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
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
                maxLength={24}
                value={formData.shabaNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3  rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              {formData.shabaNumber && <span className="absolute left-2 top-3 text-lg text-gray-400">IR</span>}

            </div>
            <input
              type="text"
              name="recipientName"
              placeholder="نام گیرنده"
              value={formData.recipientName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />

            <input
              type="phone"
              name="recipientPhoneNumber"
              placeholder="شماره همراه گیرنده"
              value={formData.recipientPhoneNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-4 rounded-lg text-white font-medium shadow-lg bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            ثبت اطلاعات بانکی
          </motion.button>
        </form>
      </div>
    </div>
  )
}

export default Page
