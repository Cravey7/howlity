'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { StatusCard } from '@/components/dashboard/status-card';
import { 
  DollarSign, 
  LineChart, 
  Users, 
  Code, 
  Globe, 
  TrendingUp,
  BarChart,
  PieChart,
  Cell,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Target
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie } from 'recharts';

// Mock data for charts
const budgetData = [
  { month: 'Jan', allocated: 38000, spent: 35000, forecast: 37000 },
  { month: 'Feb', allocated: 38000, spent: 38000, forecast: 38000 },
  { month: 'Mar', allocated: 38000, spent: 42000, forecast: 38000 },
  { month: 'Apr', allocated: 38000, spent: 40000, forecast: 38000 },
  { month: 'May', allocated: 38000, spent: 45000, forecast: 38000 },
  { month: 'Jun', allocated: 38000, spent: 48000, forecast: 38000 },
];

const budgetAllocation = [
  { name: 'Development', value: 180000 },
  { name: 'Design', value: 120000 },
  { name: 'Marketing', value: 90000 },
  { name: 'Operations', value: 60000 },
];

const budgetStatus = [
  { name: 'On Track', value: 250000 },
  { name: 'Over Budget', value: 100000 },
  { name: 'Under Budget', value: 100000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function BudgetPage() {
  return (
    <div className="space-y-6">
      {/* Key Budget Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Budget"
          value="$450K"
          icon={DollarSign}
          trend={{ value: 10, isPositive: true }}
        />
        <MetricCard
          title="Budget Utilization"
          value="85%"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Budget Variance"
          value="+5%"
          icon={LineChart}
          trend={{ value: 2, isPositive: false }}
        />
        <MetricCard
          title="Forecast Accuracy"
          value="92%"
          icon={Target}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Budget Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Budget Tracking & Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="allocated" stroke="#8884d8" name="Allocated" />
                <Line type="monotone" dataKey="spent" stroke="#82ca9d" name="Spent" />
                <Line type="monotone" dataKey="forecast" stroke="#ffc658" name="Forecast" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Budget Distribution */}
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
                <RechartsPieChart>
                  <Pie
                    data={budgetAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {budgetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Budget Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={budgetStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" name="Amount" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusCard
          title="Development Budget"
          value="$180K"
          status="success"
          icon={Code}
          description="Allocated: $180K, Spent: $170K, Remaining: $10K"
        />
        <StatusCard
          title="Marketing Budget"
          value="$90K"
          status="warning"
          icon={Globe}
          description="Allocated: $90K, Spent: $95K, Over: $5K"
        />
        <StatusCard
          title="Operations Budget"
          value="$60K"
          status="success"
          icon={Users}
          description="Allocated: $60K, Spent: $55K, Remaining: $5K"
        />
        <ProgressCard
          title="Budget Utilization"
          value={85}
          max={100}
          icon={TrendingUp}
          unit="%"
          description="Overall budget usage"
        />
        <ProgressCard
          title="Forecast Accuracy"
          value={92}
          max={100}
          icon={Target}
          unit="%"
          description="Budget prediction accuracy"
        />
        <ProgressCard
          title="Approval Rate"
          value={95}
          max={100}
          icon={CheckCircle}
          unit="%"
          description="Budget request approvals"
        />
      </div>
    </div>
  );
} 