const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export function getToken() {
  return localStorage.getItem('accessToken')
}

export function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  }
}

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(err.message || err.error || `Error ${res.status}`)
  }

  // 204 No Content
  if (res.status === 204) return null
  return res.json()
}
