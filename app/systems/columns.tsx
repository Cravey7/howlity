import { ColumnDef } from "@tanstack/react-table"

export type System = {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
}

export const columns: ColumnDef<System>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
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