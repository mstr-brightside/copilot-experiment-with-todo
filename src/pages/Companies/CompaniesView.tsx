import { Company } from './api';

interface CompaniesViewProps {
  status: 'not_requested' | 'loading' | 'loaded' | 'error';
  companies: Company[] | null;
  error?: unknown;
}

export const CompaniesView = ({ status, companies, error }: CompaniesViewProps) => {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Companies List</h1>

      {status === 'loading' && <p>Loading...</p>}

      {status === 'error' && (
        <p className='text-red-500'>
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      )}

      {status === 'loaded' && companies && (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='py-2 px-4 border-b text-left'>Name</th>
                <th className='py-2 px-4 border-b text-left'>ITIN</th>
                <th className='py-2 px-4 border-b text-left'>Phone</th>
                <th className='py-2 px-4 border-b text-left'>Country</th>
                <th className='py-2 px-4 border-b text-left'>Email</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className='hover:bg-gray-50'>
                  <td className='py-2 px-4 border-b'>{company.companyName}</td>
                  <td className='py-2 px-4 border-b'>{company.companyITIN}</td>
                  <td className='py-2 px-4 border-b'>{company.phone}</td>
                  <td className='py-2 px-4 border-b'>{company.country}</td>
                  <td className='py-2 px-4 border-b'>{company.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {status === 'loaded' && (!companies || companies.length === 0) && <p>No companies found.</p>}
    </div>
  );
};
