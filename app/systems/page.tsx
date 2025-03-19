import { createClient } from '@/lib/supabase/server'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'

export default async function SystemsPage() {
  const supabase = await createClient()
  const { data: systems, error } = await supabase
    .from('systems')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching systems:', error)
    return <div>Error loading systems</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Systems</h1>
      <DataTable columns={columns} data={systems || []} />
    </div>
  )
} 