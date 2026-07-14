"use client";

import React from "react";
import Link from "next/link";
import { LoginForm } from "@/components/forms/LoginForm";
import { ROUTES } from "@/config/routes";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-8 border border-gray-150 dark:border-gray-800 rounded-2xl shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-955 text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign in to manage your enterprise panel
          </p>
        </div>

        <LoginForm />

        <div className="text-center text-sm">
          <span className="text-gray-500">Don&apos;t have an account? </span>
          <Link
            href={ROUTES.REGISTER}
            className="font-medium text-indigo-650 hover:text-indigo-500 text-indigo-600 dark:text-indigo-400"
          >
            Sign up
          </Link>
        </div>

        <div className="text-center text-sm">
          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className="font-medium text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
