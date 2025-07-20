import { useState } from 'react'
import { Log, updateLog, deleteLog, createLog } from '../api/logs'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './ui/dialog'
import { toast } from 'sonner'

const PAGE_SIZE = 10

type Props = {
  logs: Log[]
  refetch: () => void
}

export default function LogsTable({ logs, refetch }: Props) {
  const [editId, setEditId] = useState<number | null>(null)
  const [editOwner, setEditOwner] = useState('')
  const [editText, setEditText] = useState('')
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [newLogOpen, setNewLogOpen] = useState(false)
  const [newOwner, setNewOwner] = useState('')
  const [newText, setNewText] = useState('')
  const [creating, setCreating] = useState(false)

  const pagedLogs = logs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const pageCount = Math.ceil(logs.length / PAGE_SIZE)

  const startEdit = (log: Log) => {
    setEditId(log.id)
    setEditOwner(log.owner)
    setEditText(log.logText)
  }

  const cancelEdit = () => {
    setEditId(null)
    setEditOwner('')
    setEditText('')
  }

  const saveEdit = async (id: number) => {
    try {
      await updateLog(id, { owner: editOwner, logText: editText })
      toast.success('Log updated')
      refetch()
    } catch (e: any) {
      toast.error(e.message || 'Update failed')
    }
    cancelEdit()
  }

  const confirmDelete = async () => {
    if (deleteId == null) return
    try {
      await deleteLog(deleteId)
      toast.success('Log deleted')
      refetch()
    } catch (e: any) {
      toast.error(e.message || 'Delete failed')
    }
    setDeleteId(null)
  }

  const handleCreateLog = async () => {
    if (!newOwner.trim() || !newText.trim()) {
      toast.error('Owner and Log Text are required')
      return
    }
    setCreating(true)
    try {
      await createLog({ owner: newOwner, logText: newText })
      toast.success('Log created')
      setNewOwner('')
      setNewText('')
      setNewLogOpen(false)
      refetch()
    } catch (e: any) {
      toast.error(e.message || 'Create failed')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-4">
        <Dialog open={newLogOpen} onOpenChange={setNewLogOpen}>
          <DialogTrigger asChild>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
              + New Log
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-gray-900 p-6 rounded-xl">
            <DialogTitle>Create New Log</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new log entry.
            </DialogDescription>
            <div className="flex flex-col gap-4 mt-4">
              <input
                className="border rounded px-3 py-2"
                placeholder="Owner"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                aria-label="Owner"
                disabled={creating}
              />
              <input
                className="border rounded px-3 py-2"
                placeholder="Log Text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                aria-label="Log Text"
                disabled={creating}
              />
              <div className="flex gap-2 justify-end">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded focus:outline-none focus:ring"
                  onClick={handleCreateLog}
                  disabled={creating}
                >
                  {creating ? 'Creating...' : 'Create'}
                </button>
                <DialogClose asChild>
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring"
                    disabled={creating}
                  >
                    Cancel
                  </button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
            >
              Owner
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
            >
              Log Text
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
            >
              Created At
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
            >
              Updated At
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pagedLogs.map((log) => (
            <tr key={log.id}>
              <td className="px-4 py-2">
                {editId === log.id ? (
                  <input
                    className="border rounded px-2 py-1 w-full"
                    value={editOwner}
                    onChange={(e) => setEditOwner(e.target.value)}
                    aria-label="Owner"
                  />
                ) : (
                  <span>{log.owner}</span>
                )}
              </td>
              <td className="px-4 py-2">
                {editId === log.id ? (
                  <input
                    className="border rounded px-2 py-1 w-full"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    aria-label="Log Text"
                  />
                ) : (
                  <span>{log.logText}</span>
                )}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                {new Date(log.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                {new Date(log.updatedAt).toLocaleString()}
              </td>
              <td className="px-4 py-2 flex gap-2">
                {editId === log.id ? (
                  <>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring"
                      onClick={() => saveEdit(log.id)}
                      aria-label="Save"
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 focus:outline-none focus:ring"
                      onClick={cancelEdit}
                      aria-label="Cancel"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 focus:outline-none focus:ring"
                      onClick={() => startEdit(log)}
                      aria-label="Edit"
                    >
                      Edit
                    </button>
                    <Dialog
                      open={deleteId === log.id}
                      onOpenChange={(open) => setDeleteId(open ? log.id : null)}
                    >
                      <DialogTrigger asChild>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring"
                          aria-label="Delete"
                        >
                          Delete
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-gray-900">
                        <DialogTitle>Delete Log</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this log?
                        </DialogDescription>
                        <div className="flex gap-2 mt-4">
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring"
                            onClick={confirmDelete}
                          >
                            Delete
                          </button>
                          <DialogClose asChild>
                            <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 focus:outline-none focus:ring">
                              Cancel
                            </button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            aria-label="Previous Page"
          >
            Prev
          </button>
          <span className="px-2 py-1">
            Page {page} of {pageCount}
          </span>
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === pageCount}
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
