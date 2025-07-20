import { useQuery } from '@tanstack/react-query'
import { getLogs } from '../api/logs'
import LogsTable from '../components/LogsTable'
import Spinner from '../components/Spinner'

export default function LogsPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['logs'],
    queryFn: getLogs,
  })
  console.log(data)
  if (isLoading) return <Spinner />
  if (isError)
    return <div className="text-red-500 p-4">{error?.message || 'Failed to load logs'}</div>

  return <LogsTable logs={data || []} refetch={refetch} />
}
