import { ColumnDef } from "@tanstack/react-table"

export type Application = {
  id: string
  name: string
  description: string
  system_id: string
  created_at: string
  updated_at: string
  systems: {
    name: string
  }
}

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "systems.name",
    header: "System",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return new Date(row.getValue("created_at")).toLocaleDateString()
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      return new Date(row.getValue("updated_at")).toLocaleDateString()
    },
  },
] 