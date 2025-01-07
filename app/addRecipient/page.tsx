'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { rayBold } from '@/next-persian-fonts/ray'

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  })



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    

    try {
      const response = await fetch('/api/recipients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setFormData({
          name: '',
          phoneNumber: '',
        })
      }
    } catch (error) {
      console.log('Error adding recipient:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  setFormData({
    ...formData,
    [name]: value
  })
  }

 

  return (
    <div className={`${rayBold.variable} font-ray  bg-white w-full mt-5 mb-20`} dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-2 lg:mb-10 text-center">افزودن گیرنده</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl p-6">
          <div className="space-y-4">
          

            <div className="grid grid-cols-2 gap-4">
            
             
            </div>
            <div className='relative'>
              
            </div>
            <input
              type="text"
              name="name"
              placeholder="نام گیرنده"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />

            <input
              type="phone"
              name="phoneNumber"
              placeholder="شماره همراه گیرنده"
              value={formData.phoneNumber}
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
