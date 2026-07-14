"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullscreen?: boolean;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  fullscreen = false,
  className,
}) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const loaderContent = (
    <div
      className={cn(
        "animate-spin rounded-full border-t-transparent border-indigo-600 dark:border-indigo-400",
        sizes[size],
        className
      )}
    />
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};
export default Loader;
