import { NextResponse } from 'next/server'
import { Referral } from '@/types/referral'

let referrals: Referral[] = [
  {
    id: '123',
    givenName: 'Jade',
    surname: 'Bautista',
    email: 'edaj.bautista@gmail.com',
    phone: '1234567890',
    homeName: 'Test',
    street: 'Test Street',
    suburb: 'Test',
    state: '123',
    postCode: '1234',
    country: 'PH'
}
]

export async function GET() {
  return NextResponse.json(referrals)
}

export async function POST(request: Request) {
  const data = await request.json()
  const newReferral: Referral = {
    id: Date.now().toString(),
    ...data,
  }
  referrals.push(newReferral)
  return NextResponse.json(newReferral)
}

export async function PUT(request: Request) {
  const data: Referral = await request.json()
  referrals = referrals.map(r => r.id === data.id ? data : r)
  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  referrals = referrals.filter(r => r.id !== id)
  return NextResponse.json({ success: true })
}