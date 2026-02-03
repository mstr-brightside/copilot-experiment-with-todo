import { Company } from './api';

interface CompaniesViewProps {
  status: 'not_requested' | 'loading' | 'loaded' | 'error';
  companies: Company[] | null;
  error?: unknown;
}

export const CompaniesView = ({ status, companies, error }: CompaniesViewProps) => {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4 text-gray-100'>Companies List</h1>

      {status === 'loading' && <p className='text-gray-300'>Loading...</p>}

      {status === 'error' && (
        <p className='text-red-400'>
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      )}

      {status === 'loaded' && companies && companies.length > 0 && (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-gray-800 border border-gray-700'>
            <thead>
              <tr className='bg-gray-700'>
                <th className='py-2 px-4 border-b border-gray-600 text-left text-gray-100'>Name</th>
                <th className='py-2 px-4 border-b border-gray-600 text-left text-gray-100'>ITIN</th>
                <th className='py-2 px-4 border-b border-gray-600 text-left text-gray-100'>Phone</th>
                <th className='py-2 px-4 border-b border-gray-600 text-left text-gray-100'>Country</th>
                <th className='py-2 px-4 border-b border-gray-600 text-left text-gray-100'>Email</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className='hover:bg-gray-700 text-gray-200'>
                  <td className='py-2 px-4 border-b border-gray-700'>{company.companyName}</td>
                  <td className='py-2 px-4 border-b border-gray-700'>{company.companyITIN}</td>
                  <td className='py-2 px-4 border-b border-gray-700'>{company.phone}</td>
                  <td className='py-2 px-4 border-b border-gray-700'>{company.country}</td>
                  <td className='py-2 px-4 border-b border-gray-700'>{company.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {status === 'loaded' && (!companies || companies.length === 0) && <p className='text-gray-300'>No companies found.</p>}
    </div>
  );
};
