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
import RoleGuard from './components/RoleGuard'
import { useAuth } from './hooks/useAuth'
import AdminUsers from './pages/AdminUsers'
import Categories from './pages/Categories'
import Authors from './pages/Authors'
import Reservations from './pages/Reservations'
import ManageBooks from './pages/ManageBooks'
import BookDetail from './pages/BookDetail'

export default function App(){
  const { user, setUser } = useAuth()
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
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><RoleGuard user={user} roles={['admin','librarian']}><AdminUsers /></RoleGuard></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><RoleGuard user={user} roles={['admin']}><Categories /></RoleGuard></ProtectedRoute>} />
        <Route path="/admin/authors" element={<ProtectedRoute><RoleGuard user={user} roles={['admin','librarian']}><Authors /></RoleGuard></ProtectedRoute>} />
        <Route path="/admin/books" element={<ProtectedRoute><RoleGuard user={user} roles={['admin','librarian']}><ManageBooks /></RoleGuard></ProtectedRoute>} />
        <Route path="/reservations" element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
