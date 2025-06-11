"use client";
import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {Post} from "@/lib/data/schema";
import {DataTableColumnHeader} from "@/components/data-table/data-table-column-header";
import {Badge} from "@/components/ui/badge";
import {PostTableRowActions} from "@/components/posts/post-table-row-actions";

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
        accessorKey: "body",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Body"/>
        ),
        cell: ({row}) => (
            <div className="flex items-center gap-2">
            <span className="max-w-[31.25rem] truncate font-medium">
                {row.getValue("body")}
            </span>
            </div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "tags",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Tags"/>
        ),
        cell: ({row}) => {
            const tags: string[] = row.getValue("tags");
            return (
                <>
                    {tags.map((tag) => (
                        <Badge variant="secondary" key={tag} className="me-1 mb-1">
                            {tag}
                        </Badge>
                    ))}
                </>
            )
        },
        enableSorting: false,
        enableHiding: true,
    },
    {
        id: "actions",
        cell: ({ row }) => <PostTableRowActions row={row} />
    }
]