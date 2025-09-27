import { useEffect, useState } from 'react'
import { request } from '../lib/api'

export default function Transactions(){
  const [books, setBooks] = useState([])
  const [error, setError] = useState('')

  useEffect(()=>{ (async()=>{ try{ const b = await request('/books'); setBooks(b.data?.books||[]) }catch(e){ setError(e.message) } })() },[])

  async function borrow(bookId){
    try{ await request('/transactions/borrow', { method:'POST', body: JSON.stringify({ bookId }) }); alert('Borrowed'); }
    catch(e){ alert(e.message) }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
      {error && <div className="rounded-md border border-red-600 bg-red-900/30 p-3 text-sm">{error}</div>}
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {books.map(b => (
          <li key={b._id} className="rounded-lg border p-4">
            <div className="font-medium">{b.title||'Untitled'}</div>
            <div className="text-xs text-muted-foreground">Available: {b.availableCopies ?? 0}</div>
            <div className="mt-2 flex gap-2">
              <button className="h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground" onClick={()=>borrow(b._id)}>Borrow</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
