import {CircleAlertIcon, TrashIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Table} from "@tanstack/react-table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}
export default function DataTableDeleteRows<TData>({table}: DataTableToolbarProps<TData>) {
    // const [data, setData] = useState<Item[]>([])
    // const handleDeleteRows = () => {
    //     const selectedRows = table.getSelectedRowModel().rows
    //     const updatedData = data.filter(
    //         (item) => !selectedRows.some((row) => row.original.id === item.id)
    //     )
    //     setData(updatedData)
    //     table.resetRowSelection()
    // }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="ml-auto" variant="destructive">
                    <TrashIcon
                        className="-ms-1 "
                        size={16}
                        aria-hidden="true"
                    />
                    {table.getSelectedRowModel().rows.length}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                    <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                    >
                        <CircleAlertIcon className="opacity-80" size={16} />
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete{" "}
                            {table.getSelectedRowModel().rows.length} selected{" "}
                            {table.getSelectedRowModel().rows.length === 1
                                ? "row"
                                : "rows"}
                            .
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive focus:bg-destructive hover:bg-destructive" onClick={() => {}}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}