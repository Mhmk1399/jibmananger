'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import bankmeli from '@/public/images/kisspng-bank-melli-iran-mobile-banking-bank-maskan-financi-5b046999eee5f8.5371391515270158339785.png'
import banksepah from '@/public/images/kisspng-bank-sepah-mobile-banking-deposit-account-iranian-sepah-5b0fcba1557738.5382741215277618253501.png'
import post from '@/public/images/postbank.webp'
import tose from '@/public/images/tosee.png'
import sanat from '@/public/images/sanatmadn.png'
import eghtesad from '@/public/images/EnbankNewLog-100x18.png'
import parsian from '@/public/images/bank-parsian-logo-512.png'
import pasargad from '@/public/images/Bank_Pasargad_logo.png'
import karafarin from '@/public/images/Karafarin_Bank.png'
import saman from '@/public/images/Saman bank logo Vector.png'
import tejarat from '@/public/images/1398708899_tejarat-mobile-bank-logo.png'
import maskan from '@/public/images/kisspng-bank-maskan-bank-mellat-mobile-banking-maskan-bank-5b1f42e1f2ee91.6989961015287753939951.png'
import sarmayeh from '@/public/images/Sarmayeh_Bank_Logo.png'
import sina from '@/public/images/bank sina.jpg'
import melat from '@/public/images/Bank_Mellat_Logo.svg'
import iranzamin from '@/public/images/Iranzamin-logo.svg'
import ayande from '@/public/images/Ayandeh_Bank_Logo.svg'
import saderat from '@/public/images/kisspng-bank-saderat-iran-banking-and-insurance-in-iran-ce-iran-5ac214cec60a29.5125036015226687508112.png'
import refah from '@/public/images/Refah-Bank-Logo-1.png'
import ansar from '@/public/images/ansar-logo.png'
import dey from '@/public/images/Daybank.png'
import keshavarzi from '@/public/images/keshavarzi.png'
import mehr from '@/public/images/mehr-bank-logo-512.png'
import gavamin from '@/public/images/Ghavamin_logo.svg.png'
import shahr from '@/public/images/shahr-bank-logo-512.png'
import gardesh from '@/public/images/gardeshgari-bank-logo-512.png'
import CardInput from '@/components/CardInput'
import Image from 'next/image'

interface Bank {
    _id: string
    name: string
    cardNumber: string
    cvv2: string
    expiryDate: string
    shabaNumber: string
    AccountBalance: number
  }

export default function ManageCards() {
    const BANK_INFO = {
        '603799': { name: 'بانک ملی ایران', value: 'meli', color: '#008752', logo: bankmeli.src },
        '589210': { name: 'بانک سپه', value: 'sepah', color: '#0066FF', logo: banksepah.src },
        '627412': { name: 'بانک اقتصاد نوین', value: 'eghtesad', color: '#b42234', logo: eghtesad.src },
        '207177': { name: 'بانک توسعه صادرات ایران', value: 'saderat', color: '#233861', logo: saderat.src },
        '627381': { name: 'بانک انصار', value: 'ansar', color: '#007749', logo: ansar.src },
        '502229': { name: 'بانک پاسارگاد', value: 'pasargad', color: '#8c198b', logo: pasargad.src },
        '505785': { name: 'بانک ایران زمین', value: 'iranzamin', color: '#007749', logo: iranzamin.src },
        '502806': { name: 'بانک شهر', value: 'shahr', color: '#004B8D', logo: shahr.src },
        '622106': { name: 'بانک پارسیان', value: 'parsian', color: '#8c198b', logo: parsian.src },
        '639194': { name: 'بانک پارسیان', value: 'parsian', color: '#8c198b', logo: parsian.src },
        '627884': { name: 'بانک پارسیان', value: 'parsian', color: '#8c198b', logo: parsian.src },
        '502908': { name: 'بانک توسعه تعاون', value: 'tosee', color: '#8c198b', logo: tose.src },
        '502910': { name: 'بانک کارآفرین', value: 'karafarin', color: '#8c198b', logo: karafarin.src },
        '502938': { name: 'بانک دی', value: 'dey', color: '#004B8D', logo: dey.src },
        '639347': { name: 'بانک پاسارگاد', value: 'pasargad', color: '#8c198b', logo: pasargad.src },
        '505416': { name: 'بانک گردشگری', value: 'gardeshgari', color: '#004B8D', logo: gardesh.src },
        '636214': { name: 'بانک تات', value: 'ayandeh', color: '#0066A4', logo: ayande.src },
        '627353': { name: 'بانک تجارت', value: 'tejarat', color: '#2F4F9E', logo: tejarat.src },
        '589463': { name: 'بانک رفاه کارگران', value: 'refah', color: '#E5970D', logo: refah.src },
        '627648': { name: 'بانک توسعه صادرات ایران', value: 'saderat', color: '#233861', logo: saderat.src },
        '603769': { name: 'بانک صادرات ایران', value: 'saderat', color: '#0c1d63', logo: saderat.src },
        '603770': { name: 'بانک کشاورزی', value: 'keshavarzi', color: '#004B8D', logo: keshavarzi.src },
        '606373': { name: 'بانک قرض الحسنه مهر ایران', value: 'mehr', color: '#004B8D', logo: mehr.src },
        '621986': { name: 'بانک سامان', value: 'saman', color: '#8c198b', logo: saman.src },
        '639607': { name: 'بانک سرمایه', value: 'sarmayeh', color: '#004B8D', logo: sarmayeh.src },
        '639346': { name: 'بانک سینا', value: 'sina', color: '#8c198b', logo: sina.src },
        '627961': { name: 'بانک صنعت و معدن', value: 'sanat', color: '#233861', logo: sanat.src },
        '639599': { name: 'بانک قوامین', value: 'ghavamin', color: '#004B8D', logo: gavamin.src },
        '627488': { name: 'بانک کارآفرین', value: 'karafarin', color: '#8c198b', logo: karafarin.src },
        '639217': { name: 'بانک کشاورزی', value: 'keshavarzi', color: '#004B8D', logo: keshavarzi.src },
        '628023': { name: 'بانک مسکن', value: 'maskan', color: '#e84511', logo: maskan.src },
        '991975': { name: 'بانک ملت', value: 'mellat', color: '#DD0033', logo: melat.src },
        '610433': { name: 'بانک ملت', value: 'mellat', color: '#DD0033', logo: melat.src },
        '639370': { name: 'بانک مهر اقتصاد', value: 'mehr', color: '#004B8D', logo: mehr.src },
        '627760': { name: 'پست بانک ایران', value: 'post', color: '#046904', logo: post.src },
      };
  const [banks, setBanks] = useState<Bank[]>([])
  const [editingBank, setEditingBank] = useState<Bank | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    fetchBanks()
  }, [])

  const fetchBanks = async () => {
    try {
      const response = await fetch('/api/banks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      setBanks(data)
      console.log(data);
      
    } catch (error) {
      console.error(error)
      toast.error('خطا در دریافت اطلاعات کارت‌ها')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/banks/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          id:id
        }
        
      })
      if (response.ok) {
        toast.success('کارت با موفقیت حذف شد')
        fetchBanks()
      }
    } catch (error) {
      console.error(error)
      toast.error('خطا در حذف کارت')
    }
  }
  
  const handleUpdate = async (bank: Bank) => {
    try {
      const response = await fetch(`/api/banks/patch`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          id: bank._id
        },
        body: JSON.stringify({
          name: bank.name,
          cardNumber: bank.cardNumber,
          cvv2: bank.cvv2,
          expiryDate: bank.expiryDate,
          shabaNumber: bank.shabaNumber,
          AccountBalance: bank.AccountBalance
        })
      })
      if (response.ok) {
        toast.success('کارت با موفقیت ویرایش شد')
        setIsEditModalOpen(false)
        fetchBanks()
      }
    } catch (error) {
      console.error(error)
      toast.error('خطا در ویرایش کارت')
    }
  }
  
  const getBankInfo = (cardNumber: string) => {
    const prefix = cardNumber.replace(/\s/g, '').substring(0, 6)
    return BANK_INFO[prefix as keyof typeof BANK_INFO]
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 mb-24" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">مدیریت کارت‌ها</h1>
      
      <div className="grid grid-cols-1 gap-4">
        {banks.map((bank) => {
          const bankInfo = getBankInfo(bank.cardNumber)
          return (
            <motion.div
              key={bank._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow-md"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {bankInfo && (
                    <Image
                    width={40}
                    height={40}
                      src={bankInfo.logo}
                      alt={bankInfo.name}
                      className="w-10 h-10 object-contain"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {bankInfo ? bankInfo.name : ''}
                      ({bank.name})

                    </h3>
                    <p className="text-gray-600 mt-1  text-right " dir='ltr'>
                      {bank.cardNumber.replace(/(\d{4})/g, '$1 ')}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingBank(bank)
                      setIsEditModalOpen(true)
                    }}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                  >
                    <PencilIcon className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(bank._id)}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingBank && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">ویرایش کارت</h2>
            <form
  onSubmit={(e) => {
    e.preventDefault()
    handleUpdate(editingBank)
  }}
  className="space-y-4"
>
  <div className="relative">
    <CardInput
      value={editingBank.cardNumber}
      onChange={(e) => setEditingBank({...editingBank, cardNumber: e.target.value})}
    />
  </div>
  <input
    type="text"
    value={editingBank.name}
    onChange={(e) => setEditingBank({...editingBank, name: e.target.value})}
    className="w-full p-2 border rounded-lg"
    placeholder="نام صاحب کارت"
  />
  <div className="grid grid-cols-2 gap-4">
    <input
      type="text"
      value={editingBank.cvv2}
      onChange={(e) => setEditingBank({...editingBank, cvv2: e.target.value})}
      className="w-full p-2 border rounded-lg"
      placeholder="CVV2"
      maxLength={4}
    />
    <input
      type="text"
      value={editingBank.expiryDate}
      onChange={(e) => setEditingBank({...editingBank, expiryDate: e.target.value})}
      className="w-full p-2 border rounded-lg"
      placeholder="تاریخ انقضا"
    />
  </div>
  <input
    type="text"
    value={editingBank.shabaNumber}
    onChange={(e) => setEditingBank({...editingBank, shabaNumber: e.target.value})}
    className="w-full p-2 border rounded-lg"
    placeholder="شماره شبا"
  />
  <input
    type="number"
    value={editingBank.AccountBalance}
    onChange={(e) => setEditingBank({...editingBank, AccountBalance: Number(e.target.value)})}
    className="w-full p-2 border rounded-lg"
    placeholder="موجودی"
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
