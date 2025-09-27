import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { request, setToken } from '../lib/api'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e){
    e.preventDefault(); setError(''); setLoading(true)
    try{
      const res = await request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) })
      setToken(res.data.token)
      localStorage.setItem('refresh_token', res.data.refreshToken)
      localStorage.setItem('user_name', res.data.user?.name || name)
      nav('/dashboard')
    }catch(err){ setError(err.message) }
    finally{ setLoading(false) }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <form onSubmit={onSubmit} className="space-y-4 rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Create account</h2>
        {error && <div className="rounded-md border border-red-600 bg-red-900/30 p-3 text-sm">{error}</div>}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={e=>setName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <Button type="submit" disabled={loading}>{loading? 'Creating...' : 'Sign up'}</Button>
      </form>
    </div>
  )
}
