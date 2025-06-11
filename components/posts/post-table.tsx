"use client";

import { Post } from "@/lib/data/schema";
import { columns } from "@/components/posts/posts-table-columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { PostTableToolbarActions } from "@/components/posts/post-table-toolbar-actions";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {DataTableSearchFilter} from "@/components/data-table/data-table-search-filter";

interface PostsTableProps {
    data: Post[];
}

export function PostsTable({ data }: PostsTableProps) {
    return (
        <DataTable
            columns={columns}
            data={data}
            toolbar={(table) => (
                <DataTableToolbar
                    table={table}
                    primaryFilter={
                        <DataTableSearchFilter
                            table={table}
                            columnId="title"
                            placeholder="Filter posts by title..."
                        />
                    }
                />
            )}
            actionBar={(table) => <PostTableToolbarActions table={table} />}
            pagination={(table) => <DataTablePagination table={table} />}
        />
    );
}