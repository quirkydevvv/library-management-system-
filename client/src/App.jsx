import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App(){
  const [user, setUser] = useState(() => ({ name: localStorage.getItem('user_name') || '' }))
  function onLogout(){ localStorage.clear(); setUser(null) }
  return (
    <BrowserRouter basename="/app">
      <Navbar user={user} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
