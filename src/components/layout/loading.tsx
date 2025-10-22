'use client';

import { ShieldCheck } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <ShieldCheck className="h-12 w-12 text-primary animate-pulse" />
                <p className="text-muted-foreground">Memuat...</p>
            </div>
        </div>
    );
}
