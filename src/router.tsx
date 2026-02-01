import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import About from './pages/About';
import AddCompany from './pages/AddCompany';
import Companies from './pages/Companies';
import Home from './pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'companies', element: <Companies /> },
      { path: 'companies/add', element: <AddCompany /> },
    ],
  },
]);
