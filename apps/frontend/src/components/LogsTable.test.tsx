import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LogsTable from './LogsTable'
import type { Log } from '../api/logs'
import { toast } from 'sonner'

jest.mock('../api/logs', () => ({
  updateLog: jest.fn().mockResolvedValue({}),
  deleteLog: jest.fn().mockResolvedValue({}),
  createLog: jest.fn().mockResolvedValue({}),
}))

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => null,
}))

const logs: Log[] = [
  {
    id: 1,
    owner: 'John Doe',
    logText: 'Test log',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]
describe('LogsTable', () => {
  it('renders table headers', () => {
    render(<LogsTable logs={logs} refetch={jest.fn()} />)
    expect(screen.getByText(/owner/i)).toBeInTheDocument()
    expect(screen.getByText(/log text/i)).toBeInTheDocument()
    expect(screen.getByText(/created at/i)).toBeInTheDocument()
    expect(screen.getByText(/updated at/i)).toBeInTheDocument()
    expect(screen.getByText(/actions/i)).toBeInTheDocument()
  })

  it('renders log data', () => {
    render(<LogsTable logs={logs} refetch={jest.fn()} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Test log')).toBeInTheDocument()
  })

  it('opens new log dialog when clicking New Log', () => {
    render(<LogsTable logs={logs} refetch={jest.fn()} />)
    fireEvent.click(screen.getByText('+ New Log'))
    expect(screen.getByText(/create new log/i)).toBeInTheDocument()
  })

  it('shows error toast if creating log with empty fields', () => {
    render(<LogsTable logs={logs} refetch={jest.fn()} />)
    fireEvent.click(screen.getByText('+ New Log'))
    fireEvent.click(screen.getByText('Create'))
    expect(toast.error).toHaveBeenCalledWith('Owner and Log Text are required')
  })
})
