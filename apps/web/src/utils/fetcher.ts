const API_HOST = 'http://localhost:5000'

export const fetcher = async (resource: string, init: RequestInit) => {
  const url = `${API_HOST}${resource}`
  return fetch(url, init).then((res) => res.json())
}
