import {API_HOST} from './config'
import jwtDecode from 'jwt-decode'
import {setUser, UserRecord} from './session'

export class AuthError extends Error {}

export const fetcher = async (resource: string, init: RequestInit) => {
  const url = `${API_HOST}${resource}`
  return fetch(url, init).then((res) => res.json())
}

/**
 * Fetches access & refresh token but does not persist them
 * as default values for api calls. For that purpose @see `setUser`
 */
export async function authenticate(
  email: string,
  password: string
): Promise<UserRecord> {
  const res: any = await fetch(`${API_HOST}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  })

  if (!res.ok) {
    throw new AuthError(res.statusText)
  }
  const data = await res.json()
  const jwtData: any = jwtDecode(data.jwt)

  const user: UserRecord = {
    email,
    id: jwtData.user?.id,
    blogId: jwtData.user?.blog?.id,
    jwt: data.jwt,
  }

  return user
}
