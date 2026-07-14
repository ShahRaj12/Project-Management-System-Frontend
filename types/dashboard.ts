export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  activeUsers: number;
  salesGrowthPercentage: number;
  ordersGrowthPercentage: number;
  customersGrowthPercentage: number;
  activeUsersGrowthPercentage: number;
}

export interface SalesChartData {
  date: string;
  amount: number;
}

export interface CategoryDistribution {
  category: string;
  value: number;
}

export interface DashboardData {
  stats: DashboardStats;
  salesHistory: SalesChartData[];
  categoryDistribution: CategoryDistribution[];
}
