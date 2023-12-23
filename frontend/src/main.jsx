import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ErrorPage from './components/error/errorPage.jsx'
import Schedule from './components/schedule/Schedule.jsx'
import Tasks from './components/tasks/Tasks.jsx'
import Home from './components/home/Home.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'schedule',
        element: <Schedule />,
      },
      {
        path: 'tasks',
        element: <Tasks />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
)
