'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { StatusCard } from '@/components/dashboard/status-card';
import { 
  Activity, 
  LineChart, 
  DollarSign, 
  TrendingUp,
  BarChart,
  PieChart,
  Cell,
  Heart,
  Pulse,
  Stethoscope,
  ActivitySquare,
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie } from 'recharts';

// Mock data for charts
const healthData = [
  { month: 'Jan', cashFlow: 40000, workingCapital: 180000, debtRatio: 0.25 },
  { month: 'Feb', cashFlow: 45000, workingCapital: 185000, debtRatio: 0.24 },
  { month: 'Mar', cashFlow: 42000, workingCapital: 190000, debtRatio: 0.23 },
  { month: 'Apr', cashFlow: 48000, workingCapital: 195000, debtRatio: 0.22 },
  { month: 'May', cashFlow: 50000, workingCapital: 200000, debtRatio: 0.21 },
  { month: 'Jun', cashFlow: 55000, workingCapital: 210000, debtRatio: 0.20 },
];

const liquidityMetrics = [
  { name: 'Current Ratio', value: 2.5 },
  { name: 'Quick Ratio', value: 1.8 },
  { name: 'Cash Ratio', value: 1.2 },
];

const solvencyMetrics = [
  { name: 'Debt to Equity', value: 0.25 },
  { name: 'Interest Coverage', value: 8.5 },
  { name: 'Asset Coverage', value: 2.8 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function HealthPage() {
  return (
    <div className="space-y-6">
      {/* Key Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Cash Flow"
          value="$245K"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <MetricCard
          title="Working Capital"
          value="$210K"
          icon={Activity}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Debt Ratio"
          value="0.20"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Profit Margin"
          value="32%"
          icon={LineChart}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Financial Health Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Financial Health Indicators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cashFlow" stroke="#8884d8" name="Cash Flow" />
                <Line type="monotone" dataKey="workingCapital" stroke="#82ca9d" name="Working Capital" />
                <Line type="monotone" dataKey="debtRatio" stroke="#ffc658" name="Debt Ratio" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Financial Health Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Liquidity Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={liquidityMetrics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {liquidityMetrics.map((entry, index) => (
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
              Solvency Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={solvencyMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" name="Value" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Health Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusCard
          title="Cash Flow Health"
          value="Strong"
          status="success"
          icon={Heart}
          description="Positive cash flow with 15% growth"
        />
        <StatusCard
          title="Working Capital"
          value="$210K"
          status="success"
          icon={Pulse}
          description="Healthy working capital position"
        />
        <StatusCard
          title="Debt Position"
          value="Low"
          status="success"
          icon={Stethoscope}
          description="Conservative debt management"
        />
        <ProgressCard
          title="Current Ratio"
          value={250}
          max={100}
          icon={ActivitySquare}
          unit="%"
          description="Strong liquidity position"
        />
        <ProgressCard
          title="Debt Coverage"
          value={85}
          max={100}
          icon={Target}
          unit="%"
          description="Healthy debt coverage ratio"
        />
        <ProgressCard
          title="Asset Utilization"
          value={75}
          max={100}
          icon={TrendingUp}
          unit="%"
          description="Efficient asset utilization"
        />
      </div>
    </div>
  );
} 