import {API_HOST} from './config'
import {getUser} from './session'

export class AuthError extends Error {}
export class NotFoundError extends Error {}

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
    const errorData = await res.json()
    const errorMessage = errorData?.message || res.statusText

    console.error('Fetch error:', res, errorData)
    if (res.status == 404) throw new NotFoundError()
    if (res.status == 401) throw new AuthError(errorMessage)
    throw new Error(errorMessage)
  }
  return res.json()
}
