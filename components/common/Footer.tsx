"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-150 dark:border-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Enterprise Boilerplate. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="text-sm text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
