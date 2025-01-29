import { z } from 'zod'

export const referralSchema = z.object({
  givenName: z.string()
    .min(2, { message: 'Must be at least 2 characters' })
    .max(50, { message: 'Maximum 50 characters' }),
  surname: z.string()
    .min(2, { message: 'Must be at least 2 characters' })
    .max(50, { message: 'Maximum 50 characters' }),
  email: z.string()
    .email({ message: 'Invalid email address' }),
  phone: z.string()
    .min(8, { message: 'Must be at least 8 digits' })
    .regex(/^\d+$/, { message: 'Must contain only numbers' }),
  homeName: z.string()
    .min(2, { message: 'Must be at least 2 characters' }),
  street: z.string()
    .min(5, { message: 'Must be at least 5 characters' }),
  suburb: z.string()
    .min(2, { message: 'Must be at least 2 characters' }),
  state: z.string()
    .length(3, { message: 'Must be exactly 3 characters' }),
  postCode: z.string()
    .length(4, { message: 'Must be exactly 4 digits' })
    .regex(/^\d+$/, { message: 'Must contain only numbers' }),
  country: z.string()
    .min(2, { message: 'Must be at least 2 characters' }),
})