import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className='min-h-screen'>
      <nav className='flex gap-4 p-4 border-b'>
        <Link to='/' className='underline'>
          Home
        </Link>
        <Link to='/about' className='underline'>
          About
        </Link>
        <Link to='/companies' className='underline'>
          Companies
        </Link>
        <Link to='/companies/add' className='underline'>
          Add Company
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
