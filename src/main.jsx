import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Library from './components/Library/Library.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    //errorelement: <ErrorPge />
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "library",
        element: <Library />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)