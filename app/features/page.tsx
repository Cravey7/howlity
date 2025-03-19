import { createClient } from '@/lib/supabase/server'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { Feature } from '@/types/database'

export default async function FeaturesPage() {
  const supabase = await createClient()
  const { data: features, error } = await supabase
    .from('features')
    .select(`
      *,
      applications (
        name
      )
    `)
    .order('name')

  if (error) {
    console.error('Error fetching features:', error)
    return <div>Error loading features</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Features</h1>
      <DataTable columns={columns} data={features || []} />
    </div>
  )
} 