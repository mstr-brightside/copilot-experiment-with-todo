import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className='min-h-screen bg-gray-900'>
      <nav className='flex gap-4 p-4 border-b border-gray-700 bg-gray-800'>
        <Link to='/' className='underline text-blue-400 hover:text-blue-300'>
          Home
        </Link>
        <Link to='/about' className='underline text-blue-400 hover:text-blue-300'>
          About
        </Link>
        <Link to='/companies' className='underline text-blue-400 hover:text-blue-300'>
          Companies
        </Link>
        <Link to='/companies/add' className='underline text-blue-400 hover:text-blue-300'>
          Add Company
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
