import { z } from 'zod';

export const getValidationSchema = () => {
  return z.object({
    companyName: z.string().min(2, 'Company Name must be at least 2 characters'),
    companyITIN: z.number({ error: 'Company ITIN must be a number' }),
    phone: z.number({ error: 'Phone must be a number' }),
    country: z.string().min(2, 'Country must be at least 2 characters'),
    email: z.email('Invalid email'),
  });
};
