'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { StatusCard } from '@/components/dashboard/status-card';
import { 
  Wallet, 
  LineChart, 
  Server, 
  Activity, 
  Users, 
  Globe, 
  Shield, 
  File,
  TrendingUp,
  DollarSign,
  Building2,
  Target,
  Briefcase,
  Scale,
  Folder
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { CHART_COLORS, CHART_HEIGHT, CHART_MARGIN } from '@/lib/constants';
import { monthlyData, revenueByType, clientSegments, budgetData } from '@/lib/mock-data/financial';

// Mock data for charts
const revenueData = [
  { month: 'Jan', revenue: 40000, expenses: 30000 },
  { month: 'Feb', revenue: 45000, expenses: 32000 },
  { month: 'Mar', revenue: 42000, expenses: 35000 },
  { month: 'Apr', revenue: 48000, expenses: 38000 },
  { month: 'May', revenue: 50000, expenses: 40000 },
  { month: 'Jun', revenue: 55000, expenses: 42000 },
];

const budgetData = [
  { name: 'Development', value: 40 },
  { name: 'Design', value: 20 },
  { name: 'Marketing', value: 20 },
  { name: 'Operations', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function FinancialOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value="$450K"
          icon={Wallet}
          trend={{ value: 15, isPositive: true }}
        />
        <MetricCard
          title="Project Budget"
          value="$120K"
          icon={Folder}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Operating Costs"
          value="$85K"
          icon={Server}
          trend={{ value: 5, isPositive: false }}
        />
        <MetricCard
          title="Profit Margin"
          value="32%"
          icon={LineChart}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Revenue & Expenses Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Revenue & Expenses Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#82ca9d" name="Expenses" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Budget Allocation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Budget Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusCard
          title="Cash Flow"
          value="$245K"
          status="success"
          icon={Wallet}
          description="Net cash position"
        />
        <StatusCard
          title="Working Capital"
          value="$180K"
          status="success"
          icon={Activity}
          description="Available working capital"
        />
        <StatusCard
          title="Debt Ratio"
          value="0.25"
          status="success"
          icon={LineChart}
          description="Debt-to-equity ratio"
        />
        <ProgressCard
          title="Gross Profit"
          value={65}
          max={100}
          icon={LineChart}
          unit="%"
          description="Gross profit margin"
        />
        <ProgressCard
          title="Net Profit"
          value={32}
          max={100}
          icon={LineChart}
          unit="%"
          description="Net profit margin"
        />
        <ProgressCard
          title="ROI"
          value={280}
          max={100}
          icon={TrendingUp}
          unit="%"
          description="Return on investment"
        />
      </div>
    </div>
  );
} 