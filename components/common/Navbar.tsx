"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-150 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
              Enterprise Boilerplate
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${
                  pathname === "/" ? "text-indigo-650 text-indigo-600 dark:text-indigo-455 dark:text-indigo-400" : "text-gray-650 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                }`}
              >
                Home
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <Link href={ROUTES.DASHBOARD}>
                <Button size="sm">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href={ROUTES.LOGIN} className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-50 transition-colors">
                  Sign In
                </Link>
                <Link href={ROUTES.REGISTER}>
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
