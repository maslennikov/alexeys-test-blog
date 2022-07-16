import jwtDecode from 'jwt-decode'
import {UserRecord} from './session'
import {fetcher} from './fetcher'

export async function authenticate(
  email: string,
  password: string
): Promise<UserRecord> {
  const data: any = await fetcher(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({email, password}),
  })

  const jwtData: any = jwtDecode(data.jwt)

  return {
    email,
    id: jwtData.user?.id,
    blogId: jwtData.user?.blog?.id,
    jwt: data.jwt,
  }
}