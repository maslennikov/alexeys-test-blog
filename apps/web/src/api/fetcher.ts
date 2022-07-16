import {API_HOST} from './config'
import {getUser} from './session'

export class AuthError extends Error {}

export const fetcher = async (resource: string, init: RequestInit) => {
  const url = `${API_HOST}${resource}`
  var headers = new Headers(init?.headers)
  const user = getUser()
  if (user) {
    headers.append('Authorization', `Bearer ${user.jwt}`)
  }
  if (!headers.has('Content-Type')) {
    headers.append('Content-Type', 'application/json')
  }

  const res = await fetch(url, {
    ...init,
    headers,
  })
  if (!res.ok) {
    console.error('Fetch error:', res)
    if (res.status == 401) throw new AuthError(res.statusText)
    throw new Error(res.statusText)
  }
  return res.json()
}
