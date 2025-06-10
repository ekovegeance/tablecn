import React from 'react';
import {getPosts} from "@/lib/data/posts";
import {DataTable} from "@/components/csr/data-table";
import {columns} from "@/components/posts/posts-table-columns";
import Link from "next/link";

export default async function CSRPage() {
    const posts = await getPosts();

    return (
        <>
            <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Client Side Rendering</h2>
                        <p className="text-muted-foreground">
                            Example of a client-side rendered data table using <Link href="https://dummyjson.apidog.io/" className="underline cursor-pointer text-primary">dummyjson API</Link> . Here&apos;s a list of your posts!
                        </p>
                        <Link href="https://ui.shadcn.com/docs/components/data-table">Shadcn/ui Data Table</Link>
                    </div>
                    <div className="flex items-center space-x-2">
                    </div>
                </div>
                <DataTable data={posts} columns={columns} />
            </div>
        </>
    );
}