import { createBrowserRouter } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';
import HomeLayout from '../components/layouts/HomeLayout';
import HomePage from '../pages/HomePage';
import AddNotePage from '../pages/AddNotePage';
import ViewNotePage from '../pages/ViewNotePage';

const AppRoutes = createBrowserRouter([
  {
    path: '*',
    element: <PageNotFound />
  },
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'notes/add',
        element: <AddNotePage />
      },
      {
        path: 'notes/:id',
        element: <ViewNotePage />
      }
    ]
  }
]);

export default AppRoutes;
