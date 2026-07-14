"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50 dark:bg-gray-950">
      <h1 className="text-9xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-widest">
        404
      </h1>
      <div className="bg-indigo-100 dark:bg-indigo-950/40 text-indigo-755 text-indigo-700 dark:text-indigo-300 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        The page you are looking for does not exist, or has been relocated.
      </p>
      <Link href="/">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
}
