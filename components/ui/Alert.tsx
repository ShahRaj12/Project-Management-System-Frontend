"use client";

import React, { HTMLAttributes } from "react";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "warning" | "error" | "info";
  title?: string;
}

export const Alert: React.FC<AlertProps> = ({
  className,
  variant = "info",
  title,
  children,
  ...props
}) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgStyles = {
    success: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-850 dark:text-green-300",
    warning: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800 text-yellow-850 dark:text-yellow-350",
    error: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-850 dark:text-red-300",
    info: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-850 dark:text-blue-300",
  };

  return (
    <div
      className={cn(
        "flex gap-3 p-4 border rounded-xl shadow-sm",
        bgStyles[variant],
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[variant]}</div>
      <div className="flex flex-col gap-1">
        {title && <h5 className="font-semibold leading-tight text-current">{title}</h5>}
        {children && <div className="text-sm opacity-90">{children}</div>}
      </div>
    </div>
  );
};
export default Alert;
