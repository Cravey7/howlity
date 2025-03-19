import { ColumnDef } from "@tanstack/react-table"
import { Feature } from "@/types/database"

export const columns: ColumnDef<Feature>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "applications.name",
    header: "Application",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return new Date(row.getValue("created_at")).toLocaleString()
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      return new Date(row.getValue("updated_at")).toLocaleString()
    },
  },
] 