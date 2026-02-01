import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import './index.css';
import './env';

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
