"use client"

import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import React from "react";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    primaryFilter?: React.ReactNode;
}

export function DataTableToolbar<TData>({ table, primaryFilter }: DataTableToolbarProps<TData>) {
    return (
        <div className="flex items-center gap-3">
            {primaryFilter}

            {/* Toggle columns visibility */}
            <DataTableViewOptions table={table} />

            {/* Faceted Filter */}
        </div>
    );
}