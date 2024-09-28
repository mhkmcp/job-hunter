import Login from './pages/Login'
import Home from './pages/Home'
import './App.css'
import Navbar from './components/shared/navbar'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>
  },
  {
    path:'/login',
    element: <Login></Login>
  }
])

function App() {

  return (
  <>
    <RouterProvider router={appRouter} />
  </>
  )
}

export default App
