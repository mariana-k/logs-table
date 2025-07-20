import LogsPage from './pages/LogsPage'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900 dark:from-gray-900 dark:to-blue-950 dark:text-gray-100">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Logs Table</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Beautiful, responsive, and accessible log management
        </p>
      </header>
      <main className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6">
          <LogsPage />
        </div>
      </main>
      <Toaster richColors position="top-center" />
    </div>
  )
}
