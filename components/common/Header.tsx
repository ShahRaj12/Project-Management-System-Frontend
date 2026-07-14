"use client";

import React from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { Dropdown } from "@/components/ui/Dropdown";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  const userMenuItems = [
    { label: "Profile", onClick: () => router.push(ROUTES.PROFILE) },
    { label: "Settings", onClick: () => router.push(ROUTES.SETTINGS) },
    { label: "Logout", onClick: logout, className: "text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400" },
  ];

  return (
    <header className="h-16 px-6 bg-white dark:bg-gray-950 border-b border-gray-150 dark:border-gray-900 flex items-center justify-between">
      {/* Left section: Mobile Toggle */}
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 lg:hidden focus:outline-none"
        >
          <Menu className="w-5.5 h-5.5" />
        </button>
      </div>

      {/* Right section: Theme Toggle & User Info */}
      <div className="flex items-center gap-4">
        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        {/* Profile Dropdown */}
        {user && (
          <Dropdown
            trigger={
              <button className="flex items-center gap-2 focus:outline-none select-none">
                <div className="w-8 h-8 rounded-full bg-indigo-650 bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user.name}
                </span>
              </button>
            }
            items={userMenuItems}
          />
        )}
      </div>
    </header>
  );
};
export default Header;
