"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/config/routes";
import { ArrowRight, Shield, Zap, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-gray-950 dark:to-gray-950 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/30 dark:border-indigo-800 text-xs font-semibold text-indigo-755 text-indigo-700 dark:text-indigo-300 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Now Powered by Clean Architecture
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-950 dark:text-white max-w-3xl leading-tight">
            Next-Gen Enterprise Boilerplate for <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-650 to-indigo-500 from-indigo-600 to-indigo-400">Next.js</span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl">
            A production-ready starter featuring React 18, TypeScript, Redux Toolkit, TanStack Query, forms validation, custom UI components, and theme triggers.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href={ROUTES.REGISTER}>
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href={ROUTES.LOGIN}>
              <Button variant="outline" size="lg">
                Live Demo
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-left">
            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl shadow-sm">
              <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-950 dark:text-white">Blazing Fast Queries</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Integrated TanStack Query with preconfigured stale and cache strategies for instantaneous data loading.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl shadow-sm">
              <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-950 dark:text-white">Clean Security</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Automatic authorization cookie injection, JWT request/response interceptors, and robust router middleware protection.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl shadow-sm">
              <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-950 dark:text-white">Sleek Dark Mode</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Tailwind CSS variables support seamless light/dark rendering based on preference and device setups.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
