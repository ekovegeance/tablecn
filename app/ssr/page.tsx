import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from 'lucide-react';

export default function ServerSideRenderingPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Alert variant="default">
                    <Terminal />
                    <AlertTitle>Work in Progress</AlertTitle>
                    <AlertDescription>
                        This page is currently under development. It will showcase server-side rendering capabilities in the future.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}