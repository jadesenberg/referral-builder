'use client'
import { UseFormRegister, FieldError } from 'react-hook-form'
import { Referral } from '@/types/referral'

type InputProps = {
  label: string
  id: keyof Referral
  register: UseFormRegister<Referral>
  error?: FieldError
  type?: string
  className?: string
}

export const Input = ({
  label,
  id,
  register,
  error,
  type = 'text',
  className = ''
}: InputProps) => (
  <div className={className}>
    <label className="block text-sm font-medium mb-2">{label}</label>
    <input
      type={type}
      {...register(id)}
      className={`w-full px-3 py-2 border rounded-md ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
)