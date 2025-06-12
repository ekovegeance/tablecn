import React, {useCallback} from 'react';
import {Table} from "@tanstack/react-table";
import DataTableDownloadRows from "@/components/data-table/data-table-download-rows";
import DataTableDeleteRows from "@/components/data-table/data-table-delete-rows";
import {Badge} from '@/components/ui/badge';
import {Plus, XIcon} from 'lucide-react';
import {Button} from "@/components/ui/button";
import { toast } from 'sonner';
import {deletePostByIds} from "@/lib/data/posts";


interface DataTableToolbarProps<TData> {
    table: Table<TData>
}


export function PostTableToolbarActions<TData>({table}: DataTableToolbarProps<TData>) {
    const onClearSelection = useCallback(() => {
        table.toggleAllRowsSelected(false);
    }, [table]);

    const handleDeleteRows = async () => {
        const selectedRows = table.getSelectedRowModel().rows;
        const selectedIds = selectedRows.map(row => (row.original as { id: string }).id);

        // TODO: Implement the logic to delete posts by IDs.
        // Example: deletePostsByIds(selectedIds);
       await deletePostByIds(selectedIds);

        toast.success(`${selectedIds.length} row(s) deleted successfully!`, {
            description: `IDs: ${selectedIds.join(", ")}`,
        });
        table.resetRowSelection();
    };

    return (
        <div className="w-full md:w-auto flex gap-2 justify-end items-center">
            {table.getSelectedRowModel().rows.length > 0 && (
                <>
                    <Badge variant="secondary" className="gap-0 rounded-md p-2 text-xs">
                        Selected: {table.getSelectedRowModel().rows.length}
                        <button
                            className="focus-visible:border-ring focus-visible:ring-ring/50 text-foreground/60 hover:text-foreground -my-[5px] -ms-0.5 -me-2 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                            onClick={onClearSelection}
                            aria-label="Delete"
                        >
                            <XIcon size={14} aria-hidden="true"/>
                        </button>
                    </Badge>
                    <DataTableDownloadRows table={table} fileName="selected"/>
                    <DataTableDeleteRows table={table} onDelete={handleDeleteRows}/>
                </>
            )}
            <Button className="w-fit">
                <Plus/>
                Add Post
            </Button>
            {/**
             * Other actions can be added here.
             * For example, import, view, etc.
             */}
        </div>
    );
}