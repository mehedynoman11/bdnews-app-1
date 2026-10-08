'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
    const router = useRouter();

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                <p className="text-8xl sm:text-9xl font-black tracking-tight bg-gradient-to-r from-red-700 via-rose-600 to-orange-500 bg-clip-text text-transparent">
                    404
                </p>

                <h1 className="mt-4 text-2xl sm:text-3xl font-bold">Page not found</h1>
                <p className="mt-3 text-base-content/70">
                    The page you are looking for does not exist, was moved, or the link is
                    incorrect.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href="/" className="btn btn-primary">
                        Go to homepage
                    </Link>
                    <button type="button" onClick={() => router.back()} className="btn btn-outline">
                        Go back
                    </button>
                </div>
            </div>
        </main>
    );
};

export default NotFound;