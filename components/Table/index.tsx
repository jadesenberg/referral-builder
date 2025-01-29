'use client'
import { Referral } from '@/types/referral'

export const ReferralTable = ({
  referrals,
  onEdit,
  onDelete,
}: {
  referrals: Referral[]
  onEdit: (referral: Referral) => void
  onDelete: (id: string) => void
}) => {
  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">GIVEN NAME</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SURNAME</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">EMAIL</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">PHONE</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {referrals.map((referral) => (
            <tr key={referral.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {referral.givenName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {referral.surname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {referral.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {referral.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm space-x-4">
                <button
                  onClick={() => onEdit(referral)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(referral.id!)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}