'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { StatusCard } from '@/components/dashboard/status-card';
import { 
  DollarSign, 
  LineChart, 
  TrendingUp,
  BarChart,
  PieChart,
  Cell,
  Target,
  Rocket,
  Cpu,
  GraduationCap,
  Building2,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie } from 'recharts';

// Mock data for charts
const investmentData = [
  { month: 'Jan', technology: 150000, marketing: 80000, training: 50000, roi: 0.25 },
  { month: 'Feb', technology: 160000, marketing: 85000, training: 55000, roi: 0.28 },
  { month: 'Mar', technology: 170000, marketing: 90000, training: 60000, roi: 0.30 },
  { month: 'Apr', technology: 180000, marketing: 95000, training: 65000, roi: 0.32 },
  { month: 'May', technology: 190000, marketing: 100000, training: 70000, roi: 0.35 },
  { month: 'Jun', technology: 200000, marketing: 105000, training: 75000, roi: 0.38 },
];

const investmentAllocation = [
  { name: 'Technology', value: 200000 },
  { name: 'Marketing', value: 105000 },
  { name: 'Training', value: 75000 },
  { name: 'Infrastructure', value: 70000 },
];

const roiByCategory = [
  { name: 'Technology', value: 0.38 },
  { name: 'Marketing', value: 0.25 },
  { name: 'Training', value: 0.15 },
  { name: 'Infrastructure', value: 0.12 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function InvestmentsPage() {
  return (
    <div className="space-y-6">
      {/* Key Investment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Investment"
          value="$450K"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <MetricCard
          title="Overall ROI"
          value="38%"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Investment Growth"
          value="12%"
          icon={Rocket}
          trend={{ value: 3, isPositive: true }}
        />
        <MetricCard
          title="Payback Period"
          value="2.6y"
          icon={Target}
          trend={{ value: 0.4, isPositive: true }}
        />
      </div>

      {/* Investment Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Investment Performance & ROI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={investmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="technology" stroke="#8884d8" name="Technology" />
                <Line type="monotone" dataKey="marketing" stroke="#82ca9d" name="Marketing" />
                <Line type="monotone" dataKey="training" stroke="#ffc658" name="Training" />
                <Line type="monotone" dataKey="roi" stroke="#ff7300" name="ROI" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Investment Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Investment Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={investmentAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {investmentAllocation.map((entry, index) => (
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
              ROI by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={roiByCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" name="ROI" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusCard
          title="Technology Investment"
          value="$200K"
          status="success"
          icon={Cpu}
          description="ROI: 38%, Growth: 15%"
        />
        <StatusCard
          title="Marketing Investment"
          value="$105K"
          status="success"
          icon={Globe}
          description="ROI: 25%, Growth: 12%"
        />
        <StatusCard
          title="Training Investment"
          value="$75K"
          status="success"
          icon={GraduationCap}
          description="ROI: 15%, Growth: 8%"
        />
        <ProgressCard
          title="Technology ROI"
          value={38}
          max={100}
          icon={Zap}
          unit="%"
          description="Return on technology investment"
        />
        <ProgressCard
          title="Marketing ROI"
          value={25}
          max={100}
          icon={Globe}
          unit="%"
          description="Return on marketing investment"
        />
        <ProgressCard
          title="Training ROI"
          value={15}
          max={100}
          icon={GraduationCap}
          unit="%"
          description="Return on training investment"
        />
      </div>
    </div>
  );
} 