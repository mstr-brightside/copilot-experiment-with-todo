import type { ChangeEvent } from 'react';

import { CreateCompanyDTO } from './api';

interface AddCompanyViewProps {
  values: CreateCompanyDTO;
  errors: Partial<Record<keyof CreateCompanyDTO, string>>;
  touched: Partial<Record<keyof CreateCompanyDTO, boolean>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  status: string;
  setFieldValue: (field: string, value: string | number, shouldValidate?: boolean) => void;
}

export const AddCompanyView = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  isSubmitting,
  status,
  setFieldValue,
}: AddCompanyViewProps) => {
  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Add New Company</h1>

      {status === 'error' && <p className='text-red-500 mb-4'>An error occurred.</p>}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='companyName' className='block text-sm font-medium text-gray-700'>
            Company Name
          </label>
          <input
            name='companyName'
            id='companyName'
            value={values.companyName}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
          />
          {touched.companyName && errors.companyName && (
            <p className='text-red-500 text-sm'>{errors.companyName}</p>
          )}
        </div>

        <div>
          <label htmlFor='companyITIN' className='block text-sm font-medium text-gray-700'>
            Company ITIN (Number)
          </label>
          <input
            type='number'
            name='companyITIN'
            id='companyITIN'
            value={values.companyITIN}
            onChange={(e) => setFieldValue('companyITIN', Number(e.target.value))}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
          />
          {touched.companyITIN && errors.companyITIN && (
            <p className='text-red-500 text-sm'>{errors.companyITIN}</p>
          )}
        </div>

        <div>
          <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
            Phone (Number)
          </label>
          <input
            type='number'
            name='phone'
            id='phone'
            value={values.phone}
            onChange={(e) => setFieldValue('phone', Number(e.target.value))}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
          />
          {touched.phone && errors.phone && <p className='text-red-500 text-sm'>{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor='country' className='block text-sm font-medium text-gray-700'>
            Country
          </label>
          <input
            name='country'
            id='country'
            value={values.country}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
          />
          {touched.country && errors.country && (
            <p className='text-red-500 text-sm'>{errors.country}</p>
          )}
        </div>

        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            name='email'
            id='email'
            value={values.email}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
          />
          {touched.email && errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
        </div>

        <button
          type='submit'
          disabled={isSubmitting || status === 'loading'}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400'
        >
          {status === 'loading' ? 'Saving...' : 'Create Company'}
        </button>
      </form>
    </div>
  );
};
