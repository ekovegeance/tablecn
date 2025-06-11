"use client"

import React, { useEffect, useState } from "react"
import { Table } from "@tanstack/react-table"
import { useDebounce } from "use-debounce"
import { Input } from "@/components/ui/input"
import { CircleXIcon, ListFilterIcon } from "lucide-react"

interface DataTableSearchFilterProps<TData> {
    table: Table<TData>
    columnId: string
    placeholder?: string
}

export function DataTableSearchFilter<TData>({table, columnId, placeholder = `Filter by ${columnId}...`}: DataTableSearchFilterProps<TData>) {

    const column = table.getColumn(columnId);

    const [filterValue, setFilterValue] = useState(
        (column?.getFilterValue() as string) ?? ""
    );
    const [debouncedFilterValue] = useDebounce(filterValue, 300);

    useEffect(() => {
        column?.setFilterValue(debouncedFilterValue);
    }, [debouncedFilterValue, column]);

    return (
        <div className="relative">
            <Input
                className="peer h-8 w-full md:w-60 ps-9"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder={placeholder}
            />
            <div
                className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <ListFilterIcon size={16} aria-hidden="true" />
            </div>
            {Boolean(filterValue) && (
                <button
                    className="text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md outline-none"
                    aria-label="Clear filter"
                    onClick={() => { setFilterValue("") }}
                >
                    <CircleXIcon size={16} aria-hidden="true" />
                </button>
            )}
        </div>
    )
}