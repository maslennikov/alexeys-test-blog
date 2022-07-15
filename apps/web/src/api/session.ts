export type UserRecord = {
  id: number
  email: string
  blogId: number
  jwt: string
}

export function setUser(user: UserRecord | null) {
  if (!user) {
    sessionStorage.removeItem('user')
  } else {
    sessionStorage.setItem('user', JSON.stringify(user))
  }
}

export function user(): UserRecord | null {
  const data = sessionStorage.getItem('user')
  try {
    if (!data) return null
    return JSON.parse(data) as UserRecord
  } catch (e) {
    sessionStorage.removeItem('user')
    return null
  }
}
