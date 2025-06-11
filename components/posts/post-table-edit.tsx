"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Post, postSchema } from "@/lib/data/schema";
import { toast } from "sonner";

interface EditFormProps {
    post: Post;
    onFormSubmit: (values: Post) => void;
}

function EditPostForm({ post, onFormSubmit }: EditFormProps) {
    const form = useForm<Post>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: post.title || "",
            tags: (post.tags as unknown as string) || "",
            id: post.id
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8 m-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

interface PostTableEditProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    rowData: Post | null;
}

export function PostTableEdit({ open, onOpenChange, rowData }: PostTableEditProps) {
    if (!rowData) {
        return null;
    }

    const handleFormSubmit = (values: Post) => {
        console.log("PUT /api/items", { ...values, id: rowData.id });
        onOpenChange(false);
        toast.success(`Item #${rowData.id} updated successfully!`);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full">
                <SheetHeader>
                    <SheetTitle>Edit #{rowData.id}</SheetTitle>
                    <p className="text-sm text-muted-foreground">
                        Edit the details of this item.
                    </p>
                </SheetHeader>
                <EditPostForm
                    key={rowData.id}
                    post={rowData}
                    onFormSubmit={handleFormSubmit}
                />
            </SheetContent>
        </Sheet>
    );
}