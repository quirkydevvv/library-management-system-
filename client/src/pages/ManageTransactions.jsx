import { useEffect, useState } from 'react'
import { request } from '../lib/api'

export default function ManageTransactions(){
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  async function load(){ try{ const r = await request('/transactions'); setItems(r.data?.transactions||[]) }catch(e){ setError(e.message) } }
  useEffect(()=>{ load() },[])

  async function markReturn(id){ try{ await request(`/transactions/${id}/return`, { method:'PUT', body: JSON.stringify({ condition: 'good' }) }); await load() }catch(e){ alert(e.message) } }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
      {error && <div className="rounded-md border border-red-600 bg-red-900/30 p-3 text-sm">{error}</div>}
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(t => (
          <li key={t._id} className="rounded-lg border p-4 text-sm">
            <div className="font-medium">{t.bookId?.title || t.bookId}</div>
            <div>User: {t.userId?.email || t.userId}</div>
            <div>Status: {t.status}</div>
            <div className="mt-2 flex gap-2">
              {t.status==='borrowed' && <button className="h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground" onClick={()=>markReturn(t._id)}>Mark Return</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
