"use client"

import {Row} from "@tanstack/react-table"
import {MoreHorizontal} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {DataTableRowEdit} from "@/components/csr/data-table-row-edit";
import {useState} from "react";


interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData extends Row<unknown>>({row}: DataTableRowActionsProps<TData>) {
    const rowData = row.original
    const [editOpen, setEditOpen] = useState(false)

    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <MoreHorizontal />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Show</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setEditOpen(true)}>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
            <DataTableRowEdit
                open={editOpen}
                onOpenChange={setEditOpen}
                rowData={ rowData }
            />
        </>
    )
}