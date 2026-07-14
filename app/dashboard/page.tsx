"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/common/Sidebar";
import { Header } from "@/components/common/Header";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { DollarSign, ShoppingBag, Users, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import dashboardService from "@/services/dashboard.service";

interface OrderSummary {
  id: string;
  customerName: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  date: string;
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch stats using React Query
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => dashboardService.getDashboardData().then((res) => res.data),
    // Fallback Mock Data so it renders correctly out-of-the-box
    initialData: {
      stats: {
        totalSales: 45231.89,
        totalOrders: 312,
        totalCustomers: 1205,
        activeUsers: 48,
        salesGrowthPercentage: 20.1,
        ordersGrowthPercentage: 12.5,
        customersGrowthPercentage: 8.2,
        activeUsersGrowthPercentage: 4.3,
      },
      salesHistory: [],
      categoryDistribution: [],
    },
  });

  const recentOrders: OrderSummary[] = [
    { id: "ORD-001", customerName: "Olivia Martin", amount: 1999.0, status: "completed", date: "2026-07-12" },
    { id: "ORD-002", customerName: "Jackson Lee", amount: 39.0, status: "pending", date: "2026-07-13" },
    { id: "ORD-003", customerName: "Isabella Nguyen", amount: 299.0, status: "processing", date: "2026-07-13" },
    { id: "ORD-004", customerName: "William Chen", amount: 89.0, status: "cancelled", date: "2026-07-14" },
  ];

  const columns: Column<OrderSummary>[] = [
    { header: "Order ID", accessorKey: "id" },
    { header: "Customer", accessorKey: "customerName" },
    {
      header: "Amount",
      accessorKey: (row) => `$${row.amount.toFixed(2)}`,
    },
    {
      header: "Status",
      accessorKey: (row) => {
        const variants = {
          completed: "success" as const,
          pending: "warning" as const,
          processing: "info" as const,
          cancelled: "danger" as const,
        };
        return <Badge variant={variants[row.status]}>{row.status}</Badge>;
      },
    },
    { header: "Date", accessorKey: "date" },
  ];

  const statsCards = [
    {
      title: "Total Revenue",
      value: `$${dashboardData.stats.totalSales.toLocaleString()}`,
      description: `+${dashboardData.stats.salesGrowthPercentage}% from last month`,
      icon: <DollarSign className="w-5 h-5 text-gray-500" />,
    },
    {
      title: "Subscriptions",
      value: `+${dashboardData.stats.totalCustomers.toLocaleString()}`,
      description: `+${dashboardData.stats.customersGrowthPercentage}% from last month`,
      icon: <Users className="w-5 h-5 text-gray-500" />,
    },
    {
      title: "Sales",
      value: `+${dashboardData.stats.totalOrders.toLocaleString()}`,
      description: `+${dashboardData.stats.ordersGrowthPercentage}% from last month`,
      icon: <ShoppingBag className="w-5 h-5 text-gray-500" />,
    },
    {
      title: "Active Now",
      value: `+${dashboardData.stats.activeUsers.toLocaleString()}`,
      description: `+${dashboardData.stats.activeUsersGrowthPercentage}% from last hour`,
      icon: <Activity className="w-5 h-5 text-gray-500" />,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <Breadcrumb items={[]} />
            <h1 className="text-3xl font-bold tracking-tight text-gray-955 text-gray-900 dark:text-white">
              Dashboard
            </h1>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {statsCards.map((card, idx) => (
              <Card key={idx} hoverEffect>
                <CardHeader className="flex flex-row items-center justify-between pb-2 border-none">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {card.title}
                  </CardTitle>
                  {card.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-955 text-gray-900 dark:text-white">
                    {card.value}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Orders Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-955 text-gray-900 dark:text-white">
              Recent Orders
            </h3>
            <DataTable columns={columns} data={recentOrders} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  );
}
