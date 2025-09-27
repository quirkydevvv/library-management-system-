const API_BASE = '/api'

export function setToken(token){
  if (token) localStorage.setItem('access_token', token); else localStorage.removeItem('access_token');
}

export function getToken(){
  return localStorage.getItem('access_token') || ''
}

export async function request(path, opts={}){
  const headers = { 'Content-Type': 'application/json', ...(opts.headers||{}) }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers })
  const data = await res.json().catch(()=>null)
  if (!res.ok) throw new Error(data?.message || 'Request failed')
  return data
}
