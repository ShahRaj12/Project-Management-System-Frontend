"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/common/Sidebar";
import { Header } from "@/components/common/Header";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-955">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <Breadcrumb items={[{ label: "Profile", active: true }]} />
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Profile
            </h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your account profile details and email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
