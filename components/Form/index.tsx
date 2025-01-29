// components/ReferralForm.tsx
'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { referralSchema } from '@/schemas/referral'
import { useEffect } from 'react'
import { ReferralTable } from '@/components/Table'
import { useReferralApi } from '@/hooks/useReferralApi'
import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Button'
import { Referral } from '@/types/referral'

const defaultValues = {
    id: '',
    givenName: '',
    surname: '',
    email: '',
    phone: '',
    homeName: '',
    street: '',
    suburb: '',
    state: '',
    postCode: '',
    country: ''
}

export default function ReferralForm() {
  const [selectedReferral, setSelectedReferral] = useState('');
  const {
    referrals,
    isLoading,
    error,
    getReferrals,
    createReferral,
    updateReferral,
    deleteReferral
  } = useReferralApi()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Referral>({
    resolver: zodResolver(referralSchema),
    defaultValues
  })

  useEffect(() => {
    getReferrals()
  }, [getReferrals])

  const onSubmit = async (data: Referral) => {
    const referral = {
        ...data,
        id: selectedReferral
    }
    try {
      if (selectedReferral) {
        await updateReferral(referral)
        reset(referral)
      } else {
        setSelectedReferral("")
        reset(defaultValues)
        await createReferral(data)
      }
    } catch (err) {
      console.error('Submission error:', err)
    }
  }

  const handleEdit = (referral: Referral) => {
    setSelectedReferral(referral?.id ?? "")
    reset(referral)
  }

  const handleDelete = (id: string) => {
    deleteReferral(id)
    reset(defaultValues)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Referral Builder</h1>

      <div className="space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide">PERSONAL DETAILS</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="GIVEN NAME"
              id="givenName"
              register={register}
              error={errors.givenName}
              className="uppercase"
            />
            <Input
              label="SURNAME"
              id="surname"
              register={register}
              error={errors.surname}
              className="uppercase"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="EMAIL"
              id="email"
              type="email"
              register={register}
              error={errors.email}
              className="uppercase"
            />
            <Input
              label="PHONE"
              id="phone"
              type="tel"
              register={register}
              error={errors.phone}
              className="uppercase"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide">ADDRESS</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="HOME NAME OR #"
              id="homeName"
              register={register}
              error={errors.homeName}
              className="uppercase"
            />
            <Input
              label="STREET"
              id="street"
              register={register}
              error={errors.street}
              className="uppercase"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="SUBURB"
              id="suburb"
              register={register}
              error={errors.suburb}
              className="uppercase"
            />
            <Input
              label="STATE"
              id="state"
              register={register}
              error={errors.state}
              className="uppercase"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="POSTCODE"
              id="postCode"
              register={register}
              error={errors.postCode}
              className="uppercase"
            />
            <Input
              label="COUNTRY"
              id="country"
              register={register}
              error={errors.country}
              className="uppercase"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center ">
        <Button
          type="button"
          variant="secondary"
          onClick={() => console.log('Upload avatar')}
        >
          UPLOAD AVATAR
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {selectedReferral ? 'UPDATE REFERRAL' : 'CREATE REFERRAL'}
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <ReferralTable
        referrals={referrals}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}