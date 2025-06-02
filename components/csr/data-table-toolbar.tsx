"use client"

import {Table} from "@tanstack/react-table"
import {CircleXIcon, ListFilterIcon, Plus} from "lucide-react"


import {Input} from "@/components/ui/input"
import {DataTableViewOptions} from "@/components/tablecn/data-table-view-options";
import {useId, useRef} from "react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import DataTableDeleteRows from "@/components/csr/data-table-delete-rows";

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({table,}: DataTableToolbarProps<TData>) {
    const id = useId()
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <div className="flex  md:items-center flex-col-reverse md:flex-row  gap-2 justify-between">
            <div className="flex item-center gap-3">
                {/* Search Filter */}
                <div className="relative">
                    <Input
                        id={`${id}-input`}
                        ref={inputRef}
                        className={cn(
                            "peer min-w-full md:min-w-60 ps-9",
                            Boolean(table.getColumn("title")?.getFilterValue()) && "pe-9"
                        )}
                        value={
                            (table.getColumn("title")?.getFilterValue() ?? "") as string
                        }
                        onChange={(e) =>
                            table.getColumn("title")?.setFilterValue(e.target.value)
                        }
                        placeholder="Filter by title"
                        type="text"
                        aria-label="Filter by name or email"
                    />
                    <div
                        className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                        <ListFilterIcon size={16} aria-hidden="true"/>
                    </div>
                    {Boolean(table.getColumn("title")?.getFilterValue()) && (
                        <button
                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Clear filter"
                            onClick={() => {
                                table.getColumn("title")?.setFilterValue("")
                                if (inputRef.current) {
                                    inputRef.current.focus()
                                }
                            }}
                        >
                            <CircleXIcon size={16} aria-hidden="true"/>
                        </button>
                    )}
                </div>

                {/* Toggle columns visibility */}
                <DataTableViewOptions table={table}/>
            </div>
            <div className="w-full md:w-auto flex gap-2 justify-end">
                {/*Delete rows*/}
                {table.getSelectedRowModel().rows.length > 0 && (
                    <DataTableDeleteRows table={table}/>
                )}
                {/* Add Item Button */}
                <Button className="w-fit">
                    <Plus/>
                    Add Item
                </Button>
            </div>

        </div>
    )
}