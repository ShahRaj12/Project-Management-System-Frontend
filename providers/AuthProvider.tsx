"use client";

import React, { ReactNode } from "react";
import { AuthProviderContext } from "@/context/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <AuthProviderContext>{children}</AuthProviderContext>;
};
export default AuthProvider;
