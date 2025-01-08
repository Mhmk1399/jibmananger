'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { rayBold } from '@/next-persian-fonts/ray'
import { toast } from 'react-hot-toast'
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
        toast.success('دسته‌بندی با موفقیت اضافه شد', {
          style: {
            direction: 'rtl',
            backgroundColor: '#10B981',
            color: 'white'
          }
        })
       setFormData({
          name: '',
          phoneNumber: ''
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  setFormData({
    ...formData,
    [name]: value
  })
  }

 

  return (
    <div className={`${rayBold.variable} font-ray bg-purple-50 w-full pt-5 pb-20`} dir="rtl">
      <div className="max-w-3xl mx-auto">


        <form onSubmit={handleSubmit} className="space-y-4 bg-purple-50 rounded-xl p-6">
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
            className="w-full py-4 rounded-lg text-white font-medium shadow-lg bg-purple-500 hover:bg-purple-600 transition-colors"
          >
            ثبت اطلاعات بانکی
          </motion.button>
        </form>
      </div>
    </div>
  )
}

export default Page
