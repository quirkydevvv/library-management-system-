import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { request } from '../lib/api'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

export default function BookDetail(){
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [error, setError] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  async function load(){ try{ const r = await request(`/books/${id}`); setBook(r.data?.book||null) }catch(e){ setError(e.message) } }
  useEffect(()=>{ load() },[id])

  async function addReview(){ try{ await request(`/books/${id}/reviews`, { method:'POST', body: JSON.stringify({ rating: Number(rating), comment }) }); setComment(''); await load() }catch(e){ alert(e.message) } }

  if (!book) return <div className="mx-auto max-w-4xl px-4 py-8">{error||'Loading...'}</div>

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-4">
      <div className="rounded-lg border p-4">
        <div className="text-xl font-semibold">{book.title}</div>
        <div className="text-sm text-muted-foreground">ISBN: {book.isbn||'N/A'}</div>
        <div className="text-sm text-muted-foreground">Available: {book.availableCopies ?? 0}</div>
        <p className="mt-2 text-sm">{book.description}</p>
      </div>

      <div className="rounded-lg border p-4 space-y-3">
        <div className="font-medium">Add Review</div>
        <div className="grid gap-2 sm:grid-cols-3">
          <Input type="number" min={1} max={5} value={rating} onChange={e=>setRating(e.target.value)} />
          <Input placeholder="Comment" value={comment} onChange={e=>setComment(e.target.value)} />
          <Button onClick={addReview}>Submit</Button>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="font-medium mb-2">Reviews</div>
        <ul className="grid gap-2">
          {(book.reviews||[]).map((r,i)=> (
            <li key={i} className="rounded border p-3 text-sm">
              <div>Rating: {r.rating}</div>
              <div className="text-muted-foreground">{r.comment}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
