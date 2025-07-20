import LogsPage from './pages/LogsPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Logs Table</h1>
        <LogsPage />
      </div>
    </div>
  );
}
