"use client"

import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ReactNode} from "react";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
    children: (row: Row<TData>) => ReactNode;
}

/**
 * DataTableRowActions component
 * This component provides a dropdown menu for row actions in a data table.
 * @param row
 * @param children
 * @constructor
 */
export function DataTableRowActions<TData>({row, children}: DataTableRowActionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                {children(row)}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}