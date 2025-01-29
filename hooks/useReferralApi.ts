// hooks/useReferralApi.ts
'use client'
import { useState, useCallback } from 'react'
import { Referral } from '@/types/referral'

export const useReferralApi = () => {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRequest = async <T>(url: string, method: string, body?: any): Promise<T> => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'API request failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const getReferrals = useCallback(async () => {
    const data = await handleRequest<Referral[]>('/api/referrals', 'GET')
    setReferrals(data)
  }, [])

  const createReferral = useCallback(async (referral: Omit<Referral, 'id'>) => {
    const data = await handleRequest<Referral>('/api/referrals', 'POST', referral)
    setReferrals(prev => [...prev, data])
    return data
  }, [])

  const updateReferral = useCallback(async (referral: Referral) => {
    const data = await handleRequest<Referral>('/api/referrals', 'PUT', referral)
    setReferrals(prev => prev.map(r => r.id === data.id ? data : r))
    return data
  }, [])

  const deleteReferral = useCallback(async (id: string) => {
    await handleRequest('/api/referrals', 'DELETE', { id })
    setReferrals(prev => prev.filter(r => r.id !== id))
  }, [])

  return {
    referrals,
    isLoading,
    error,
    getReferrals,
    createReferral,
    updateReferral,
    deleteReferral,
  }
}