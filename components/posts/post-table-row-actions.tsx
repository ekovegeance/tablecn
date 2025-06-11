"use client";

import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { Post } from "@/lib/data/schema";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { PostTableEdit } from "@/components/posts/post-table-edit";
import { DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";

interface PostTableRowActionsProps {
    row: Row<Post>;
}

export function PostTableRowActions({ row }: PostTableRowActionsProps) {
    const [editOpen, setEditOpen] = useState(false);
    const postData = row.original;

    return (
        <>
            <DataTableRowActions row={row}>
                {() => (
                    <>
                        <DropdownMenuItem>Show</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditOpen(true)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            Delete
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </>
                )}
            </DataTableRowActions>

            <PostTableEdit
                open={editOpen}
                onOpenChange={setEditOpen}
                rowData={postData}
            />
        </>
    );
}