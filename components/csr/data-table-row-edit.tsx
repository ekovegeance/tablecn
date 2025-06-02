"use client";


import {Sheet, SheetContent, SheetHeader, SheetTitle,} from "@/components/ui/sheet"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "../ui/button";
import {Post, postSchema} from "@/lib/data/schema";
import {toast} from "sonner"
import {Row} from "@tanstack/react-table";
import { useEffect } from "react";

interface DataTableRowEditProps<TData> {
    open: boolean
    onOpenChange: (open: boolean) => void
    rowData: Row<TData>
}


export function DataTableRowEdit<TData>({open, onOpenChange, rowData,}: DataTableRowEditProps<TData>) {

    const form = useForm<Post>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
        },
    })

    useEffect(() => {
        if (open && rowData) {
            form.reset({
                title: (rowData as unknown as Post).title,
            })
        }
    }, [open, rowData, form])

    const onSubmit = (values: Post) => {
        // Update simulated API call
        console.log("PUT /api/items", {...values, id: rowData.id})
        onOpenChange(false)
        toast.success(`Item #${rowData.id} updated successfully!` );
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full">
                <SheetHeader>
                    <SheetTitle>Edit #{rowData.id}</SheetTitle>
                    <p className="text-sm text-muted-foreground">
                        Edit the details of this item.
                    </p>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 m-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
