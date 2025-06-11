"use client";

import  React, { useState } from "react"
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    Table as TanstackTable,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    toolbar?: (table: TanstackTable<TData>) => React.ReactNode
    pagination?: (table: TanstackTable<TData>) => React.ReactNode
}

/**
 * DataTable component for displaying tabular data with features like sorting, filtering, and pagination.
 * @param columns
 * @param data
 * @param toolbar Optional toolbar component for additional actions or filters.
 * @param pagination Optional pagination component for navigating through data.
 * @constructor
 * @example
 * <DataTable columns={columns} data={data} toolbar={DataTableToolbar} pagination={DataTablePagination} />
 */
export function DataTable<TData, TValue>({columns, data, toolbar, pagination}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({})
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})

    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })


    return (
        <div className="space-y-4">
            {/*<DataTableToolbar table={table} />*/}
            {toolbar && toolbar(table)}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {pagination && pagination(table)}
        </div>
    )
}