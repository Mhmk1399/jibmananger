'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

interface Category {
  _id: string
  name: string
  color: string
}

export default function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      setCategories(data.categories)
    } catch (error) {
      console.error(error)
      toast.error('خطا در دریافت دسته‌بندی‌ها')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          id: id
        }
      })
      if (response.ok) {
        toast.success('دسته‌بندی با موفقیت حذف شد')
        fetchCategories()
      }
    } catch (error) {
      console.error(error)
      toast.error('خطا در حذف دسته‌بندی')
    }
  }

  const handleUpdate = async (category: Category) => {
    try {
      const response = await fetch(`/api/categories/patch`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          id: category._id
        },
        body: JSON.stringify({
          name: category.name,
          color: category.color
        })
      })
      if (response.ok) {
        toast.success('دسته‌بندی با موفقیت ویرایش شد')
        setIsEditModalOpen(false)
        fetchCategories()
      }
    } catch (error) {
      console.error(error)
      toast.error('خطا در ویرایش دسته‌بندی')
    }
  }

  return (
    <div className="min-h-screen bg-purple-50 p-4 mb-24" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">مدیریت دسته‌بندی‌ها</h1>

      <div className="grid grid-cols-1 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-md"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingCategory(category)
                    setIsEditModalOpen(true)
                  }}
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  <PencilIcon className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                >
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">ویرایش دسته‌بندی</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleUpdate(editingCategory)
              }}
              className="space-y-4"
            >
              <input
                type="text"
                value={editingCategory.name}
                onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                className="w-full p-2 border rounded-lg"
                placeholder="نام دسته‌بندی"
              />
              <input
                type="color"
                value={editingCategory.color}
                onChange={(e) => setEditingCategory({...editingCategory, color: e.target.value})}
                className="w-full h-12 p-1 border rounded-lg"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  ذخیره
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                >
                  انصراف
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
