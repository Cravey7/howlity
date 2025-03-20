'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { StatusCard } from '@/components/dashboard/status-card';
import { 
  Receipt,
  LineChart, 
  Calculator,
  TrendingUp,
  BarChart,
  PieChart,
  Cell,
  Target,
  Users,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Briefcase,
  GraduationCap,
  Trophy,
  Award,
  Brain,
  FileText,
  CheckCircle,
  AlertCircle,
  Activity,
  Gauge,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Target as TargetIcon,
  Users as UsersIcon,
  Building as BuildingIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  Wallet as WalletIcon,
  Briefcase as BriefcaseIcon,
  GraduationCap as GraduationCapIcon,
  Trophy as TrophyIcon,
  Award as AwardIcon,
  Brain as BrainIcon
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie } from 'recharts';

// Mock data for charts
const taxData = [
  { month: 'Jan', income: 25000, expenses: 15000, deductions: 5000 },
  { month: 'Feb', income: 28000, expenses: 16000, deductions: 6000 },
  { month: 'Mar', income: 30000, expenses: 17000, deductions: 7000 },
  { month: 'Apr', income: 32000, expenses: 18000, deductions: 8000 },
  { month: 'May', income: 35000, expenses: 19000, deductions: 9000 },
  { month: 'Jun', income: 38000, expenses: 20000, deductions: 10000 },
];

const taxCategories = [
  { name: 'Income Tax', value: 40 },
  { name: 'Sales Tax', value: 25 },
  { name: 'Property Tax', value: 15 },
  { name: 'Other Taxes', value: 20 },
];

const complianceMetrics = [
  { name: 'Tax Compliance', value: 95 },
  { name: 'Documentation', value: 92 },
  { name: 'Filing Accuracy', value: 98 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function TaxPage() {
  return (
    <div className="space-y-6">
      {/* Key Tax Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Tax"
          value="$180K"
          icon={Receipt}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Tax Rate"
          value="25%"
          icon={Calculator}
          trend={{ value: 2, isPositive: true }}
        />
        <MetricCard
          title="Tax Compliance"
          value="95%"
          icon={CheckCircle}
          trend={{ value: 3, isPositive: true }}
        />
        <MetricCard
          title="Tax Efficiency"
          value="88%"
          icon={TrendingUp}
          trend={{ value: 4, isPositive: true }}
        />
      </div>

      {/* Tax Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Tax Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={taxData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#8884d8" name="Income" />
                <Line type="monotone" dataKey="expenses" stroke="#82ca9d" name="Expenses" />
                <Line type="monotone" dataKey="deductions" stroke="#ffc658" name="Deductions" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tax Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Tax Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={taxCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taxCategories.map((entry, index) => (
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
              Compliance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={complianceMetrics}>
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

      {/* Tax Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusCard
          title="Income Tax"
          value="40%"
          status="success"
          icon={Wallet}
          description="Primary tax category"
        />
        <StatusCard
          title="Sales Tax"
          value="25%"
          status="success"
          icon={Receipt}
          description="Secondary tax category"
        />
        <StatusCard
          title="Property Tax"
          value="15%"
          status="success"
          icon={Building2}
          description="Property-related taxes"
        />
        <ProgressCard
          title="Tax Compliance"
          value={95}
          max={100}
          icon={CheckCircle}
          unit="%"
          description="Overall tax compliance rate"
        />
        <ProgressCard
          title="Documentation"
          value={92}
          max={100}
          icon={FileText}
          unit="%"
          description="Tax documentation completeness"
        />
        <ProgressCard
          title="Filing Accuracy"
          value={98}
          max={100}
          icon={Calculator}
          unit="%"
          description="Tax filing accuracy rate"
        />
      </div>
    </div>
  );
} 