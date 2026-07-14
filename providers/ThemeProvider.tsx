"use client";

import React, { ReactNode } from "react";
import { ThemeProviderContext } from "@/context/ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeProviderContext>{children}</ThemeProviderContext>;
};
export default ThemeProvider;
