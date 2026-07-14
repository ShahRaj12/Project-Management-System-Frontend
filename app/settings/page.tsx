"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/common/Sidebar";
import { Header } from "@/components/common/Header";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import settingsService, { SystemSettings } from "@/services/settings.service";

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { success: toastSuccess, error: toastError } = useToast();

  const [siteName, setSiteName] = useState("Enterprise NextJS");
  const [supportEmail, setSupportEmail] = useState("support@example.com");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistrations, setAllowRegistrations] = useState(true);

  // Fetch current settings via Query
  const { isLoading } = useQuery({
    queryKey: ["systemSettings"],
    queryFn: () =>
      settingsService.getSettings().then((res) => {
        const data = res.data;
        setSiteName(data.siteName);
        setSupportEmail(data.supportEmail);
        setMaintenanceMode(data.maintenanceMode);
        setAllowRegistrations(data.allowRegistrations);
        return data;
      }),
    initialData: {
      siteName: "Enterprise NextJS",
      maintenanceMode: false,
      allowRegistrations: true,
      supportEmail: "support@example.com",
    },
  });

  const saveSettingsMutation = useMutation({
    mutationFn: (data: Partial<SystemSettings>) => settingsService.updateSettings(data),
    onSuccess: () => {
      toastSuccess("Settings saved successfully.", "System Updated");
    },
    onError: (err: any) => {
      toastError(err.message || "Failed to update settings", "Save Failed");
    },
  });

  const handleSave = () => {
    saveSettingsMutation.mutate({
      siteName,
      supportEmail,
      maintenanceMode,
      allowRegistrations,
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-955">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <Breadcrumb items={[{ label: "Settings", active: true }]} />
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Settings
            </h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure the behavior and appearance of the enterprise workspace.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 max-w-md">
              <Input
                label="Site Name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                disabled={isLoading}
              />

              <Input
                label="Support Email"
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                disabled={isLoading}
              />

              <div className="space-y-4">
                <Switch
                  label="Enable Maintenance Mode"
                  checked={maintenanceMode}
                  onChange={setMaintenanceMode}
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Block public access to web pages during upgrades.
                </p>
              </div>

              <div className="space-y-4">
                <Switch
                  label="Allow User Registrations"
                  checked={allowRegistrations}
                  onChange={setAllowRegistrations}
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Allow new users to sign up via register page.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} isLoading={saveSettingsMutation.isPending}>
                Save Configuration
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
