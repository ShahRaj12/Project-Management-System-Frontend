"use client";

import React from "react";
import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { ROUTES } from "@/config/routes";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-8 border border-gray-150 dark:border-gray-800 rounded-2xl shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-955 text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Join us to get started with the enterprise dashboard
          </p>
        </div>

        <RegisterForm />

        <div className="text-center text-sm">
          <span className="text-gray-500">Already have an account? </span>
          <Link
            href={ROUTES.LOGIN}
            className="font-medium text-indigo-650 hover:text-indigo-500 text-indigo-600 dark:text-indigo-400"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
