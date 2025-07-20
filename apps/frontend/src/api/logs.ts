import axios from 'axios'

export type Log = {
  id: number
  owner: string
  logText: string
  createdAt: string
  updatedAt: string
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

export async function getLogs(): Promise<Log[]> {
  const res = await api.get<Log[]>('/logs')
  return res.data
}

export async function createLog(data: Pick<Log, 'owner' | 'logText'>): Promise<Log> {
  const res = await api.post<Log>('/logs', data)
  return res.data
}

export async function updateLog(id: number, data: Pick<Log, 'owner' | 'logText'>): Promise<Log> {
  const res = await api.put<Log>(`/logs/${id}`, data)
  return res.data
}

export async function deleteLog(id: number): Promise<void> {
  await api.delete(`/logs/${id}`)
}
