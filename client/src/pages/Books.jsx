import { useEffect, useState } from 'react'
import { request } from '../lib/api'
import { Input } from '../components/ui/input'

export default function Books(){
  const [books, setBooks] = useState([])
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  useEffect(()=>{ (async()=>{ try{ const b = await request('/books'); setBooks(b.data?.books||[]) }catch(e){ setError(e.message) } })() },[])

  async function search(){ try{ const r = await request(`/books/search?q=${encodeURIComponent(query)}`); setBooks(r.data?.books||[]) }catch(e){ setError(e.message) } }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
      {error && <div className="rounded-md border border-red-600 bg-red-900/30 p-3 text-sm">{error}</div>}
      <div className="flex gap-2">
        <Input placeholder="Search books..." value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()} />
        <button className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground" onClick={search}>Search</button>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {books.map(b => (
          <li key={b._id} className="rounded-lg border p-4">
            <div className="font-medium">{b.title||'Untitled'}</div>
            <div className="text-xs text-muted-foreground">ISBN: {b.isbn||'N/A'}</div>
            <div className="text-xs text-muted-foreground">Available: {b.availableCopies ?? 0}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
