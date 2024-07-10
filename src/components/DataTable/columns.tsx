"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FileType = {
    id: string
    sno: string
    name: string
    // message: string
    mimetype: string
    sizeOriginal: string
    createdAt: string
}

export const columns: ColumnDef<FileType>[] = [
    {
        accessorKey: "sno",
        header: "S.No",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "mimetype",
        header: "Type",
    },
    {
        accessorKey: "sizeOriginal",
        header: "Size",
    },
    {
        accessorKey: "createdAt",
        header: "Created",
    }
]
