'use client'
import { ChangeEvent } from 'react'

interface BalanceInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const PriceInput = ({ value, onChange }: BalanceInputProps) => {
  return (
    <div className="relative lg:mt-4">
      <input
      dir=''
        type="text"
        name="accountBalance"
        inputMode="numeric"
        placeholder="مبلغ"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-left"
      />
      <span className="absolute right-4 top-3 text-gray-400">تومان</span>
    </div>
  )
}

export default PriceInput
