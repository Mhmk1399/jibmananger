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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchRecipients()
  }, [])
  const RecipientModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-xl w-[90%] max-w-2xl h-[80vh] overflow-hidden"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-bold">افزودن گیرنده جدید</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          <iframe src="/addRecipient" className="w-full h-[calc(100%-60px)]" />
        </motion.div>
      </motion.div>
    );
  };
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
      console.error('Error fetching recipients:', error)
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
      console.error('Error deleting recipient:', error)
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
      console.error('Error updating recipient:', error)
      toast.error('خطا در ویرایش دریافت‌کننده')
    }
  }

  return (
    <div className="min-h-screen bg-purple-50 p-4 mb-24" dir="rtl">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800  ">مدیریت دریافت‌کنندگان</h1>
  <button
    onClick={() => setIsAddModalOpen(true)}
    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
  >
    افزودن+ 
  </button>
</div>
<RecipientModal 
  isOpen={isAddModalOpen}
  onClose={() => {
    setIsAddModalOpen(false);
    fetchRecipients(); // Refresh the list after adding
  }}
/>
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
