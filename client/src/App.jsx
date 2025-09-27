import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Books from './pages/Books'
import Transactions from './pages/Transactions'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  const [user, setUser] = useState(() => ({ name: localStorage.getItem('user_name') || '' }))
  function onLogout(){ localStorage.clear(); setUser(null) }
  return (
    <BrowserRouter basename="/app">
      <Navbar user={user} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/books" element={<Books />} />
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
