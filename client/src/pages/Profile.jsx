import { useEffect, useState } from 'react'
import { request } from '../lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function Profile(){
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=>{ (async()=>{
    try{ const r = await request('/auth/profile'); setUser(r.data?.user) }catch(e){ setError(e.message) }
  })() },[])

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      {error && <div className="rounded-md border border-red-600 bg-red-900/30 p-3 text-sm">{error}</div>}
      <Card>
        <CardHeader><CardTitle>My Profile</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div><strong>Name:</strong> {user?.name||'-'}</div>
          <div><strong>Email:</strong> {user?.email||'-'}</div>
          <div><strong>Role:</strong> {user?.role||'-'}</div>
          <div><strong>Status:</strong> {user?.status||'-'}</div>
        </CardContent>
      </Card>
    </div>
  )
}
