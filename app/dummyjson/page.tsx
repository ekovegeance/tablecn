import React from 'react';
import {getPosts} from "@/lib/data/posts";
import {DataTable} from "@/components/posts/data-table";
import {columns} from "@/components/posts/columns";
import {Button} from "@/components/ui/button";

export default async function DummyjsonPage() {
    const posts = await getPosts();
    console.log(posts);

    return (
        <>
            <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">
                            dummyjson.com is a free API for testing and prototyping. Here&apos;s a list of your posts!
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button className="w-fit">Add Post</Button>
                </div>
                <DataTable data={posts} columns={columns} />
            </div>
        </>
    );
}