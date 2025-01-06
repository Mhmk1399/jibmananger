'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

interface Recipient {
    _id: string
    name: string
    phoneNumber: number
  }
  

export default function ManageRecipients() {
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [editingRecipient, setEditingRecipient] = useState<Recipient | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    fetchRecipients()
  }, [])

  const fetchRecipients = async () => {
    try {
      const response = await fetch('/api/recipients', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      setRecipients(data.recipients)
    } catch (error) {
      toast.error('خطا در دریافت اطلاعات دریافت‌کنندگان')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/recipients/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          id: id
        }
      })
      if (response.ok) {
        toast.success('دریافت‌کننده با موفقیت حذف شد')
        fetchRecipients()
      }
    } catch (error) {
      toast.error('خطا در حذف دریافت‌کننده')
    }
  }

  const handleUpdate = async (recipient: Recipient) => {
    try {
      const response = await fetch(`/api/recipients/patch`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          id: recipient._id
        },
        body: JSON.stringify({
          name: recipient.name,
          phoneNumber: recipient.phoneNumber
        })
      })
      if (response.ok) {
        toast.success('دریافت‌کننده با موفقیت ویرایش شد')
        setIsEditModalOpen(false)
        fetchRecipients()
      }
    } catch (error) {
      toast.error('خطا در ویرایش دریافت‌کننده')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 mb-24" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">مدیریت دریافت‌کنندگان</h1>
      
      <div className="grid grid-cols-1 gap-4">
        {recipients.map((recipient) => (
          <motion.div
            key={recipient._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-md"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{recipient.name}</h3>
                <p className="text-gray-600">{recipient.phoneNumber}</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingRecipient(recipient)
                    setIsEditModalOpen(true)
                  }}
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  <PencilIcon className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(recipient._id)}
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
     {/* Edit Modal */}
{isEditModalOpen && editingRecipient && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="bg-white rounded-xl p-6 w-full max-w-md"
    >
      <h2 className="text-xl font-bold mb-4">ویرایش دریافت‌کننده</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleUpdate(editingRecipient)
        }}
        className="space-y-4"
      >
        <input
          type="text"
          value={editingRecipient.name}
          onChange={(e) => setEditingRecipient({...editingRecipient, name: e.target.value})}
          className="w-full p-2 border rounded-lg"
          placeholder="نام دریافت‌کننده"
        />
        <input
          type="text"
          value={editingRecipient.phoneNumber}
          onChange={(e) => setEditingRecipient({...editingRecipient, phoneNumber: Number(e.target.value)})}
          className="w-full p-2 border rounded-lg"
          placeholder="شماره تماس"
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
