import { useEffect, useState } from 'react'
import { request } from '../lib/api'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

export default function ManageBooks(){
  const [books, setBooks] = useState([])
  const [error, setError] = useState('')
  const [form, setForm] = useState({ title:'', authors:'', genre:'', isbn:'', copies:1, description:'' })
  const [editing, setEditing] = useState(null)

  async function load(){ try{ const r = await request('/books'); setBooks(r.data?.books||[]) }catch(e){ setError(e.message) } }
  useEffect(()=>{ load() },[])

  function onChange(k, v){ setForm(prev=>({ ...prev, [k]: v })) }

  async function save(){
    const payload = { ...form, copies: Number(form.copies), authors: form.authors.split(',').map(s=>s.trim()).filter(Boolean) }
    try{
      if (editing) await request(`/books/${editing}`, { method:'PUT', body: JSON.stringify(payload) })
      else await request('/books', { method:'POST', body: JSON.stringify(payload) })
      setForm({ title:'', authors:'', genre:'', isbn:'', copies:1, description:'' }); setEditing(null); await load()
    }catch(e){ setError(e.message) }
  }

  async function remove(id){ if(!confirm('Delete this book?')) return; try{ await request(`/books/${id}`, { method:'DELETE' }); await load() }catch(e){ setError(e.message) } }

  function startEdit(b){ setEditing(b._id); setForm({ title:b.title||'', authors:(b.authors||[]).map(a=>a._id||a).join(','), genre:(b.genre?._id || b.genre || ''), isbn:b.isbn||'', copies:b.copies||1, description:b.description||'' }) }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
      {error && <div className="rounded-md border border-red-600 bg-red-900/30 p-3 text-sm">{error}</div>}

      <div className="rounded-lg border p-4 space-y-3">
        <div className="font-medium">{editing? 'Edit Book' : 'Create Book'}</div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Input placeholder="Title" value={form.title} onChange={e=>onChange('title', e.target.value)} />
          <Input placeholder="ISBN" value={form.isbn} onChange={e=>onChange('isbn', e.target.value)} />
          <Input placeholder="Author IDs (comma-separated)" value={form.authors} onChange={e=>onChange('authors', e.target.value)} />
          <Input placeholder="Genre (Category ID)" value={form.genre} onChange={e=>onChange('genre', e.target.value)} />
          <Input placeholder="Copies" type="number" min={1} value={form.copies} onChange={e=>onChange('copies', e.target.value)} />
          <Input placeholder="Description" value={form.description} onChange={e=>onChange('description', e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button onClick={save}>{editing? 'Update' : 'Create'}</Button>
          {editing && <Button variant="secondary" onClick={()=>{ setEditing(null); setForm({ title:'', authors:'', genre:'', isbn:'', copies:1, description:'' }) }}>Cancel</Button>}
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {books.map(b => (
          <li key={b._id} className="rounded-lg border p-4">
            <div className="font-medium">{b.title||'Untitled'}</div>
            <div className="text-xs text-muted-foreground">ISBN: {b.isbn||'N/A'}</div>
            <div className="text-xs text-muted-foreground">Copies: {b.copies ?? 0} • Available: {b.availableCopies ?? 0}</div>
            <div className="mt-2 flex gap-2">
              <Button size="sm" variant="secondary" onClick={()=>startEdit(b)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={()=>remove(b._id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
