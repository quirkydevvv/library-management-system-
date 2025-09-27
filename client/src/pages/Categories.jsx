import { useEffect, useState } from 'react'
import { request } from '../lib/api'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

export default function Categories(){
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  async function load(){ try{ const r = await request('/categories'); setItems(r.data?.categories||[]) }catch(e){ setError(e.message) } }
  useEffect(()=>{ load() },[])

  async function create(){ try{ await request('/categories', { method:'POST', body: JSON.stringify({ name }) }); setName(''); await load() }catch(e){ setError(e.message) } }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-4">
      {error && <div className="rounded-md border border-red-600 bg-red-900/30 p-3 text-sm">{error}</div>}
      <div className="rounded-lg border p-4 space-y-3">
        <div className="font-medium">Create Category</div>
        <div className="flex gap-2">
          <Input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <Button onClick={create}>Add</Button>
        </div>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map(c => (
          <li key={c._id} className="rounded-lg border p-4">{c.name}</li>
        ))}
      </ul>
    </div>
  )
}
