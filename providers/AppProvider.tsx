"use client";

import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};
export default AppProvider;
