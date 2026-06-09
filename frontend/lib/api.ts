const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private getAuthHeader(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }))
      throw new Error(error.error || 'API Error')
    }

    return response.json()
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }))
      throw new Error(error.error || 'API Error')
    }

    return response.json()
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }))
      throw new Error(error.error || 'API Error')
    }

    return response.json()
  }
}

export const api = new ApiClient(API_BASE_URL)

// API endpoints
export const authApi = {
  login: (username: string, password: string) =>
    api.post<{ token: string; user: any }>('/auth/login', { username, password }),
  verify: (token: string) =>
    api.post<{ user: any }>('/auth/verify', { token }),
}

export const matchesApi = {
  getAll: (params?: { status?: string; group?: string }) => {
    const query = new URLSearchParams(params as any).toString()
    return api.get<any[]>(`/matches${query ? `?${query}` : ''}`)
  },
  getById: (id: string) => api.get<any>(`/matches/${id}`),
  create: (data: any) => api.post<any>('/matches', data),
  update: (id: string, data: any) => api.put<any>(`/matches/${id}`, data),
  delete: (id: string) => api.delete<any>(`/matches/${id}`),
}

export const teamsApi = {
  getAll: (params?: { group?: string }) => {
    const query = new URLSearchParams(params as any).toString()
    return api.get<any[]>(`/teams${query ? `?${query}` : ''}`)
  },
  getById: (id: string) => api.get<any>(`/teams/${id}`),
  update: (id: string, data: any) => api.put<any>(`/teams/${id}`, data),
}

export const analyticsApi = {
  getAll: () => api.get<any>('/analytics'),
}

export const predictionsApi = {
  getAll: () => api.get<any[]>('/predictions'),
  getByMatchId: (matchId: string) => api.get<any>(`/predictions/match/${matchId}`),
  createOrUpdate: (data: any) => api.post<any>('/predictions', data),
}
