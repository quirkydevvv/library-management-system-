import { useEffect, useState } from 'react'
import { request } from '../lib/api'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

export default function AdminUsers(){
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'member' })
  const [error, setError] = useState('')

  async function load(){ try{ const r = await request('/users'); setUsers(r.data?.users||[]) }catch(e){ setError(e.message) } }
  useEffect(()=>{ load() },[])

  async function createUser(){
    try{ await request('/users', { method:'POST', body: JSON.stringify(form) }); setForm({name:'',email:'',password:'',role:'member'}); await load() }
    catch(e){ setError(e.message) }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
      {error && <div className="rounded-md border border-red-600 bg-red-900/30 p-3 text-sm">{error}</div>}
      <div className="rounded-lg border p-4 space-y-3">
        <div className="font-medium">Create User</div>
        <div className="grid gap-2 sm:grid-cols-4">
          <Input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <Input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <Input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          <Input placeholder="Role (admin/librarian/member)" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} />
        </div>
        <Button onClick={createUser}>Create</Button>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {users.map(u=> (
          <li key={u._id} className="rounded-lg border p-4 text-sm">
            <div className="font-medium">{u.name}</div>
            <div>{u.email}</div>
            <div className="text-muted-foreground">{u.role}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
