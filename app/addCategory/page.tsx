'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { rayBold } from '@/next-persian-fonts/ray'
import { toast } from 'react-hot-toast'

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    color: '#000000'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/categories', {
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
          color: '#000000'
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('خطا در ثبت دسته‌بندی', {
        style: {
          direction: 'rtl',
          backgroundColor: '#EF4444',
          color: 'white'
        }
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className={`${rayBold.variable} font-ray bg-white w-full mt-5 mb-20`} dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-2 lg:mb-10 text-center">
          افزودن دسته‌بندی جدید
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl p-6">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="نام دسته‌بندی"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
            
            <div className="flex items-center gap-4 rounded-full">
            <span className="text-gray-600 ">انتخاب رنگ دسته‌بندی</span>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-10 h-10  rounded-lg cursor-pointer"
              />
             
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-4 rounded-lg text-white font-medium shadow-lg bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            ثبت دسته‌بندی
          </motion.button>
        </form>
      </div>
    </div>
  )
}

export default Page
