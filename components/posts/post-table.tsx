"use client";

import { Post } from "@/lib/data/schema";
import { columns } from "@/components/posts/posts-table-columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";

interface PostsTableProps {
    data: Post[];
}

export function PostsTable({ data }: PostsTableProps) {
    return (
        <DataTable
            columns={columns}
            data={data}
            toolbar={(table) => <DataTableToolbar table={table} />}
            pagination={(table) => <DataTablePagination table={table} />}
        />
    );
}