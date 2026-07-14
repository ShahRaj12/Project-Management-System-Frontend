"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbItem } from "@/types/common";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 select-none">
      <Link
        href="/dashboard"
        className="flex items-center hover:text-gray-950 dark:hover:text-gray-50 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href && !item.active ? (
            <Link
              href={item.href}
              className="hover:text-gray-950 dark:hover:text-gray-50 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-gray-900 dark:text-gray-200">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
export default Breadcrumb;
