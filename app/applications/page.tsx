import { createClient } from '@/lib/supabase/server'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'

export default async function ApplicationsPage() {
  const supabase = await createClient()
  const { data: applications, error } = await supabase
    .from('applications')
    .select(`
      *,
      systems (
        name
      )
    `)
    .order('name')

  if (error) {
    console.error('Error fetching applications:', error)
    return <div>Error loading applications</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Applications</h1>
      <DataTable columns={columns} data={applications || []} />
    </div>
  )
} 