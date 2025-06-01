"use client";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {Post} from "@/lib/data/schema";
import {DataTableColumnHeader} from "@/components/tablecn/data-table-column-header";
import {DataTableRowActions} from "@/components/posts/data-table-row-actions";

export const columns: ColumnDef<Post>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="ID"/>
        ),
        cell: ({row}) => (
            <div className="w-[80px]">{row.getValue("id")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Title"/>
        ),
        cell: ({row}) => (
            <span className="max-w-[500px] truncate font-medium">
                {row.getValue("title")}
            </span>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        id: "actions",
        cell: ({row}) => <DataTableRowActions row={row}/>,
    }
]