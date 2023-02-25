import { useState } from 'react'
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Main from './pages/main'
import Login from './pages/login'

function App() {
  const [cookies] = useCookies([])

  return (
    <Routes>
        <Route
          path="/"
          element={(<Navigate to={cookies.userjwt ? '/main' : '/login'} />)}
        />
        <Route path="/main/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
